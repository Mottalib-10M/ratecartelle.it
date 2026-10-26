import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quinquies-30-novembre',
  group: 'quinquies',
  order: 4,
  tool: 'pagamento',
  outil: { defaultRegime: 'quinquies', defaultScadenza: '2026-11-30' },
  related: ['rottamazione-quinquies-scadenze', 'pagamento-rottamazione', 'rottamazione-quinquies-decadenza', 'rottamazione-quater', 'riammissione-rottamazione-quater'],
  sources: ['l199', 'faqQuinquies', 'aderScadenze', 'l197'],
  it: {
    slug: 'rottamazione-quinquies-30-novembre',
    nav: 'Rata del 30 novembre',
    card: 'Terza rata della quinquies e rata della quater: ultimo giorno utile e cosa rischia chi la salta.',
    title: 'Rottamazione quinquies 30 novembre 2026: ultimo giorno',
    description: 'Rottamazione quinquies, rata del 30 novembre 2026: ultimo giorno utile con la tolleranza, quando conta davvero, stessa data per quater e riammissione.',
    h1: 'Rata del 30 novembre 2026: fino a quando si paga',
    intro: 'Il 30 novembre 2026 scadono insieme la terza rata della quinquies e una rata della quater e della riammissione. Scegli la definizione e indica se è la tua ultima rata: il calcolo dice il giorno da non superare.',
    resume: (h) => `Il ${h.date('2026-11-30')} è una scadenza doppia. Per la rottamazione-quinquies è la terza rata del calendario fissato dal comma 83 della legge n. 199 del 2025, dopo quelle del ${h.date(h.P.quinquies.dates[0])} e del ${h.date(h.P.quinquies.dates[1])}. Per la rottamazione-quater e per la riammissione è una delle quattro scadenze annuali previste dalla legge n. 197 del 2022 e dal decreto-legge n. 202 del 2024. Il 30 novembre 2026 cade di lunedì: aggiungendo i cinque giorni di tolleranza si arriva a sabato 5 dicembre, e lo spostamento al primo giorno lavorativo porta l’ultimo giorno utile a lunedì ${h.date(h.M.ultimoGiorno('2026-11-30'))}. Per la quater e la riammissione quel giorno è decisivo: una rata pagata dopo, anche solo in parte, fa perdere il beneficio. Per la quinquies conta solo per chi ha scelto un piano di tre rate, perché è l’ultima; per tutti gli altri la rata di novembre è intermedia, e un ritardo non fa decadere finché non restano scoperte due rate.`,
    faqs: (h) => [
      { q: 'Ho scelto tre rate: il 30 novembre è la mia ultima rata?', a: `Sì. Con tre rate il piano usa le prime tre date del calendario, e la terza è quella del ${h.date('2026-11-30')}. Per l’ultima rata la legge conta anche il ritardo oltre cinque giorni, quindi va pagata per intero entro il ${h.date(h.M.ultimoGiorno('2026-11-30'))}. Se una delle due rate precedenti era rimasta scoperta, il pagamento di novembre la coprirebbe e lascerebbe scoperta l’ultima.` },
      { q: 'Pago la rata di novembre della quater il 9 dicembre: cosa succede?', a: `Per la quater il comma 244 della legge n. 197 del 2022 fa decadere chi paga una rata con un ritardo superiore a cinque giorni. Con l’ultimo giorno utile al ${h.date(h.M.ultimoGiorno('2026-11-30'))}, un versamento del 9 dicembre arriva tardi e il piano perde efficacia. I pagamenti già fatti restano come acconto sul debito originario.` },
      { q: 'Posso pagare la rata del 30 novembre dal tabaccaio?', a: 'Sì, con il modulo di pagamento della rata allegato alla Comunicazione: tabaccai e ricevitorie abilitati, banche, uffici postali, home banking nel circuito CBILL, sportelli bancomat abilitati, sito e app di Agenzia delle entrate-Riscossione. Conserva la ricevuta: è la prova del pagamento e della data.' },
    ],
    body: (h) => `<h2>Chi rischia di più il 30 novembre</h2>
<p>Le regole di decadenza cambiano da una definizione all’altra. Nella quinquies il ${h.src('l199', 'comma 95')} fa decadere chi lascia scoperte due rate, anche non consecutive, oppure l’ultima: chi ha già saltato la rata di settembre e salta anche quella di novembre perde il beneficio, chi le ha pagate entrambe non rischia nulla da un giorno di ritardo. Nella quater e nella riammissione il ${h.src('l197', 'comma 244 della legge n. 197 del 2022')} non lascia margini: ogni rata va pagata per intero entro i cinque giorni.</p>
${h.table(['Definizione', 'Che rata è', 'Ultimo giorno utile', 'Il ritardo fa decadere?'], [
  ['Quinquies, piano a 3 rate', 'Ultima', h.date(h.M.ultimoGiorno('2026-11-30')), 'Sì, oltre il termine'],
  ['Quinquies, piano più lungo', 'Terza, intermedia', '–', 'No, se pagata per intero'],
  ['Rottamazione-quater', `${h.num(14)}ª di 18`, h.date(h.M.ultimoGiorno('2026-11-30')), 'Sì'],
  ['Riammissione alla quater', `6ª di 10`, h.date(h.M.ultimoGiorno('2026-11-30')), 'Sì'],
], 'La scadenza del 30 novembre 2026 nelle diverse definizioni', ['l', 'l', 'l', 'l'])}
<!--mini:prossima-->
<h2>Dopo novembre</h2>
<p>La rata successiva della quinquies scade il ${h.date(h.P.quinquies.dates[3])}, una domenica: l’ultimo giorno utile passa al ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[3]))}. Per quater e riammissione la prossima data è il ${h.date('2027-02-28')}. Le ${h.src('faqQuinquies', 'FAQ ufficiali')} e il calendario delle ${h.src('aderScadenze', 'prossime scadenze')} riportano le stesse date. Tutte le date fino al 2035 sono nella pagina delle ${h.a('rottamazione-quinquies-scadenze', 'scadenze')}, con il file per il calendario; i canali di pagamento nella pagina sul ${h.a('pagamento-rottamazione', 'pagamento')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quinquies-30-november',
    nav: 'The 30 November instalment',
    card: 'Third quinquies instalment and a quater instalment: last useful day and what you risk by skipping it.',
    title: 'Rottamazione quinquies 30 November 2026: the last day',
    description: 'Rottamazione quinquies instalment of 30 November 2026: the last useful day with the tolerance, when it really matters, the same date for quater and readmission.',
    h1: 'The 30 November 2026 instalment: how long you have to pay',
    intro: 'On 30 November 2026 the third quinquies instalment and a quater and readmission instalment fall due together. Pick the settlement and say whether it is your last instalment: the calculation gives the day not to miss.',
    resume: (h) => `${h.date('2026-11-30')} is a double due date. For the rottamazione-quinquies it is the third instalment of the calendar set by paragraph 83 of Italian Law 199 of 2025, after those of ${h.date(h.P.quinquies.dates[0])} and ${h.date(h.P.quinquies.dates[1])}. For the rottamazione-quater and the readmission it is one of the four yearly due dates set by Law 197 of 2022 and Decree-Law 202 of 2024. 30 November 2026 is a Monday: adding the five-day tolerance leads to Saturday 5 December, and moving to the next working day brings the last useful day to Monday ${h.date(h.M.ultimoGiorno('2026-11-30'))}. For the quater and the readmission that day is decisive: an instalment paid later, even only partly, ends the benefit. For the quinquies it only matters to anyone who chose a three-instalment plan, because it is their last; for everyone else the November instalment is a middle one, and lateness does not end the settlement as long as two instalments are never left open.`,
    faqs: (h) => [
      { q: 'I chose three instalments: is 30 November my last one?', a: `Yes. With three instalments the plan uses the first three dates of the calendar, and the third is ${h.date('2026-11-30')}. For the last instalment the law also counts lateness beyond five days, so it must be paid in full by ${h.date(h.M.ultimoGiorno('2026-11-30'))}. If one of the two earlier instalments was left open, the November payment would cover it and leave the last one open instead.` },
      { q: 'I pay the November quater instalment on 9 December: what happens?', a: `For the quater, paragraph 244 of Law 197 of 2022 ends the settlement for anyone paying an instalment more than five days late. With the last useful day on ${h.date(h.M.ultimoGiorno('2026-11-30'))}, a payment on 9 December is too late and the plan loses effect. Payments already made stay as part-payment of the original debt.` },
      { q: 'Can I pay the 30 November instalment at a tobacconist?', a: 'Yes, with the instalment’s payment form attached to the statement: enabled tobacconists and lottery outlets, banks, post offices, home banking on the CBILL circuit, enabled cash machines, and the website and app of Agenzia delle entrate-Riscossione. Keep the receipt: it proves the payment and its date.' },
    ],
    body: (h) => `<h2>Who is most at risk on 30 November</h2>
<p>Lapse rules differ from one settlement to another. In the quinquies, ${h.src('l199', 'paragraph 95')} ends the settlement for anyone who leaves two instalments open, consecutive or not, or the last one: someone who already skipped September and also skips November loses the benefit, while someone who paid both risks nothing from a day’s delay. In the quater and the readmission, ${h.src('l197', 'paragraph 244 of Law 197 of 2022')} leaves no margin: every instalment must be paid in full within the five days.</p>
${h.table(['Settlement', 'Which instalment', 'Last useful day', 'Does lateness end it?'], [
  ['Quinquies, 3-instalment plan', 'Last', h.date(h.M.ultimoGiorno('2026-11-30')), 'Yes, after the deadline'],
  ['Quinquies, longer plan', 'Third, middle', '–', 'No, if paid in full'],
  ['Rottamazione-quater', '14th of 18', h.date(h.M.ultimoGiorno('2026-11-30')), 'Yes'],
  ['Readmission to the quater', '6th of 10', h.date(h.M.ultimoGiorno('2026-11-30')), 'Yes'],
], 'The 30 November 2026 due date across the settlements', ['l', 'l', 'l', 'l'])}
<!--mini:prossima-->
<h2>After November</h2>
<p>The next quinquies instalment is due on ${h.date(h.P.quinquies.dates[3])}, a Sunday: the last useful day moves to ${h.date(h.M.ultimoGiorno(h.P.quinquies.dates[3]))}. For the quater and readmission the next date is ${h.date('2027-02-28')}. The ${h.src('faqQuinquies', 'official FAQs')} and the calendar of ${h.src('aderScadenze', 'upcoming due dates')} show the same dates. Every date up to 2035 is on the ${h.a('rottamazione-quinquies-scadenze', 'due dates')} page, with the calendar file; payment channels are on the ${h.a('pagamento-rottamazione', 'payment')} page. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
