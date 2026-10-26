/** Anno di affidamento e creditore → quale definizione copre oggi il carico (quinquies, enti, nessuna). */
import { T, type L } from './_kit';
import { ammissibilita, type Ente } from '../engine/index';
import type { MiniSpec } from '../mini-types';
const ENTI: Ente[] = ['ade_dichiarazione', 'inps_omesso', 'prefettura', 'comune_regione', 'ade_accertamento'];
export default (l: L): MiniSpec => ({
  title: T(l, 'Quale definizione copre il mio carico', 'Which settlement covers my debt'),
  cta: T(l, 'Verifica completa con le rottamazioni precedenti', 'Full check including earlier settlements'),
  inputs: [
    { id: 'a', label: T(l, 'Anno di affidamento', 'Year passed on'), def: 2024, max: 2030 },
    { id: 'e', label: T(l, 'Creditore', 'Creditor'), def: 0, options: [
      { value: '0', label: T(l, 'Agenzia delle entrate (dichiarazione)', 'Agenzia delle entrate (tax return)') },
      { value: '1', label: T(l, 'INPS (contributi non versati)', 'INPS (unpaid contributions)') },
      { value: '2', label: T(l, 'Prefettura (multa)', 'Prefettura (fine)') },
      { value: '3', label: T(l, 'Comune o regione', 'Comune or region') },
      { value: '4', label: T(l, 'Accertamento fiscale', 'Tax assessment') },
    ] },
  ],
  run: (v) => {
    const r = ammissibilita(Math.round(v.a), ENTI[v.e] ?? 'ade_dichiarazione', 'nessuna');
    return {
      head: [T(l, 'Copertura oggi', 'Covered today by'), r.quinquies ? 'Rottamazione-quinquies' : r.enti ? T(l, 'Quinquies degli enti', 'Local quinquies') : T(l, 'Nessuna definizione', 'No settlement')],
      rows: [
        [T(l, 'Periodo coperto', 'Period covered'), '2000 – 2023'],
        [T(l, 'Nuovo testo dopo il 2023', 'New text after 2023'), T(l, 'non pubblicato', 'not published')],
      ],
      note: r.motivo === 'dopo_2023' ? T(l, 'Per questi carichi resta la rateizzazione ordinaria.', 'For these debts the ordinary instalment plan remains.') : undefined,
    };
  },
});
