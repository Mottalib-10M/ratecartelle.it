/**
 * Prossime scadenze delle definizioni agevolate : per definizione e periodo, data di legge, ultimo giorno utile,
 * giorni che mancano, numero della rata ; calendario .ics senza importi. Calendari : comma 83 L. 199/2025,
 * art. 10-quinquies DL 38/2026, comma 232 L. 197/2022, art. 3-bis DL 202/2024.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { datePiano, ultimoGiorno, type Regime } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { T, dt, dts, tra, num, oggiRoma, downloadIcs, btn, REGIME_SHORT, type L } from './common';

export interface ScadenzeProps { lang: L; id?: string; today: string; methodHref?: string; defaultRegime?: Regime | 'tutte'; defaultMesi?: number }
interface Riga { regime: Regime; n: number; scadenza: string; ultimo: string }

export default function ScadenzeTool({ lang: l, id = 'scadenze', today, methodHref, defaultRegime = 'tutte', defaultMesi = 12 }: ScadenzeProps) {
  const [oggi, setOggi] = useState(today);
  const [filtro, setFiltro] = useState<Regime | 'tutte'>(defaultRegime);
  const [mesi, setMesi] = useState(defaultMesi);
  useEffect(() => {
    setOggi(oggiRoma());
    const u = readParams(window.location.search);
    const f = u.get('f'); if (f && (f === 'tutte' || f in REGIME_SHORT)) setFiltro(f as Regime | 'tutte');
    const m = Number(u.get('m')); if ([6, 12, 24, 120].includes(m)) setMesi(m);
  }, []);
  useEffect(() => { updateURL({ f: filtro, m: mesi }); }, [filtro, mesi]);
  const fine = useMemo(() => { const d = new Date(`${oggi}T00:00:00Z`); d.setUTCMonth(d.getUTCMonth() + mesi); return d.toISOString().slice(0, 10); }, [oggi, mesi]);
  const righe: Riga[] = useMemo(() => {
    const regs: Regime[] = filtro === 'tutte' ? ['quinquies', 'enti', 'quater', 'riammissione'] : [filtro];
    return regs.flatMap((r) => datePiano(r, P[r].max_rate).map((d, i) => ({ regime: r, n: i + 1, scadenza: d, ultimo: ultimoGiorno(d) })))
      .filter((x) => x.ultimo >= oggi && x.scadenza <= fine)
      .sort((a, b) => a.scadenza.localeCompare(b.scadenza) || a.regime.localeCompare(b.regime));
  }, [filtro, oggi, fine]);
  const prima = righe[0];
  const ics = () => downloadIcs(righe.map((x) => ({
    date: x.scadenza,
    summary: T(l, `${REGIME_SHORT[x.regime].it}: rata ${x.n}`, `${REGIME_SHORT[x.regime].en}: instalment ${x.n}`),
    description: T(l, `Scadenza ${dts(x.scadenza, l)}, ultimo giorno utile stimato ${dts(x.ultimo, l)}. Importo: vedi la Comunicazione delle somme dovute.`, `Due ${dts(x.scadenza, l)}, estimated last useful day ${dts(x.ultimo, l)}. Amount: see your statement of sums due.`),
  })), `scadenze-${filtro}.ics`);

  const form = (
    <Row2>
      <SelectField id={`${id}-f`} label={T(l, 'Definizione', 'Settlement')} value={filtro} onChange={(x) => setFiltro(x as Regime | 'tutte')} options={[{ value: 'tutte', label: T(l, 'Tutte le definizioni', 'All settlements') }, ...(['quinquies', 'enti', 'quater', 'riammissione'] as Regime[]).map((r) => ({ value: r, label: REGIME_SHORT[r][l] }))]} />
      <SelectField id={`${id}-m`} label={T(l, 'Periodo', 'Period')} value={String(mesi)} onChange={(x) => setMesi(Number(x))} options={[6, 12, 24, 120].map((m) => ({ value: String(m), label: m === 120 ? T(l, 'Fino alla fine', 'To the end') : T(l, `Prossimi ${m} mesi`, `Next ${m} months`) }))} />
    </Row2>
  );
  const result = prima ? (
    <>
      <Head label={T(l, `Prossima scadenza: ${REGIME_SHORT[prima.regime].it}, rata ${prima.n}`, `Next due date: ${REGIME_SHORT[prima.regime].en}, instalment ${prima.n}`)} value={dt(prima.scadenza, l)} sub={tra(oggi, prima.scadenza, l)} />
      <Rows rows={[
        [T(l, 'Ultimo giorno utile stimato', 'Estimated last useful day'), dts(prima.ultimo, l)],
        [T(l, 'Scadenze nel periodo', 'Due dates in the period'), num(righe.length, l)],
        [T(l, 'Domanda quinquies enti', 'Local quinquies applications'), oggi <= P.enti.domanda_entro ? T(l, `entro il ${dts(P.enti.domanda_entro, l)}`, `by ${dts(P.enti.domanda_entro, l)}`) : T(l, 'chiusa', 'closed')],
      ]} />
      <Note>{T(l, 'Le date sono uguali per tutti; gli importi sono nella tua Comunicazione.', 'Dates are the same for everyone; amounts are in your statement.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  ) : <Head label={T(l, 'Nessuna scadenza nel periodo', 'No due date in the period')} value="–" />;
  const below = (
    <div className="mt-6 border-t border-navy-200 pt-4">
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <button type="button" onClick={ics} className={btn}>{T(l, 'Aggiungi al calendario (.ics)', 'Add to calendar (.ics)')}</button>
        <button type="button" onClick={() => window.print()} className={btn}>{T(l, 'Stampa', 'Print')}</button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-navy-50 text-navy-900">
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Scadenza', 'Due')}</th>
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Definizione', 'Settlement')}</th>
            <th scope="col" className="px-2 py-2 text-right font-semibold">{T(l, 'Rata', 'No.')}</th>
            <th scope="col" className="px-2 py-2 text-left font-semibold">{T(l, 'Ultimo giorno utile', 'Last useful day')}</th>
          </tr></thead>
          <tbody>{righe.slice(0, 40).map((x) => (
            <tr key={x.regime + x.n} className="border-b border-navy-100 text-navy-800">
              <td className="tabular-nums px-2 py-1.5">{dts(x.scadenza, l)}</td>
              <td className="px-2 py-1.5">{REGIME_SHORT[x.regime][l]}</td>
              <td className="tabular-nums px-2 py-1.5 text-right">{x.n}</td>
              <td className="tabular-nums px-2 py-1.5">{dts(x.ultimo, l)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
  return <Shell id={id} form={form} result={result} below={below} />;
}
