/**
 * Calendario personale delle rate : definizione, importo dovuto, numero di rate → data, ultimo giorno utile e
 * importo stimato di ogni rata, export .ics e stampa. Moteur : lib/engine (piano, ultimoGiorno).
 * Premier rendu : valeurs par défaut et jour du build ; URL et date du jour lues après hydratation (§17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { piano, prossimaRata, type Regime } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { T, eur2, num, dt, dts, tra, oggiRoma, downloadIcs, btn, REGIME_LABEL, REGIME_SHORT, type L } from './common';

export interface PianoProps { lang: L; id?: string; today: string; methodHref?: string; regimi?: Regime[]; defaultRegime?: Regime; defaultImporto?: number; defaultRate?: number; compatto?: boolean }

export default function PianoTool({ lang: l, id = 'piano', today, methodHref, regimi = ['quinquies', 'enti', 'quater', 'riammissione'], defaultRegime = 'quinquies', defaultImporto = 12000, defaultRate = 54, compatto = false }: PianoProps) {
  const [oggi, setOggi] = useState(today);
  const [regime, setRegime] = useState<Regime>(defaultRegime);
  const [importo, setImporto] = useState(defaultImporto);
  const [n, setN] = useState(defaultRate);
  const [tutte, setTutte] = useState(false);
  useEffect(() => {
    setOggi(oggiRoma());
    const u = readParams(window.location.search);
    const r = u.get('r') as Regime | null; if (r && regimi.includes(r)) setRegime(r);
    const i = Number(u.get('i')); if (i > 0) setImporto(i);
    const k = Number(u.get('n')); if (k > 0) setN(k);
  }, []);
  useEffect(() => { updateURL({ r: regime, i: importo, n }); }, [regime, importo, n]);

  const rp = P[regime];
  const max = rp.max_rate;
  const nn = Math.min(Math.max(1, n), max);
  const pl = useMemo(() => piano(regime, Math.max(0, importo), nn), [regime, importo, nn]);
  const next = prossimaRata(regime, pl.nEffettive, oggi);
  const nextRata = next ? pl.rate[next.n - 1] : null;
  const rateOpts = regime === 'quater'
    ? [{ value: '1', label: T(l, 'Unica soluzione', 'Single payment') }, { value: '18', label: T(l, '18 rate (piano di legge)', '18 instalments (statutory plan)') }]
    : Array.from({ length: max }, (_, i) => i + 1).map((k) => ({ value: String(k), label: k === 1 ? T(l, 'Unica soluzione', 'Single payment') : T(l, `${k} rate`, `${k} instalments`) }));

  const ics = () => downloadIcs(pl.rate.map((r) => ({
    date: r.scadenza,
    summary: T(l, `Rata ${r.n}/${pl.nEffettive} ${REGIME_SHORT[regime].it}: ${eur2(r.importo, l)}`, `Instalment ${r.n}/${pl.nEffettive} ${REGIME_SHORT[regime].en}: ${eur2(r.importo, l)}`),
    description: T(l, `Scadenza ${dts(r.scadenza, l)}. Ultimo giorno utile stimato ${dts(r.ultimoGiorno, l)}. Importo stimato: vale quello della Comunicazione delle somme dovute.`, `Due ${dts(r.scadenza, l)}. Estimated last useful day ${dts(r.ultimoGiorno, l)}. Estimated amount: the statement of sums due is binding.`),
  })), `rate-${regime}.ics`);

  const form = (
    <>
      {regimi.length > 1 && <SelectField id={`${id}-r`} label={T(l, 'Quale definizione agevolata', 'Which settlement')} value={regime} onChange={(v) => { setRegime(v as Regime); if (v === 'quater') setN(18); else if (n > P[v as Regime].max_rate) setN(P[v as Regime].max_rate); }} options={regimi.map((r) => ({ value: r, label: REGIME_LABEL[r][l] }))} />}
      <Row2>
        <NumberField id={`${id}-i`} label={T(l, 'Somme dovute per la definizione', 'Sum due under the settlement')} value={importo} onChange={setImporto} unit="€" max={10_000_000} help={T(l, 'Capitale e spese, senza sanzioni né interessi', 'Principal and costs, no penalties or interest')} />
        <SelectField id={`${id}-n`} label={T(l, 'Numero di rate scelto', 'Number of instalments chosen')} value={String(regime === 'quater' ? (nn > 1 ? 18 : 1) : nn)} onChange={(v) => setN(Number(v))} options={rateOpts} help={T(l, `Massimo ${max}`, `Up to ${max}`)} />
      </Row2>
    </>
  );

  const head = pl.nEffettive === 1
    ? <Head label={T(l, `Unica soluzione entro il ${dt(pl.rate[0].scadenza, l)}`, `Single payment by ${dt(pl.rate[0].scadenza, l)}`)} value={eur2(pl.totale, l)} sub={T(l, `Ultimo giorno utile stimato: ${dt(pl.rate[0].ultimoGiorno, l)}`, `Estimated last useful day: ${dt(pl.rate[0].ultimoGiorno, l)}`)} />
    : nextRata
      ? <Head label={T(l, `Rata ${nextRata.n} di ${pl.nEffettive}, scadenza ${dt(nextRata.scadenza, l)}`, `Instalment ${nextRata.n} of ${pl.nEffettive}, due ${dt(nextRata.scadenza, l)}`)} value={eur2(nextRata.importo, l)} sub={tra(oggi, nextRata.scadenza, l)} />
      : <Head label={T(l, 'Piano concluso', 'Plan finished')} value={eur2(pl.totale, l)} sub={T(l, `Ultima rata il ${dt(pl.ultima, l)}`, `Last instalment on ${dt(pl.ultima, l)}`)} />;

  const result = (
    <>
      {head}
      <Rows rows={[
        [T(l, 'Rate effettive', 'Instalments'), num(pl.nEffettive, l)],
        [T(l, 'Rata ordinaria stimata', 'Estimated regular instalment'), eur2(pl.rate[Math.min(regime === 'quater' && pl.nEffettive > 1 ? 2 : 0, pl.rate.length - 1)].importo, l)],
        [T(l, 'Interessi stimati', 'Estimated interest'), eur2(pl.interessi, l)],
        [T(l, 'Totale da versare', 'Total to pay'), eur2(pl.totale, l), true],
        [T(l, 'Ultima scadenza', 'Last due date'), dts(pl.ultima, l)],
      ]} />
      {pl.ridotto && <Note>{T(l, `Con ${num(pl.nRichieste, l)} rate una rata scenderebbe sotto ${eur2(rp.rata_minima ?? 100, l)}: il numero viene ridotto d’ufficio a ${num(pl.nEffettive, l)}.`, `With ${num(pl.nRichieste, l)} instalments one would fall below ${eur2(rp.rata_minima ?? 100, l)}: the number is cut automatically to ${num(pl.nEffettive, l)}.`)}</Note>}
      <Note>{T(l, 'Stima: fa fede la Comunicazione delle somme dovute.', 'Estimate: the statement of sums due is binding.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  );

  const shown = tutte || pl.rate.length <= (compatto ? 6 : 12) ? pl.rate : pl.rate.slice(0, compatto ? 6 : 12);
  const below = (
    <div className="mt-6 border-t border-navy-200 pt-4">
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <button type="button" onClick={ics} className={btn}>{T(l, 'Scarica il calendario (.ics)', 'Download the calendar (.ics)')}</button>
        <button type="button" onClick={() => { setTutte(true); setTimeout(() => window.print(), 50); }} className={btn}>{T(l, 'Stampa il piano', 'Print the plan')}</button>
        <span className="text-xs text-navy-600">{T(l, 'Il file nasce nel tuo browser: nessun dato viene inviato.', 'The file is made in your browser: no data is sent.')}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="mb-2 text-left text-sm text-navy-600">{T(l, `${REGIME_SHORT[regime].it}: ${num(pl.nEffettive, l)} rate stimate su ${eur2(pl.capitale, l)}`, `${REGIME_SHORT[regime].en}: ${num(pl.nEffettive, l)} estimated instalments on ${eur2(pl.capitale, l)}`)}</caption>
          <thead><tr className="bg-navy-50 text-navy-900">
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Rata', 'No.')}</th>
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Scadenza', 'Due')}</th>
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Ultimo giorno utile', 'Last useful day')}</th>
            <th scope="col" className="px-2 py-2 text-right font-semibold">{T(l, 'Importo', 'Amount')}</th>
            <th scope="col" className="px-2 py-2 text-right font-semibold">{T(l, 'di cui interessi', 'of which interest')}</th>
          </tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.n} className={`border-b border-navy-100 ${r.ultimoGiorno < oggi ? 'text-navy-500' : 'text-navy-800'}`}>
                <td className="tabular-nums px-2 py-1.5">{r.n}</td>
                <td className="tabular-nums px-2 py-1.5">{dts(r.scadenza, l)}</td>
                <td className="tabular-nums px-2 py-1.5">{dts(r.ultimoGiorno, l)}{(r.n === pl.nEffettive) && pl.nEffettive > 1 ? T(l, ' (ultima)', ' (last)') : ''}</td>
                <td className="tabular-nums px-2 py-1.5 text-right">{eur2(r.importo, l)}</td>
                <td className="tabular-nums px-2 py-1.5 text-right">{eur2(r.interessi, l)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {shown.length < pl.rate.length && <button type="button" onClick={() => setTutte(true)} className="mt-3 text-sm font-semibold text-accent-700 underline print:hidden">{T(l, `Mostra tutte le ${pl.rate.length} rate`, `Show all ${pl.rate.length} instalments`)}</button>}
      <p className="mt-3 text-xs text-navy-600">{regime === 'quater' || regime === 'riammissione'
        ? T(l, 'Ultimo giorno utile: scadenza più 5 giorni di tolleranza (comma 244, legge 197/2022), spostati al primo giorno lavorativo. Una sola rata oltre questo giorno fa decadere.', 'Last useful day: due date plus the 5-day tolerance (paragraph 244, Law 197/2022), moved to the next working day. A single instalment after that day ends the settlement.')
        : T(l, 'Ultimo giorno utile: scadenza più 5 giorni, spostati al primo giorno lavorativo. La tolleranza vale per l’unica rata e per l’ultima; per le altre conta non saltarne due (comma 95, legge 199/2025).', 'Last useful day: due date plus 5 days, moved to the next working day. The tolerance covers the single payment and the last instalment; for the others what matters is not missing two (paragraph 95, Law 199/2025).')}</p>
    </div>
  );

  return <Shell id={id} form={form} result={result} below={below} />;
}
