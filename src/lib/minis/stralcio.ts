/** Carico residuo e anno di affidamento → stralcio automatico fino a 1.000 € (commi 222-230 L. 197/2022). */
import { T, type L } from './_kit';
import { e2, yn } from './_da';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Il mio vecchio debito è stato stralciato?', 'Was my old debt written off?'),
  cta: T(l, 'Verifica quale definizione copre il carico', 'Check which settlement covers the debt'),
  inputs: [
    { id: 'i', label: T(l, 'Residuo del singolo carico al 1/1/2023', 'Balance of the single debt at 1/1/2023'), def: 640, unit: '€', decimals: 2 },
    { id: 'a', label: T(l, 'Anno di affidamento', 'Year passed on'), def: 2012, max: 2030 },
    { id: 's', label: T(l, 'Creditore dello Stato (Agenzia, INPS)?', 'A State creditor (Agenzia, INPS)?'), def: 1, options: yn(l) },
  ],
  run: (v) => {
    const anni = v.a >= 2000 && v.a <= 2015;
    const ok = anni && v.i <= P.stralcio.soglia;
    return {
      head: [T(l, 'Stralcio automatico', 'Automatic write-off'), !ok ? T(l, 'No', 'No') : v.s ? T(l, 'Annullato per intero', 'Cancelled in full') : T(l, 'Solo interessi e sanzioni', 'Interest and penalties only')],
      rows: [
        [T(l, 'Soglia per carico', 'Threshold per debt'), e2(P.stralcio.soglia, l)],
        [T(l, 'Periodo', 'Period'), '2000 – 2015'],
        [T(l, 'Data dell’annullamento', 'Date of cancellation'), v.s && ok ? T(l, '30 aprile 2023', '30 April 2023') : '–'],
      ],
      note: !anni ? T(l, 'Lo stralcio riguarda solo i carichi affidati dal 2000 al 2015.', 'The write-off only covers debts passed on from 2000 to 2015.') : undefined,
    };
  },
});
