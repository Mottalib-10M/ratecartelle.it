/** Somme dovute e rate → prima rata e rata stimata della quinquies di comuni e regioni (dal 31 marzo 2027). */
import { T, num, type L } from './_kit';
import { e2, d } from './_da';
import { piano } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'IMU, TARI o multe del comune: le mie rate', 'IMU, TARI or council fines: my instalments'),
  cta: T(l, 'Calendario completo delle rate', 'Full instalment calendar'),
  inputs: [
    { id: 'i', label: T(l, 'Somme dovute', 'Sum due'), def: 2400, unit: '€' },
    { id: 'n', label: T(l, 'Numero di rate', 'Number of instalments'), def: 24, max: 54 },
  ],
  run: (v) => {
    const p = piano('enti', v.i, Math.max(1, v.n));
    return {
      head: [T(l, 'Rata stimata', 'Estimated instalment'), e2(p.rate[0].importo, l)],
      rows: [
        [T(l, 'Prima rata', 'First instalment'), d(p.rate[0].scadenza, l)],
        [T(l, 'Rate effettive', 'Instalments'), num(p.nEffettive, l)],
        [T(l, 'Ultima rata', 'Last instalment'), d(p.ultima, l)],
      ],
    };
  },
});
