/** Rate già pagate → numero, data e ultimo giorno utile della prossima rata della quinquies. */
import { T, num, type L } from './_kit';
import { d } from './_da';
import { datePiano, ultimoGiorno } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quando scade la mia prossima rata', 'When my next instalment is due'),
  cta: T(l, 'Tutte le scadenze, con il file per il calendario', 'Every due date, with a calendar file'),
  inputs: [
    { id: 'p', label: T(l, 'Rate già pagate', 'Instalments already paid'), def: 2, max: 53 },
    { id: 'n', label: T(l, 'Rate del piano', 'Instalments in the plan'), def: 54, max: 54 },
  ],
  run: (v) => {
    const dates = datePiano('quinquies', Math.max(2, v.n));
    const k = Math.min(Math.max(0, Math.round(v.p)), dates.length - 1);
    const s = dates[k];
    return {
      head: [T(l, `Rata ${k + 1} di ${dates.length}`, `Instalment ${k + 1} of ${dates.length}`), d(s, l)],
      rows: [
        [T(l, 'Ultimo giorno utile', 'Last useful day'), d(ultimoGiorno(s), l)],
        [T(l, 'Rate che restano dopo', 'Instalments left after'), num(dates.length - k - 1, l)],
        [T(l, 'Ultima rata', 'Last instalment'), d(dates[dates.length - 1], l)],
      ],
    };
  },
});
