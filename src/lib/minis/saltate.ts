/** Rate saltate e ultima rata → decadenza o no (comma 95 L. 199/2025, FAQ ADER n. 12). */
import { T, num, type L } from './_kit';
import { yn } from './_da';
import { verificaDecadenza, type StatoRata } from '../engine/index';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Due rate saltate fanno decadere?', 'Do two missed instalments end it?'),
  cta: T(l, 'Verifica rata per rata', 'Check instalment by instalment'),
  inputs: [
    { id: 's', label: T(l, 'Rate non pagate o pagate in parte', 'Instalments unpaid or partly paid'), def: 1, max: 54 },
    { id: 'u', label: T(l, 'L’ultima rata è già scaduta?', 'Is the last instalment already due?'), def: 0, options: yn(l) },
  ],
  run: (v) => {
    const n = 10, s = Math.min(Math.round(v.s), n);
    const scadute = v.u ? n : Math.max(s + 1, 3);
    const stati: StatoRata[] = Array.from({ length: scadute }, (_, i) => (i < s ? 'no' : 'ok'));
    const r = verificaDecadenza('quinquies', n, stati);
    return {
      head: [T(l, 'Esito', 'Result'), r.decaduto ? T(l, 'Decaduto', 'Lapsed') : T(l, 'Non decaduto', 'Not lapsed')],
      rows: [
        [T(l, 'Rate scoperte', 'Uncovered instalments'), num(s, l)],
        [T(l, 'Soglia di legge', 'Legal threshold'), T(l, '2 rate, o l’ultima', '2 instalments, or the last')],
        [T(l, 'Motivo', 'Reason'), r.motivo === 'due_rate' ? T(l, 'due rate scoperte', 'two uncovered') : r.motivo === 'ultima' ? T(l, 'ultima rata scoperta', 'last one uncovered') : s === 1 ? T(l, 'una sola rata arretrata', 'one instalment behind') : T(l, 'nessuno', 'none')],
      ],
    };
  },
});
