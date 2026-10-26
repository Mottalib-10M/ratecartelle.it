/** Somme dovute e numero di rate → rata stimata della quinquies (rata minima 100 €, 3 % dal 1° agosto 2026). */
import { T, num, type L } from './_kit';
import { e2 } from './_da';
import { piano } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto pago a ogni rata', 'How much each instalment is'),
  cta: T(l, 'Il calendario completo, rata per rata', 'The full calendar, instalment by instalment'),
  inputs: [
    { id: 'i', label: T(l, 'Somme dovute', 'Sum due'), def: 8000, unit: '€' },
    { id: 'n', label: T(l, 'Numero di rate', 'Number of instalments'), def: 54, max: 54 },
  ],
  run: (v) => {
    const p = piano('quinquies', v.i, Math.max(1, v.n));
    return {
      head: [T(l, 'Rata stimata', 'Estimated instalment'), e2(p.rate[0].importo, l)],
      rows: [
        [T(l, 'Rate effettive', 'Instalments'), num(p.nEffettive, l)],
        [T(l, 'Interessi stimati', 'Estimated interest'), e2(p.interessi, l)],
        [T(l, 'Totale', 'Total'), e2(p.totale, l)],
      ],
      note: p.ridotto ? T(l, 'Rate ridotte: nessuna può scendere sotto 100 €.', 'Fewer instalments: none may fall below €100.') : undefined,
    };
  },
});
