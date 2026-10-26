/**
 * Ultimo giorno utile per pagare una rata : scadenza → giorno lavorativo, 5 giorni di tolleranza, festivi ;
 * a chi serve la tolleranza (unica e ultima rata nella quinquies, ogni rata nella quater) ; canali ufficiali.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { datePiano, ultimoGiorno, isLavorativo, prossimoLavorativo, type Regime } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { T, dt, dts, tra, oggiRoma, REGIME_LABEL, type L } from './common';

export interface PagamentoProps { lang: L; id?: string; today: string; methodHref?: string; defaultRegime?: Regime; defaultScadenza?: string; regimi?: Regime[] }

export default function PagamentoTool({ lang: l, id = 'pagamento', today, methodHref, defaultRegime = 'quinquies', defaultScadenza, regimi = ['quinquies', 'enti', 'quater', 'riammissione'] }: PagamentoProps) {
  const [oggi, setOggi] = useState(today);
  const [regime, setRegime] = useState<Regime>(defaultRegime);
  const firstNext = (r: Regime, t: string) => { const all = [P[r].unica, ...datePiano(r, P[r].max_rate)]; return all.find((d) => ultimoGiorno(d) >= t) ?? all[all.length - 1]; };
  const [scad, setScad] = useState(defaultScadenza ?? firstNext(defaultRegime, today));
  const [ultima, setUltima] = useState(false);
  useEffect(() => {
    const t = oggiRoma(); setOggi(t);
    const u = readParams(window.location.search);
    const r = (u.get('r') as Regime | null) ?? defaultRegime;
    if (regimi.includes(r)) setRegime(r);
    const d = u.get('d');
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) setScad(d); else if (!defaultScadenza) setScad(firstNext(r, t));
    if (u.get('u') === '1') setUltima(true);
  }, []);
  useEffect(() => { updateURL({ r: regime, d: scad, u: ultima ? 1 : undefined }); }, [regime, scad, ultima]);
  const dates = useMemo(() => Array.from(new Set([P[regime].unica, ...datePiano(regime, P[regime].max_rate)])).sort(), [regime]);
  const ug = ultimoGiorno(scad);
  const quaterLike = regime === 'quater' || regime === 'riammissione';
  const tolleranza = quaterLike || ultima;
  const spostata = !isLavorativo(scad);

  const form = (
    <>
      <SelectField id={`${id}-r`} label={T(l, 'Definizione', 'Settlement')} value={regime} onChange={(x) => { setRegime(x as Regime); setScad(firstNext(x as Regime, oggi)); }} options={regimi.map((r) => ({ value: r, label: REGIME_LABEL[r][l] }))} />
      <Row2>
        <SelectField id={`${id}-d`} label={T(l, 'Scadenza della rata', 'Instalment due date')} value={scad} onChange={setScad} options={dates.map((d) => ({ value: d, label: `${dts(d, l)}${d < oggi ? T(l, ' (passata)', ' (past)') : ''}` }))} />
        {!quaterLike && <Toggle id={`${id}-u`} label={T(l, 'È l’unica o l’ultima rata?', 'Single or last instalment?')} value={ultima ? '1' : '0'} onChange={(x) => setUltima(x === '1')} options={[{ value: '0', label: 'No' }, { value: '1', label: T(l, 'Sì', 'Yes') }]} />}
      </Row2>
    </>
  );
  const result = (
    <>
      <Head label={tolleranza ? T(l, 'Ultimo giorno utile per non decadere', 'Last useful day to stay in') : T(l, 'Scadenza da rispettare', 'Due date to meet')} value={dt(tolleranza ? ug : scad, l)} sub={tra(oggi, tolleranza ? ug : scad, l)} />
      <Rows rows={[
        [T(l, 'Scadenza di legge', 'Statutory due date'), dts(scad, l)],
        [T(l, 'Primo giorno lavorativo', 'First working day'), spostata ? dts(prossimoLavorativo(scad), l) : T(l, 'la stessa', 'the same')],
        [T(l, 'Con i 5 giorni di tolleranza', 'With the 5-day tolerance'), dts(ug, l)],
        [T(l, 'La tolleranza ti protegge?', 'Does the tolerance protect you?'), tolleranza ? T(l, 'sì', 'yes') : T(l, 'non serve: conta non saltare due rate', 'not needed: what counts is not missing two')],
      ]} />
      {!tolleranza && <Note>{T(l, 'Per una rata intermedia della quinquies il ritardo non fa decadere: decade chi lascia scoperte due rate. Pagare in ritardo non costa sanzioni, ma il versamento copre prima le rate più vecchie.', 'For a middle quinquies instalment lateness does not end the settlement: you lapse by leaving two instalments unpaid. Paying late costs no penalty, but the payment covers older instalments first.')}</Note>}
      <Note>{T(l, 'Si paga con i moduli della Comunicazione: sul sito e nell’app di Agenzia delle entrate-Riscossione, in banca, alla posta, in home banking (CBILL), dal tabaccaio, al bancomat o con domiciliazione.', 'Pay with the forms in the statement: on the Agenzia delle entrate-Riscossione site and app, at a bank, a post office, through home banking (CBILL), at a tobacconist, at a cash machine or by direct debit.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
