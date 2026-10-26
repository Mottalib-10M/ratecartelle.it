/**
 * Cosa si cancella e cosa resta : voci lette sulla cartella (o sul prospetto informativo) → somme dovute per la
 * definizione, somme cancellate, costo delle rate. Commi 82 e 97 L. 199/2025 ; art. 10-quinquies DL 38/2026, lett. f.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { risparmio, piano, type TipoDebito, type Voci } from '../../lib/engine/index';
import { formatPercent } from '../../lib/format';
import { readParams, updateURL } from '../../lib/url-state';
import { T, eur2, num, type L } from './common';

export interface RisparmioProps { lang: L; id?: string; methodHref?: string; tipi?: TipoDebito[]; defaultTipo?: TipoDebito; defaultVoci?: Partial<Voci>; defaultRate?: number }
const TIPO_LABEL: Record<TipoDebito, { it: string; en: string }> = {
  imposte: { it: 'Imposte non versate (dichiarazione, controlli automatici)', en: 'Unpaid taxes (tax return, automated checks)' },
  inps: { it: 'Contributi INPS non versati', en: 'Unpaid INPS contributions' },
  multa_stato: { it: 'Multa stradale della prefettura', en: 'Traffic fine from a prefettura' },
  ente_tributo: { it: 'Tributo di comune o regione (IMU, TARI, bollo…)', en: 'Comune or regional tax (IMU, TARI, car tax…)' },
  ente_multa: { it: 'Multa o sanzione di comune o regione', en: 'Fine or penalty from a comune or region' },
};
const VOCI: Array<{ k: keyof Voci; it: string; en: string; hit: string; hen: string }> = [
  { k: 'capitale', it: 'Imposta, tributo o contributo', en: 'Tax or contribution', hit: 'La somma originaria (capitale)', hen: 'The original sum (principal)' },
  { k: 'sanzioni', it: 'Sanzioni', en: 'Penalties', hit: 'Per una multa: l’importo della multa', hen: 'For a fine: the fine itself' },
  { k: 'interessi', it: 'Interessi iscritti a ruolo', en: 'Interest on the roll', hit: 'Anche la maggiorazione della multa', hen: 'Including the fine surcharge' },
  { k: 'mora', it: 'Interessi di mora', en: 'Late-payment interest', hit: 'Maturati dopo i 60 giorni', hen: 'Accrued after 60 days' },
  { k: 'aggio', it: 'Aggio od oneri di riscossione', en: 'Collection fee', hit: 'Non c’è per i carichi dal 2022', hen: 'None for debts from 2022' },
  { k: 'spese', it: 'Spese di notifica e procedure', en: 'Service and enforcement costs', hit: 'Restano sempre dovute', hen: 'Always payable' },
];

export default function RisparmioTool({ lang: l, id = 'risparmio', methodHref, tipi = ['imposte', 'inps', 'multa_stato', 'ente_tributo', 'ente_multa'], defaultTipo = 'imposte', defaultVoci = {}, defaultRate = 18 }: RisparmioProps) {
  const base: Voci = { capitale: 6000, sanzioni: 1800, interessi: 450, mora: 620, aggio: 380, spese: 15, ...defaultVoci };
  const [tipo, setTipo] = useState<TipoDebito>(defaultTipo);
  const [v, setV] = useState<Voci>(base);
  const [n, setN] = useState(defaultRate);
  useEffect(() => {
    const u = readParams(window.location.search);
    const t = u.get('t') as TipoDebito | null; if (t && tipi.includes(t)) setTipo(t);
    const nv = { ...base }; let any = false;
    for (const x of VOCI) { const q = u.get(x.k[0] + x.k[1]); if (q !== null && !isNaN(Number(q))) { nv[x.k] = Number(q); any = true; } }
    if (any) setV(nv);
    const k = Number(u.get('n')); if (k > 0) setN(k);
  }, []);
  useEffect(() => { updateURL({ t: tipo, ...Object.fromEntries(VOCI.map((x) => [x.k[0] + x.k[1], v[x.k]])), n }); }, [tipo, v, n]);
  const r = useMemo(() => risparmio(tipo, v), [tipo, v]);
  const regime = tipo === 'ente_tributo' || tipo === 'ente_multa' ? 'enti' : 'quinquies';
  const pl = piano(regime, r.dovuto, n);
  const multa = tipo === 'multa_stato' || tipo === 'ente_multa';
  const set = (k: keyof Voci) => (x: number) => setV((o) => ({ ...o, [k]: x }));

  const form = (
    <>
      <SelectField id={`${id}-t`} label={T(l, 'Da dove viene il debito', 'Where the debt comes from')} value={tipo} onChange={(x) => setTipo(x as TipoDebito)} options={tipi.map((t) => ({ value: t, label: TIPO_LABEL[t][l] }))} />
      <Row2>
        {VOCI.map((x) => <NumberField key={x.k} id={`${id}-${x.k}`} label={T(l, x.it, x.en)} value={v[x.k]} onChange={set(x.k)} unit="€" decimals={2} help={T(l, x.hit, x.hen)} />)}
      </Row2>
      <SelectField id={`${id}-n`} label={T(l, 'Rate per pagare il resto', 'Instalments to pay the rest')} value={String(n)} onChange={(x) => setN(Number(x))} options={[1, 6, 10, 18, 24, 36, 54].map((k) => ({ value: String(k), label: k === 1 ? T(l, 'Unica soluzione', 'Single payment') : T(l, `${k} rate bimestrali`, `${k} two-monthly instalments`) }))} />
    </>
  );
  const result = (
    <>
      <Head label={T(l, 'Paghi con la definizione', 'You pay under the settlement')} value={eur2(r.dovuto, l)} sub={T(l, `Cancellati ${eur2(r.cancellato, l)}, il ${formatPercent(r.quota, 0, l)} del totale`, `${eur2(r.cancellato, l)} written off, ${formatPercent(r.quota, 0, l)} of the total`)} />
      <Rows rows={[
        ...r.dettaglio.filter((d) => d.importo > 0).map((d) => [`${T(l, VOCI.find((x) => x.k === d.voce)!.it, VOCI.find((x) => x.k === d.voce)!.en)}`, d.cancellata ? T(l, `cancellati ${eur2(d.importo, l)}`, `written off ${eur2(d.importo, l)}`) : eur2(d.importo, l)] as [string, string]),
        [T(l, `Totale in ${num(pl.nEffettive, l)} ${pl.nEffettive === 1 ? 'versamento' : 'rate'}`, `Total over ${num(pl.nEffettive, l)} ${pl.nEffettive === 1 ? 'payment' : 'instalments'}`), eur2(pl.totale, l), true],
        ...(pl.nEffettive > 1 ? [[T(l, 'Rata stimata', 'Estimated instalment'), eur2(pl.rate[0].importo, l)] as [string, string]] : []),
      ]} />
      {multa && <Note>{T(l, 'Per le multe la sanzione resta dovuta: si cancellano solo interessi, maggiorazioni e aggio.', 'For fines the penalty itself stays due: only interest, surcharges and the fee are written off.')}</Note>}
      {pl.ridotto && <Note>{T(l, `Rate ridotte a ${num(pl.nEffettive, l)}: nessuna può essere sotto 100 €.`, `Cut to ${num(pl.nEffettive, l)} instalments: none may be under €100.`)}</Note>}
      <Note>{T(l, 'Le voci restano nel tuo browser: nulla viene inviato.', 'What you type stays in your browser: nothing is sent.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
