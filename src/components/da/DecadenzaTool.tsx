/**
 * « Sono decaduto? » : definizione, numero di rate, stato di ogni rata già scaduta → decadenza o no, motivo,
 * cosa fare prima della prossima scadenza. Regole : comma 95 L. 199/2025 come modificato (quinquies, enti),
 * FAQ ADER n. 12 (imputazione alla rata più vecchia), comma 244 L. 197/2022 (quater, riammissione).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { rateScadute, prossimaRata, verificaDecadenza, type Regime, type StatoRata } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { T, num, dt, dts, oggiRoma, REGIME_LABEL, type L } from './common';

export interface DecadenzaProps { lang: L; id?: string; today: string; methodHref?: string; regimi?: Regime[]; defaultRegime?: Regime; defaultRate?: number; defaultStati?: StatoRata[] }
const STATI: StatoRata[] = ['ok', 'tardi', 'parziale', 'no'];
const STATO_LABEL: Record<StatoRata, { it: string; en: string }> = {
  ok: { it: 'Pagata in tempo (entro 5 giorni)', en: 'Paid on time (within 5 days)' },
  tardi: { it: 'Pagata dopo i 5 giorni', en: 'Paid after the 5 days' },
  parziale: { it: 'Pagata in parte', en: 'Partly paid' },
  no: { it: 'Non pagata', en: 'Not paid' },
};

export default function DecadenzaTool({ lang: l, id = 'decadenza', today, methodHref, regimi = ['quinquies', 'enti', 'quater', 'riammissione'], defaultRegime = 'quinquies', defaultRate = 54, defaultStati = [] }: DecadenzaProps) {
  const [oggi, setOggi] = useState(today);
  const [regime, setRegime] = useState<Regime>(defaultRegime);
  const [n, setN] = useState(defaultRate);
  const [stati, setStati] = useState<StatoRata[]>(defaultStati);
  useEffect(() => {
    setOggi(oggiRoma());
    const u = readParams(window.location.search);
    const r = u.get('r') as Regime | null; if (r && regimi.includes(r)) setRegime(r);
    const k = Number(u.get('n')); if (k > 0) setN(k);
    const s = u.get('s'); if (s && /^[otpn]+$/.test(s)) setStati(s.split('').map((c) => ({ o: 'ok', t: 'tardi', p: 'parziale', n: 'no' } as Record<string, StatoRata>)[c]));
  }, []);
  useEffect(() => { updateURL({ r: regime, n, s: stati.map((x) => x[0]).join('') || undefined }); }, [regime, n, stati]);

  const max = P[regime].max_rate;
  const nn = regime === 'quater' ? (n > 1 ? 18 : 1) : Math.min(Math.max(1, n), max);
  const scadute = rateScadute(regime, nn, oggi);
  const st: StatoRata[] = scadute.map((_, i) => stati[i] ?? 'ok');
  const v = useMemo(() => verificaDecadenza(regime, nn, st), [regime, nn, st.join(',')]);
  const next = prossimaRata(regime, nn, oggi);
  const setStato = (i: number, s: StatoRata) => setStati((old) => { const c = scadute.map((_, j) => old[j] ?? 'ok'); c[i] = s; return c; });
  const quaterLike = regime === 'quater' || regime === 'riammissione';
  const rateOpts = regime === 'quater'
    ? [{ value: '1', label: T(l, 'Unica soluzione', 'Single payment') }, { value: '18', label: T(l, '18 rate', '18 instalments') }]
    : Array.from({ length: max }, (_, i) => i + 1).map((k) => ({ value: String(k), label: k === 1 ? T(l, 'Unica soluzione', 'Single payment') : T(l, `${k} rate`, `${k} instalments`) }));

  const form = (
    <>
      <Row2>
        <SelectField id={`${id}-r`} label={T(l, 'La tua definizione agevolata', 'Your settlement')} value={regime} onChange={(x) => { setRegime(x as Regime); setStati([]); if (x === 'quater') setN(18); else if (n > P[x as Regime].max_rate) setN(P[x as Regime].max_rate); }} options={regimi.map((r) => ({ value: r, label: REGIME_LABEL[r][l] }))} />
        <SelectField id={`${id}-n`} label={T(l, 'Rate del tuo piano', 'Instalments in your plan')} value={String(nn)} onChange={(x) => { setN(Number(x)); setStati([]); }} options={rateOpts} help={T(l, 'Le trovi nella Comunicazione delle somme dovute', 'Shown in the statement of sums due')} />
      </Row2>
      {scadute.length === 0
        ? <Note>{T(l, `Nessuna rata è ancora scaduta: la prima scade il ${dt(next?.scadenza ?? P[regime].unica, l)}.`, `No instalment is due yet: the first falls on ${dt(next?.scadenza ?? P[regime].unica, l)}.`)}</Note>
        : (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-navy-700">{T(l, `Le ${num(scadute.length, l)} rate già scadute`, `The ${num(scadute.length, l)} instalments already due`)}</legend>
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              {scadute.map((r, i) => (
                <SelectField key={r.n} id={`${id}-s${r.n}`} label={T(l, `Rata ${r.n} del ${dts(r.scadenza, l)}`, `Instalment ${r.n} of ${dts(r.scadenza, l)}`)} value={st[i]} onChange={(x) => setStato(i, x as StatoRata)} options={STATI.map((s) => ({ value: s, label: STATO_LABEL[s][l] }))} />
              ))}
            </div>
          </fieldset>
        )}
    </>
  );

  const motivo = v.motivo === 'unica' ? T(l, 'L’unica rata non è stata pagata per intero entro i 5 giorni di tolleranza.', 'The single payment was not made in full within the 5-day tolerance.')
    : v.motivo === 'due_rate' ? T(l, 'Due rate, anche non consecutive, risultano non pagate o pagate in parte (comma 95, lettera b).', 'Two instalments, consecutive or not, are unpaid or partly paid (paragraph 95, letter b).')
      : v.motivo === 'ultima' ? T(l, 'L’ultima rata risulta scoperta: un versamento copre prima la rata più vecchia rimasta aperta (FAQ n. 12).', 'The last instalment is left uncovered: a payment first covers the oldest open instalment (FAQ 12).')
        : v.motivo === 'una_rata' ? T(l, 'Nella quater basta una rata non pagata, insufficiente o versata oltre i 5 giorni (comma 244).', 'Under the quater one unpaid, short or more-than-5-days-late instalment is enough (paragraph 244).') : '';

  const result = (
    <>
      <Head label={T(l, 'Esito della verifica', 'Result of the check')} value={v.decaduto ? T(l, 'Decaduto', 'Lapsed') : v.avviso === 'una_arretrata' ? T(l, 'Non decaduto, una rata arretrata', 'Not lapsed, one behind') : T(l, 'Non decaduto', 'Not lapsed')} sub={v.decaduto ? motivo : undefined} />
      <Rows rows={[
        [T(l, 'Rate scadute', 'Instalments due'), num(scadute.length, l)],
        [T(l, 'Non pagate o in parte', 'Unpaid or partly paid'), num(v.arretrate, l)],
        [T(l, 'Ritardi oltre 5 giorni', 'Over 5 days late'), num(st.filter((s) => s === 'tardi').length, l)],
        ...(next ? [[T(l, 'Prossima rata', 'Next instalment'), `${next.n} · ${dts(next.scadenza, l)}`] as [string, string], [T(l, 'Ultimo giorno utile', 'Last useful day'), dts(next.ultimoGiorno, l)] as [string, string]] : []),
      ]} />
      {!v.decaduto && v.avviso === 'una_arretrata' && <Note>{T(l, 'La legge tollera una sola rata scoperta: saltarne un’altra fa decadere, e la rata arretrata va recuperata prima dell’ultima. Il prossimo versamento coprirà prima la rata arretrata.', 'The law tolerates one uncovered instalment only: missing another ends the settlement, and the missed one must be made up before the last. Your next payment will first cover the missed instalment.')}</Note>}
      {!v.decaduto && v.avviso === 'ritardi_tollerati' && <Note>{T(l, 'Un ritardo su una rata che non è l’ultima non fa decadere, purché la rata sia pagata per intero.', 'Late payment of an instalment other than the last does not end the settlement, as long as it is paid in full.')}</Note>}
      {v.decaduto && <Note>{T(l, 'Dopo la decadenza i versamenti valgono come acconto, la prescrizione riparte, la riscossione riprende e quei carichi non si possono più rateizzare con l’articolo 19.', 'After lapsing, payments count as part-payment, limitation runs again, collection resumes and those debts can no longer go on an article 19 instalment plan.')}</Note>}
      {v.decaduto && regime === 'quater' && <Note>{T(l, 'I carichi della quater decaduti al 30 settembre 2025 potevano entrare nella quinquies, con domanda entro il 30 aprile 2026, ora chiusa.', 'Quater debts lapsed by 30 September 2025 could enter the quinquies, with an application by 30 April 2026, now closed.')}</Note>}
      {quaterLike && !v.decaduto && <Note>{T(l, 'Nessuna tolleranza per le rate saltate: ogni rata va pagata per intero entro l’ultimo giorno utile.', 'No allowance for missed instalments: each one must be paid in full by the last useful day.')}</Note>}
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
