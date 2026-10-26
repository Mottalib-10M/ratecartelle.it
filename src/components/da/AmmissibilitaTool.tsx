/**
 * Quale definizione copre il tuo carico : anno di affidamento, ente creditore, piano precedente → quinquies,
 * quinquies degli enti territoriali, nessuna ; cosa si cancella e quali termini restano aperti.
 * Commi 82, 97, 99, 100 L. 199/2025 ; art. 10-quinquies DL 38/2026 (L. 88/2026, L. 113/2026).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Shell, Head, Rows, Note, MethodLink, Row2 } from '../calc/kit';
import { ammissibilita, type Ente, type Precedente } from '../../lib/engine/index';
import { P } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { T, dt, dts, tra, oggiRoma, type L } from './common';

export interface AmmissibilitaProps { lang: L; id?: string; today: string; methodHref?: string; defaultEnte?: Ente; defaultAnno?: number; defaultPrecedente?: Precedente }
const ENTE_LABEL: Record<Ente, { it: string; en: string }> = {
  ade_dichiarazione: { it: 'Agenzia delle entrate: imposte dichiarate e non versate', en: 'Agenzia delle entrate: taxes declared but not paid' },
  ade_accertamento: { it: 'Agenzia delle entrate: avviso di accertamento', en: 'Agenzia delle entrate: tax assessment' },
  inps_omesso: { it: 'INPS: contributi non versati', en: 'INPS: unpaid contributions' },
  inps_accertamento: { it: 'INPS: contributi da accertamento', en: 'INPS: contributions from an assessment' },
  prefettura: { it: 'Prefettura: multa stradale', en: 'Prefettura: traffic fine' },
  comune_regione: { it: 'Comune, provincia o regione (tributi e multe)', en: 'Comune, province or region (taxes and fines)' },
  altro_statale: { it: 'Altro ente dello Stato (camera di commercio, ministeri…)', en: 'Other State body (chamber of commerce, ministries…)' },
  escluso: { it: 'Condanna della Corte dei conti', en: 'Court of Auditors judgment' },
};
const PREC_LABEL: Record<Precedente, { it: string; en: string }> = {
  nessuna: { it: 'Nessuna rottamazione', en: 'No earlier settlement' },
  quater_in_regola: { it: 'Quater o riammissione, in regola al 30/9/2025', en: 'Quater or readmission, up to date at 30/9/2025' },
  quater_decaduto: { it: 'Quater o riammissione, decaduto al 30/9/2025', en: 'Quater or readmission, lapsed by 30/9/2025' },
  vecchie_decadute: { it: 'Rottamazioni 2016-2019 o saldo e stralcio decaduti', en: 'Lapsed 2016-2019 settlements or saldo e stralcio' },
};

export default function AmmissibilitaTool({ lang: l, id = 'ammissibilita', today, methodHref, defaultEnte = 'ade_dichiarazione', defaultAnno = 2019, defaultPrecedente = 'nessuna' }: AmmissibilitaProps) {
  const [oggi, setOggi] = useState(today);
  const [anno, setAnno] = useState(defaultAnno);
  const [ente, setEnte] = useState<Ente>(defaultEnte);
  const [prec, setPrec] = useState<Precedente>(defaultPrecedente);
  useEffect(() => {
    setOggi(oggiRoma());
    const u = readParams(window.location.search);
    const a = Number(u.get('a')); if (a >= 1990 && a <= 2030) setAnno(a);
    const e = u.get('e') as Ente | null; if (e && e in ENTE_LABEL) setEnte(e);
    const p = u.get('p') as Precedente | null; if (p && p in PREC_LABEL) setPrec(p);
  }, []);
  useEffect(() => { updateURL({ a: anno, e: ente, p: prec }); }, [anno, ente, prec]);
  const r = useMemo(() => ammissibilita(anno, ente, prec), [anno, ente, prec]);
  const Q = P.quinquies, E = P.enti;
  const entiAperta = oggi <= E.domanda_entro;

  const form = (
    <>
      <SelectField id={`${id}-e`} label={T(l, 'Chi è il creditore', 'Who the creditor is')} value={ente} onChange={(x) => setEnte(x as Ente)} options={(Object.keys(ENTE_LABEL) as Ente[]).map((k) => ({ value: k, label: ENTE_LABEL[k][l] }))} />
      <Row2>
        <NumberField id={`${id}-a`} label={T(l, 'Anno di affidamento del carico', 'Year the debt was passed on')} value={anno} onChange={setAnno} min={1990} max={2030} help={T(l, 'Lo trovi nell’estratto di ruolo', 'Shown in the estratto di ruolo')} />
        <SelectField id={`${id}-p`} label={T(l, 'Rottamazioni precedenti', 'Earlier settlements')} value={prec} onChange={(x) => setPrec(x as Precedente)} options={(Object.keys(PREC_LABEL) as Precedente[]).map((k) => ({ value: k, label: PREC_LABEL[k][l] }))} />
      </Row2>
    </>
  );

  let head: [string, string, string];
  if (r.quinquies) head = [T(l, 'Il carico rientra nella', 'The debt falls under the'), 'Rottamazione-quinquies', T(l, `Domanda chiusa il ${dt(Q.domanda_entro, l)}: vale solo se l’hai presentata`, `Applications closed on ${dt(Q.domanda_entro, l)}: it only helps if you applied`)];
  else if (r.enti) head = [T(l, 'Il carico può rientrare nella', 'The debt may fall under the'), T(l, 'Quinquies di comuni e regioni', 'Local-authority quinquies'), entiAperta ? T(l, `Domanda entro il ${dt(E.domanda_entro, l)}, ${tra(oggi, E.domanda_entro, l)}, se l’ente ha aderito`, `Apply by ${dt(E.domanda_entro, l)}, ${tra(oggi, E.domanda_entro, l)}, if the authority opted in`) : T(l, `Domanda chiusa il ${dt(E.domanda_entro, l)}`, `Applications closed on ${dt(E.domanda_entro, l)}`)];
  else head = [T(l, 'Definizione agevolata', 'Settlement'), T(l, 'Non rientra', 'Not covered'), r.motivo === 'dopo_2023' ? T(l, 'Carichi affidati dopo il 31/12/2023: nessun testo li copre oggi', 'Debts passed on after 31/12/2023: no text covers them today') : r.motivo === 'prima_2000' ? T(l, 'Carichi affidati prima del 2000', 'Debts passed on before 2000') : r.motivo === 'quater_in_regola' ? T(l, 'Resta nel piano della quater, che va pagato fino in fondo', 'It stays in the quater plan, which must be paid to the end') : r.motivo === 'escluso' ? T(l, 'Le condanne della Corte dei conti sono escluse', 'Court of Auditors judgments are excluded') : T(l, 'La quinquies copre imposte dichiarate, controlli automatici e INPS non accertati', 'The quinquies covers declared taxes, automated checks and non-assessed INPS')];

  const rows: Array<[string, string]> = [
    [T(l, 'Periodo coperto', 'Period covered'), `${dts(Q.carichi_dal, l)} – ${dts(Q.carichi_al, l)}`],
  ];
  if (r.quinquies) rows.push([T(l, 'Si cancellano', 'Written off'), ente === 'prefettura' ? T(l, 'interessi e aggio', 'interest and fee') : T(l, 'sanzioni, interessi, mora, aggio', 'penalties, interest, late interest, fee')], [T(l, 'Unica o prima rata', 'Single or first instalment'), dts(Q.unica, l)]);
  if (r.enti) rows.push([T(l, 'Elenco degli enti aderenti', 'List of authorities taking part'), T(l, `aggiornato al ${dts(E.elenco.aggiornato, l)}`, `updated ${dts(E.elenco.aggiornato, l)}`)], [T(l, 'Unica o prima rata', 'Single or first instalment'), dts(E.unica, l)], [T(l, 'Si cancellano', 'Written off'), T(l, 'sanzioni e interessi (multe: solo interessi)', 'penalties and interest (fines: interest only)')]);
  if (!r.quinquies && !r.enti) rows.push([T(l, 'Strada possibile', 'Possible route'), T(l, 'rateizzazione ordinaria', 'ordinary instalment plan')]);

  const result = (
    <>
      <Head label={head[0]} value={head[1]} sub={head[2]} />
      <Rows rows={rows} />
      {prec === 'quater_decaduto' && r.quinquies && <Note>{T(l, 'I carichi della quater decaduti al 30 settembre 2025 sono ammessi alla quinquies (comma 99).', 'Quater debts lapsed by 30 September 2025 are admitted to the quinquies (paragraph 99).')}</Note>}
      {prec === 'vecchie_decadute' && r.quinquies && <Note>{T(l, 'Ammessi anche i carichi delle rottamazioni 2016-2019 e del saldo e stralcio decaduti (comma 99).', 'Lapsed debts from the 2016-2019 settlements and saldo e stralcio are admitted too (paragraph 99).')}</Note>}
      {r.enti && <Note>{T(l, 'Conta l’ente che ha affidato il carico, non il tuo comune di residenza: controllalo nel prospetto informativo.', 'What counts is the authority that passed on the debt, not where you live: check it in the statement of eligible debts.')}</Note>}
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
