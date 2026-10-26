/** Capitale, sanzioni e interessi della cartella → quanto si paga e quanto si cancella (comma 82). */
import { T, pct, type L } from './_kit';
import { e2 } from './_da';
import { risparmio } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanto si cancella dalla cartella', 'How much is written off the bill'),
  cta: T(l, 'Il calcolo voce per voce', 'The item-by-item calculation'),
  inputs: [
    { id: 'c', label: T(l, 'Imposta o contributo', 'Tax or contribution'), def: 5000, unit: '€' },
    { id: 's', label: T(l, 'Sanzioni', 'Penalties'), def: 1500, unit: '€' },
    { id: 'm', label: T(l, 'Interessi, mora e aggio', 'Interest, late interest and fee'), def: 1100, unit: '€' },
  ],
  run: (v) => {
    const r = risparmio('imposte', { capitale: v.c, sanzioni: v.s, interessi: v.m, mora: 0, aggio: 0, spese: 0 });
    return {
      head: [T(l, 'Paghi', 'You pay'), e2(r.dovuto, l)],
      rows: [
        [T(l, 'Cancellati', 'Written off'), e2(r.cancellato, l)],
        [T(l, 'Quota cancellata', 'Share written off'), pct(r.quota, l, 0)],
      ],
      note: T(l, 'Spese di notifica escluse: restano dovute.', 'Service costs left out: they stay due.'),
    };
  },
});
