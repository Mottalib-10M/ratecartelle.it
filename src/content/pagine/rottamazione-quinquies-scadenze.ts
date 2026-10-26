import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quinquies-scadenze',
  group: 'quinquies',
  order: 2,
  tool: 'scadenze',
  outil: { defaultRegime: 'quinquies', defaultMesi: 12 },
  related: ['rottamazione-quinquies-30-novembre', 'rottamazione-quinquies-rate', 'pagamento-rottamazione', 'rottamazione-quinquies-comuni-regioni', 'rottamazione-quater'],
  sources: ['l199', 'faqQuinquies', 'aderScadenze', 'dl38'],
  it: {
    slug: 'rottamazione-quinquies-scadenze',
    nav: 'Scadenze',
    card: 'Le prossime date di tutte le rottamazioni, con l’ultimo giorno utile e un file per il calendario.',
    title: 'Scadenze rottamazione quinquies: calendario 2026-2035',
    description: 'Scadenze della rottamazione quinquies: le date delle 54 rate fino al 2035, ultimo giorno utile con i 5 giorni e i festivi, file .ics per il calendario.',
    h1: 'Scadenze della rottamazione-quinquies e delle altre definizioni',
    intro: 'Scegli la definizione e il periodo: l’elenco mostra ogni scadenza con il numero della rata, l’ultimo giorno utile e i giorni che mancano, e si salva nel calendario del telefono in un clic.',
    resume: (h) => `Le scadenze della rottamazione-quinquies sono fissate dal comma 83 dell’articolo 1 della legge n. 199 del 2025 e valgono per tutti: la prima rata il ${h.date(h.P.quinquies.dates[0])}, la seconda il ${h.date(h.P.quinquies.dates[1])}, la terza il ${h.date(h.P.quinquies.dates[2])}; poi sei scadenze l’anno, il 31 gennaio, 31 marzo, 31 maggio, 31 luglio, 30 settembre e 30 novembre, dal 2027 al 2034; infine le ultime tre rate il 31 gennaio, il 31 marzo e il ${h.date(h.P.quinquies.dates[53])}. Chi ha scelto meno rate si ferma prima sullo stesso calendario. A ogni scadenza l’Agente della riscossione considera tempestivi i pagamenti fatti entro cinque giorni, con lo spostamento al primo giorno lavorativo per sabati, domeniche e festivi: per la rata del ${h.date(h.P.quinquies.dates[2])} il termine pratico è il ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[2]))}. La tolleranza protegge però solo l’unica rata e l’ultima; per le rate intermedie conta non lasciarne scoperte due. Le scadenze della quinquies dei debiti di comuni e regioni partono invece dal ${h.date(h.P.enti.dates[0])}, e quelle della quater e della riammissione cadono il 28 febbraio, 31 maggio, 31 luglio e 30 novembre fino al 2027.`,
    faqs: (h) => [
      { q: 'Se la scadenza cade di domenica, quando posso pagare?', a: `La scadenza si sposta al primo giorno lavorativo e da lì si contano i cinque giorni di tolleranza, con un nuovo spostamento se il quinto giorno è festivo. Per la rata del ${h.date('2027-01-31')}, una domenica, l’ultimo giorno utile diventa così il ${h.date(h.M.ultimoGiorno('2027-01-31'))}. L’elenco qui sopra fa il conto per ogni data, festivi nazionali compresi.` },
      { q: 'Il file .ics funziona su iPhone e Android?', a: 'Sì. Il file segue lo standard dei calendari e si apre con Calendario di iPhone, Google Calendar, Outlook e le altre app: ogni scadenza diventa un evento di un giorno con un promemoria tre giorni prima. Il file nasce nel tuo browser e non passa da nessun server, quindi non contiene dati personali.' },
      { q: 'Le date della quinquies cambiano se la legge viene modificata?', a: `Le date valgono finché un nuovo testo non le modifica: per la quinquies dei debiti di comuni e regioni è già successo, con la legge n. 113 del 2026 che ha spostato tutto in avanti. Le date di questa pagina sono rilette sui testi pubblicati, l’ultima volta il ${h.date(h.P.retrieved_at)}, e vengono corrette quando esce una modifica.` },
    ],
    body: (h) => `<h2>Le date dei prossimi mesi</h2>
<p>Nel calendario della ${h.src('l199', 'legge n. 199 del 2025')} i mesi si ripetono: gennaio, marzo, maggio, luglio, settembre e novembre, sempre all’ultimo giorno. Per i debiti di comuni e regioni l’${h.src('dl38', 'articolo 10-quinquies del decreto-legge n. 38 del 2026')} usa gli stessi mesi, ma la prima rata cade il ${h.date(h.P.enti.dates[0])} e l’ultima delle ${h.num(h.P.enti.max_rate)} il ${h.date(h.P.enti.dates[53])}. Quater e riammissione hanno quattro scadenze l’anno, l’ultima il ${h.date(h.P.quater.dates[17])}. L’elenco qui sopra mette insieme i quattro calendari; filtrando una sola definizione si ottiene il file da importare.</p>
<!--mini:tolleranza-->
<h2>Perché segnare l’ultimo giorno utile</h2>
<p>Le ${h.src('faqQuinquies', 'FAQ ufficiali')} ricordano che la tolleranza dei cinque giorni vale solo per l’unica rata e per l’ultima del piano. Per l’unica soluzione del ${h.date(h.P.quinquies.unica)} il termine era il ${h.date(h.P.quinquies.unica_ultimo_giorno_faq)}. Per l’ultima rata di un piano a ${h.num(54)} rate sarà il ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[53]))}. Per le rate intermedie un ritardo non fa decadere, purché non restino scoperte due rate. Il calendario pubblico delle ${h.src('aderScadenze', 'prossime scadenze')} dell’Agente della riscossione riporta le stesse date. Gli importi sono personali: li trovi nella Comunicazione o nella stima delle ${h.a('rottamazione-quinquies-rate', 'rate')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quinquies-due-dates',
    nav: 'Due dates',
    card: 'The next dates of every settlement, with the last useful day and a file for your calendar.',
    title: 'Rottamazione quinquies due dates: 2026 to 2035 calendar',
    description: 'Rottamazione quinquies due dates: every date of the 54 instalments up to 2035, the last useful day with the 5 days and holidays, and an .ics calendar file.',
    h1: 'Rottamazione-quinquies and other settlement due dates',
    intro: 'Pick the settlement and period: every due date with its instalment number, last useful day and days left, saved to your phone calendar in one click.',
    resume: (h) => `Rottamazione-quinquies due dates are fixed by paragraph 83 of article 1 of Italian Law 199 of 2025 and apply to everyone: the first instalment on ${h.date(h.P.quinquies.dates[0])}, the second on ${h.date(h.P.quinquies.dates[1])}, the third on ${h.date(h.P.quinquies.dates[2])}; then six due dates a year, on 31 January, 31 March, 31 May, 31 July, 30 September and 30 November, from 2027 to 2034; finally the last three instalments on 31 January, 31 March and ${h.date(h.P.quinquies.dates[53])}. Anyone who chose fewer instalments stops earlier on the same calendar. At each due date the collection agency treats payments made within five days as on time, moving to the next working day for Saturdays, Sundays and public holidays: for the instalment of ${h.date(h.P.quinquies.dates[2])} the practical deadline is ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[2]))}. The tolerance only protects the single payment and the last instalment, though; for the instalments in between, what matters is never leaving two unpaid. The quinquies for debts owed to comuni and regions starts on ${h.date(h.P.enti.dates[0])} instead, and the quater and readmission fall on 28 February, 31 May, 31 July and 30 November until 2027.`,
    faqs: (h) => [
      { q: 'If the due date falls on a Sunday, when can I pay?', a: `The due date moves to the next working day and the five-day tolerance is counted from there, moving again if the fifth day is a holiday. For the instalment of ${h.date('2027-01-31')}, a Sunday, the last useful day therefore becomes ${h.date(h.M.ultimoGiorno('2027-01-31'))}. The list above does the count for every date, national holidays included.` },
      { q: 'Does the .ics file work on iPhone and Android?', a: 'Yes. The file follows the calendar standard and opens in iPhone Calendar, Google Calendar, Outlook and other apps: each due date becomes a one-day event with a reminder three days before. The file is created in your browser and goes through no server, so it holds no personal data.' },
      { q: 'Do the quinquies dates change if the law is amended?', a: `The dates hold until a new text changes them: for the quinquies on debts owed to comuni and regions that has already happened, with Law 113 of 2026 moving everything forward. The dates on this page are reread against the published texts, most recently on ${h.date(h.P.retrieved_at)}, and corrected when an amendment comes out.` },
    ],
    body: (h) => `<h2>The dates of the coming months</h2>
