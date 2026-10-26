/**
 * Rateizzazione ordinaria (art. 19 DPR 602/1973, come riscritto dal D.Lgs. 110/2024) a confronto con una
 * definizione agevolata : rate mensili, interessi (4,5 % erariali, 4,65 % INPS), documentazione richiesta,
 * rate non pagate che fanno decadere. Il confronto usa il calendario della quinquies degli enti (domanda aperta).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { rateizzazione, maxRateSemplici, rateDecadenzaRateizzazione, piano } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { formatPercent } from '../../lib/format';
import { readParams, updateURL } from '../../lib/url-state';
import { T, eur2, num, oggiRoma, type L } from './common';

export interface RateizzazioneProps { lang: L; id?: string; today: string; methodHref?: string; defaultImporto?: number; defaultMesi?: number; defaultDefinizione?: number }

export default function RateizzazioneTool({ lang: l, id = 'rateizzazione', today, methodHref, defaultImporto = 15000, defaultMesi = 84, defaultDefinizione = 9000 }: RateizzazioneProps) {
  const [oggi, setOggi] = useState(today);
  const [importo, setImporto] = useState(defaultImporto);
  const [mesi, setMesi] = useState(defaultMesi);
  const [anno, setAnno] = useState(today.slice(0, 4));
  const [inps, setInps] = useState(false);
  const [def, setDef] = useState(defaultDefinizione);
  useEffect(() => {
    const t = oggiRoma(); setOggi(t);
    const u = readParams(window.location.search);
    const i = Number(u.get('i')); if (i > 0) setImporto(i);
    const m = Number(u.get('m')); if (m > 0) setMesi(m);
    const a = u.get('a'); if (a && /^20\d\d$/.test(a)) setAnno(a); else setAnno(t.slice(0, 4));
    if (u.get('p') === '1') setInps(true);
    const d = u.get('d'); if (d !== null && !isNaN(Number(d))) setDef(Number(d));
  }, []);
  useEffect(() => { updateURL({ i: importo, m: mesi, a: anno, p: inps ? 1 : undefined, d: def }); }, [importo, mesi, anno, inps, def]);
  const data = `${anno}-${anno === oggi.slice(0, 4) ? oggi.slice(5) : '06-30'}`;
  const r = useMemo(() => rateizzazione(Math.max(0, importo), mesi, data, inps), [importo, mesi, data, inps]);
  const maxS = maxRateSemplici(data);
  const dec = rateDecadenzaRateizzazione(data);
  const pl = def > 0 ? piano('enti', def, 54) : null;
  const anni = ['2025', '2026', '2027', '2028', '2029'];

  const form = (
    <>
      <Row2>
        <NumberField id={`${id}-i`} label={T(l, 'Debito da rateizzare', 'Debt to spread')} value={importo} onChange={setImporto} unit="€" help={T(l, 'Tutte le voci della cartella', 'Every item on the bill')} />
        <NumberField id={`${id}-m`} label={T(l, 'Rate mensili', 'Monthly instalments')} value={mesi} onChange={setMesi} min={1} max={P.rateizzazione.documentata_max} help={T(l, `Fino a ${maxS} senza documenti, ${P.rateizzazione.documentata_max} con`, `Up to ${maxS} without papers, ${P.rateizzazione.documentata_max} with`)} />
        <SelectField id={`${id}-a`} label={T(l, 'Anno della richiesta', 'Year of the request')} value={anno} onChange={setAnno} options={anni.map((a) => ({ value: a, label: a }))} />
        <Toggle id={`${id}-p`} label={T(l, 'Natura del debito', 'Kind of debt')} value={inps ? '1' : '0'} onChange={(x) => setInps(x === '1')} options={[{ value: '0', label: T(l, 'Tasse', 'Taxes') }, { value: '1', label: 'INPS' }]} />
      </Row2>
      <NumberField id={`${id}-d`} label={T(l, 'Somme dovute con una definizione (0 = nessun confronto)', 'Sum due under a settlement (0 = no comparison)')} value={def} onChange={setDef} unit="€" help={T(l, 'Capitale e spese, senza sanzioni né interessi', 'Principal and costs, no penalties or interest')} />
    </>
  );
  const result = (
    <>
      <Head label={T(l, `Rata mensile in ${num(r.mesi, l)} mesi`, `Monthly instalment over ${num(r.mesi, l)} months`)} value={eur2(r.rata, l)} sub={r.documentazione ? T(l, 'Serve documentare la difficoltà economica', 'Proof of financial hardship is needed') : T(l, 'Basta una semplice richiesta', 'A simple request is enough')} />
      <Rows rows={[
        [T(l, 'Tasso annuo', 'Annual rate'), formatPercent(inps ? P.rateizzazione.tasso_inps : P.rateizzazione.tasso_erariale, inps ? 2 : 1, l)],
        [T(l, 'Interessi stimati', 'Estimated interest'), eur2(r.interessi, l)],
        [T(l, 'Totale rateizzazione', 'Instalment plan total'), eur2(r.totale, l), true],
        [T(l, 'Decade dopo', 'Lapses after'), T(l, `${dec} rate non pagate`, `${dec} unpaid instalments`)],
        ...(pl ? [[T(l, `Definizione in ${num(pl.nEffettive, l)} rate bimestrali`, `Settlement in ${num(pl.nEffettive, l)} two-monthly instalments`), eur2(pl.totale, l), true] as [string, string, boolean], [T(l, 'Differenza', 'Difference'), eur2(r.totale - pl.totale, l)] as [string, string]] : []),
      ]} />
      {!r.rataMinimaOk && <Note>{T(l, `La rata non può essere sotto ${eur2(P.rateizzazione.rata_minima, l)}: servono meno mesi.`, `An instalment cannot be under ${eur2(P.rateizzazione.rata_minima, l)}: choose fewer months.`)}</Note>}
      {importo > P.rateizzazione.soglia_semplice && <Note>{T(l, 'Sopra 120.000 € la difficoltà va sempre documentata.', 'Above €120,000 hardship must always be documented.')}</Note>}
      <Note>{T(l, 'I carichi di una definizione decaduta non si possono più rateizzare.', 'Debts from a lapsed settlement can no longer be spread.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
