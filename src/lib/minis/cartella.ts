/** Giorni dalla notifica e importo → termine dei 60 giorni e interessi di mora che partono dopo (artt. 25 e 30 DPR 602/1973). */
import { T, num, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Quanti giorni ho per pagare la cartella', 'How many days I have to pay the bill'),
  cta: T(l, 'Vedi se la cartella rientra in una definizione', 'See whether the bill fits a settlement'),
  inputs: [
    { id: 'g', label: T(l, 'Giorni dalla notifica', 'Days since it was served'), def: 20, max: 3650 },
  ],
  run: (v) => {
    const left = P.pagamento_cartella_giorni - Math.round(v.g);
    return {
      head: [T(l, 'Per pagare senza mora', 'To pay without late interest'), left >= 0 ? T(l, `${num(left, l)} giorni`, `${num(left, l)} days`) : T(l, 'termine passato', 'deadline passed')],
      rows: [
        [T(l, 'Termine', 'Deadline'), T(l, `${P.pagamento_cartella_giorni} giorni dalla notifica`, `${P.pagamento_cartella_giorni} days from service`)],
        [T(l, 'Dopo il termine', 'After the deadline'), T(l, 'interessi di mora sul capitale', 'late interest on the principal')],
        [T(l, 'Rateizzazione', 'Instalment plan'), T(l, 'si può chiedere anche dopo', 'can be asked later too')],
      ],
    };
  },
});
