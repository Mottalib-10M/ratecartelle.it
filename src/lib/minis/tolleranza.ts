/** Numero della rata → scadenza di legge e ultimo giorno utile con i 5 giorni e i festivi. */
import { T, type L } from './_kit';
import { d } from './_da';
import { datePiano, ultimoGiorno, isLavorativo } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Fino a quando posso pagare questa rata', 'Until when I can pay this instalment'),
  cta: T(l, 'Ultimo giorno utile per ogni definizione', 'Last useful day for every settlement'),
  inputs: [
    { id: 'n', label: T(l, 'Numero della rata quinquies', 'Quinquies instalment number'), def: 3, max: 54 },
  ],
  run: (v) => {
    const dates = datePiano('quinquies', 54);
    const s = dates[Math.min(Math.max(1, Math.round(v.n)), 54) - 1];
    return {
      head: [T(l, 'Ultimo giorno utile', 'Last useful day'), d(ultimoGiorno(s), l)],
      rows: [
        [T(l, 'Scadenza di legge', 'Statutory due date'), d(s, l)],
        [T(l, 'Cade in un giorno festivo o nel weekend', 'Falls on a weekend or holiday'), isLavorativo(s) ? 'No' : T(l, 'Sì', 'Yes')],
      ],
      note: T(l, 'La tolleranza conta per l’unica e l’ultima rata.', 'The tolerance matters for the single and the last instalment.'),
    };
  },
});