<p>In the calendar of ${h.src('l199', 'Law 199 of 2025')} the months repeat: January, March, May, July, September and November, always on the last day. For debts owed to comuni and regions, ${h.src('dl38', 'article 10-quinquies of Decree-Law 38 of 2026')} uses the same months, but the first instalment falls on ${h.date(h.P.enti.dates[0])} and the last of the ${h.num(h.P.enti.max_rate)} on ${h.date(h.P.enti.dates[53])}. Quater and readmission have four due dates a year, the last on ${h.date(h.P.quater.dates[17])}. The list above combines the four calendars; filtering a single settlement gives you the file to import.</p>
<!--mini:tolleranza-->
<h2>Why note the last useful day</h2>
<p>The ${h.src('faqQuinquies', 'official FAQs')} point out that the five-day tolerance only applies to the single payment and the last instalment of the plan. For the single payment of ${h.date(h.P.quinquies.unica)} the deadline was ${h.date(h.P.quinquies.unica_ultimo_giorno_faq)}. For the last instalment of a ${h.num(54)}-instalment plan it will be ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[53]))}. For middle instalments lateness does not end the settlement, as long as two are never left unpaid. The collection agency’s public calendar of ${h.src('aderScadenze', 'upcoming due dates')} shows the same dates. Amounts are personal: they are in your statement or in the ${h.a('rottamazione-quinquies-rate', 'instalment')} estimate. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
