/** Importo e mesi → rata mensile della rateizzazione ordinaria al 4,5 % (art. 19 e 21 DPR 602/1973). */
import { T, num, type L } from './_kit';
import { e2 } from './_da';
import { rateizzazione } from '../engine/index';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Rata mensile della rateizzazione', 'Monthly instalment of a payment plan'),
  cta: T(l, 'Confronto completo con una definizione', 'Full comparison with a settlement'),
  inputs: [
    { id: 'i', label: T(l, 'Debito da rateizzare', 'Debt to spread'), def: 12000, unit: '€' },
    { id: 'm', label: T(l, 'Mesi', 'Months'), def: 84, max: 120 },
  ],
  run: (v) => {
    const r = rateizzazione(v.i, Math.max(1, v.m), '2026-06-30');
    return {
      head: [T(l, `Rata in ${num(r.mesi, l)} mesi`, `Instalment over ${num(r.mesi, l)} months`), e2(r.rata, l)],
      rows: [
        [T(l, 'Interessi stimati', 'Estimated interest'), e2(r.interessi, l)],
        [T(l, 'Documenti richiesti', 'Paperwork needed'), r.documentazione ? T(l, 'sì, oltre 84 rate o 120.000 €', 'yes, above 84 instalments or €120,000') : T(l, 'no', 'no')],
      ],
      note: !r.rataMinimaOk ? T(l, `Rata minima ${e2(P.rateizzazione.rata_minima, l)}.`, `Minimum instalment ${e2(P.rateizzazione.rata_minima, l)}.`) : undefined,
    };
  },
});
