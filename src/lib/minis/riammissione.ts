/** Somme dovute e rate → rata stimata della riammissione alla quater (2 % dal 1° novembre 2023, 10 rate). */
import { T, num, type L } from './_kit';
import { e2, d } from './_da';
import { piano } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Riammissione: quanto vale ogni rata', 'Readmission: how much each instalment is'),
  cta: T(l, 'Piano completo della riammissione', 'Full readmission plan'),
  inputs: [
    { id: 'i', label: T(l, 'Somme dovute', 'Sum due'), def: 6000, unit: '€' },
    { id: 'n', label: T(l, 'Numero di rate', 'Number of instalments'), def: 10, max: 10 },
  ],
  run: (v) => {
    const p = piano('riammissione', v.i, Math.max(1, v.n));
    return {
      head: [T(l, 'Rata stimata', 'Estimated instalment'), e2(p.rate[0].importo, l)],
      rows: [
        [T(l, 'Rate', 'Instalments'), num(p.nEffettive, l)],
        [T(l, 'Interessi stimati', 'Estimated interest'), e2(p.interessi, l)],
        [T(l, 'Ultima rata', 'Last instalment'), d(p.ultima, l)],
      ],
    };
  },
});
