/** Costo degli interessi del 3 % secondo il numero di rate : unica soluzione contro piano lungo. */
import { T, num, type L } from './_kit';
import { e2 } from './_da';
import { piano } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto costano gli interessi delle rate', 'What the instalment interest costs'),
  cta: T(l, 'Confronta i piani nel calendario', 'Compare plans in the calendar'),
  inputs: [
    { id: 'i', label: T(l, 'Somme dovute', 'Sum due'), def: 20000, unit: '€' },
    { id: 'n', label: T(l, 'Numero di rate', 'Number of instalments'), def: 27, max: 54 },
  ],
  run: (v) => {
    const p = piano('quinquies', v.i, Math.max(1, v.n));
    const lungo = piano('quinquies', v.i, 54);
    return {
      head: [T(l, `Interessi in ${num(p.nEffettive, l)} rate`, `Interest over ${num(p.nEffettive, l)} instalments`), e2(p.interessi, l)],
      rows: [
        [T(l, 'Rata stimata', 'Estimated instalment'), e2(p.rate[0].importo, l)],
        [T(l, 'Interessi con 54 rate', 'Interest with 54 instalments'), e2(lungo.interessi, l)],
        [T(l, 'Unica soluzione', 'Single payment'), T(l, 'nessun interesse', 'no interest')],
      ],
    };
  },
});
