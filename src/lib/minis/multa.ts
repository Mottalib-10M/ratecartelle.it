/** Multa, maggiorazioni e spese → cosa resta con la quinquies (comma 97) : la sanzione resta, cadono interessi e aggio. */
import { T, pct, type L } from './_kit';
import { e2 } from './_da';
import { risparmio } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Multa in cartella: cosa resta da pagare', 'Fine on a bill: what is left to pay'),
  cta: T(l, 'Calcolo completo con tutte le voci', 'Full calculation with every item'),
  inputs: [
    { id: 's', label: T(l, 'Importo della multa', 'Amount of the fine'), def: 173, unit: '€', decimals: 2 },
    { id: 'm', label: T(l, 'Maggiorazioni, interessi e aggio', 'Surcharges, interest and fee'), def: 110, unit: '€', decimals: 2 },
    { id: 'p', label: T(l, 'Spese di notifica', 'Service costs'), def: 8.75, unit: '€', decimals: 2 },
  ],
  run: (v) => {
    const r = risparmio('multa_stato', { capitale: 0, sanzioni: v.s, interessi: v.m, mora: 0, aggio: 0, spese: v.p });
    return {
      head: [T(l, 'Resta da pagare', 'Left to pay'), e2(r.dovuto, l)],
      rows: [
        [T(l, 'Cancellati', 'Written off'), e2(r.cancellato, l)],
        [T(l, 'Quota cancellata', 'Share written off'), pct(r.quota, l, 0)],
      ],
      note: T(l, 'La multa resta intera: cadono solo maggiorazioni, interessi e aggio.', 'The fine itself stays: only surcharges, interest and the fee go.'),
    };
  },
});
