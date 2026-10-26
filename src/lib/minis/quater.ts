/** Rate quater già pagate → prossima rata, ultimo giorno utile e rate che restano (comma 232 L. 197/2022). */
import { T, num, type L } from './_kit';
import { d } from './_da';
import { datePiano, ultimoGiorno } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quater: la mia prossima rata', 'Quater: my next instalment'),
  cta: T(l, 'Piano completo della quater', 'Full quater plan'),
  inputs: [
    { id: 'p', label: T(l, 'Rate già pagate', 'Instalments already paid'), def: 12, max: 17 },
  ],
  run: (v) => {
    const dates = datePiano('quater', 18);
    const k = Math.min(Math.max(0, Math.round(v.p)), 17);
    return {
      head: [T(l, `Rata ${k + 1} di 18`, `Instalment ${k + 1} of 18`), d(dates[k], l)],
      rows: [
        [T(l, 'Ultimo giorno utile', 'Last useful day'), d(ultimoGiorno(dates[k]), l)],
        [T(l, 'Rate che restano dopo', 'Instalments left after'), num(17 - k, l)],
        [T(l, 'Ultima rata', 'Last instalment'), d(dates[17], l)],
      ],
    };
  },
});
