import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quinquies-rate',
  group: 'quinquies',
  order: 1,
  tool: 'piano',
  outil: { regimi: ['quinquies'], defaultRegime: 'quinquies', defaultImporto: 6000, defaultRate: 36 },
  related: ['rottamazione-quinquies-scadenze', 'rottamazione-quinquies-calcolo', 'rottamazione-quinquies-decadenza', 'pagamento-rottamazione', 'rottamazione-cartelle'],
  sources: ['l199', 'faqQuinquies', 'aderQuinquiesComunicazione', 'aderQuinquiesPagare'],
  it: {
    slug: 'rottamazione-quinquies-rate',
    nav: 'Importo delle rate',
    card: 'Quanto vale ogni rata con il tuo importo e il tuo numero di rate, interessi del 3% compresi.',
    title: 'Rate rottamazione quinquies: importo di ogni rata (2026)',
    description: 'Rate della rottamazione quinquies: importo stimato di ogni rata con gli interessi del 3%, rata minima di 100 €, rate ridotte d’ufficio e piano da stampare.',
    h1: 'Rate della rottamazione-quinquies: quanto pago a ogni scadenza',
    intro: 'Scrivi le somme dovute indicate nella Comunicazione e il numero di rate scelto nella domanda: la tabella mostra l’importo stimato di ciascuna rata, la quota di interessi e il debito che resta.',
    resume: (h) => {
      const p = h.M.piano('quinquies', 6000, 36);
      return `Le rate della rottamazione-quinquies sono bimestrali e di pari importo, al massimo ${h.num(h.P.quinquies.max_rate)}, come stabilisce il comma 83 dell’articolo 1 della legge n. 199 del 2025. Su ogni rata dopo la prima pesano gli interessi del ${h.pct(h.P.quinquies.interesse, 0)} annuo, che decorrono dal ${h.date(h.P.quinquies.interessi_dal)} (comma 84), e nessuna rata può essere inferiore a ${h.eur(h.P.quinquies.rata_minima)} (comma 92). L’importo ufficiale è quello stampato sui moduli della Comunicazione delle somme dovute, inviata entro il ${h.date(h.P.quinquies.comunicazione_entro)}. Il calcolo di questa pagina lo ricostruisce con rate costanti e interessi sul debito residuo: ${h.eur(6000)} in ${h.num(36)} rate danno circa ${h.eur(p.rate[0].importo, 2)} a scadenza, per ${h.eur(p.interessi, 2)} di interessi complessivi, e l’ultima rata scade il ${h.date(p.ultima)}. Quando la divisione porta una rata sotto i ${h.eur(h.P.quinquies.rata_minima)}, le FAQ ufficiali spiegano che il numero di rate viene ridotto d’ufficio nella misura strettamente necessaria, e la tabella fa lo stesso.`;
    },
    faqs: (h) => [
      { q: 'Le rate della quinquies hanno tutte lo stesso importo?', a: `Sì, la legge parla di rate bimestrali di pari ammontare. Gli interessi del ${h.pct(h.P.quinquies.interesse, 0)} sono distribuiti dentro le rate, che quindi restano uguali: all’inizio una rata contiene più interessi e meno capitale, verso la fine il contrario. Piccole differenze di centesimi sull’ultima rata servono a chiudere gli arrotondamenti.` },
      { q: 'Con un debito di 2.000 euro quante rate posso avere al massimo?', a: `Dipende dalla rata minima di ${h.eur(h.P.quinquies.rata_minima)}. Con ${h.eur(2000)} e interessi del ${h.pct(h.P.quinquies.interesse, 0)}, il numero massimo che rispetta la soglia è di ${h.num(h.M.piano('quinquies', 2000, 54).nEffettive)} rate secondo la stima del calcolatore. Se nella domanda ne avevi chieste di più, la Comunicazione le ha ridotte d’ufficio: controlla il numero riportato sui moduli.` },
      { q: 'La prima rata del 31 luglio 2026 conteneva interessi?', a: `No. Gli interessi decorrono dal ${h.date(h.P.quinquies.interessi_dal)}, il giorno dopo la prima scadenza, quindi la prima rata è tutta capitale e spese. Dalla seconda rata, il ${h.date(h.P.quinquies.dates[1])}, ogni importo comprende una quota di interessi calcolata sul debito che resta dopo i pagamenti precedenti.` },
    ],
    body: (h) => {
      const a = h.M.piano('quinquies', 6000, 6), b = h.M.piano('quinquies', 6000, 18), c = h.M.piano('quinquies', 6000, 36), d = h.M.piano('quinquies', 6000, 54);
      return `<h2>Più rate, rata più bassa, più interessi</h2>
<p>Allungare il piano abbassa la rata ma fa crescere gli interessi, perché il debito resta aperto più a lungo. Sullo stesso importo di ${h.eur(6000)}, la stima cambia così:</p>
${h.table(['Rate', 'Rata stimata', 'Interessi totali', 'Ultima scadenza'], [a, b, c, d].map((p) => [String(p.nEffettive), h.eur(p.rate[0].importo, 2), h.eur(p.interessi, 2), h.date(p.ultima)]), `Piani diversi su ${h.eur(6000)} con gli interessi del ${h.pct(h.P.quinquies.interesse, 0)} (stima)`, ['r', 'r', 'r', 'l'])}
<p>Il numero di rate si sceglieva nella domanda, chiusa il ${h.date(h.P.quinquies.domanda_entro)}, e non si cambia dopo. Chi vuole ridurre il peso degli interessi può solo pagare alcune rate prima, oppure tenere nel piano meno cartelle con il servizio ContiTu descritto nelle ${h.src('faqQuinquies', 'FAQ')}, che ricalcola le rate sulle cartelle rimaste.</p>
<!--mini:interessi-->
<h2>Dove si legge l’importo ufficiale</h2>
<p>La ${h.src('aderQuinquiesComunicazione', 'Comunicazione delle somme dovute')} riporta il totale, l’importo e la scadenza di ogni rata, con i moduli di pagamento. Chi ha presentato la domanda nell’area riservata la trova solo lì; chi l’ha presentata dall’area pubblica l’ha ricevuta anche via PEC o per posta. Se l’importo dei moduli è diverso dalla stima di questa pagina, vale quello dei moduli: la legge fissa il tasso e la decorrenza, non il modo di contare i giorni. Le date, invece, sono uguali per tutti e le trovi nella pagina delle ${h.a('rottamazione-quinquies-scadenze', 'scadenze')}; la regola sulle rate saltate è nella ${h.a('rottamazione-quinquies-decadenza', 'verifica della decadenza')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
  en: {
    slug: 'rottamazione-quinquies-instalments',
    nav: 'Instalment amounts',
    card: 'What each instalment comes to for your sum and your number of instalments, 3% interest included.',
    title: 'Rottamazione quinquies instalments: amount of each one',
    description: 'Rottamazione quinquies instalments: estimated amount of each with 3% interest, the €100 minimum, instalments cut automatically and a printable plan, in English.',
    h1: 'Rottamazione-quinquies instalments: what I pay at each due date',
    intro: 'Enter the sum due shown in your statement and the number of instalments chosen in the application: the table shows the estimated amount of each instalment, the interest part and the balance left.',
    resume: (h) => {
      const p = h.M.piano('quinquies', 6000, 36);
      return `Rottamazione-quinquies instalments fall every two months and are equal, up to ${h.num(h.P.quinquies.max_rate)} of them, as paragraph 83 of article 1 of Italian Law 199 of 2025 provides. Every instalment after the first carries interest at ${h.pct(h.P.quinquies.interesse, 0)} a year, running from ${h.date(h.P.quinquies.interessi_dal)} (paragraph 84), and no instalment may be below ${h.eur(h.P.quinquies.rata_minima)} (paragraph 92). The official amount is the one printed on the forms of the statement of sums due, sent by ${h.date(h.P.quinquies.comunicazione_entro)}. The calculation on this page rebuilds it with equal instalments and interest on the outstanding balance: ${h.eur(6000)} over ${h.num(36)} instalments comes to about ${h.eur(p.rate[0].importo, 2)} per due date, ${h.eur(p.interessi, 2)} of interest in total, with the last instalment due on ${h.date(p.ultima)}. When the division would push an instalment below ${h.eur(h.P.quinquies.rata_minima)}, the official FAQs explain that the number of instalments is cut automatically as far as strictly needed, and the table does the same.`;
    },
    faqs: (h) => [
      { q: 'Are all quinquies instalments the same amount?', a: `Yes, the law speaks of equal two-monthly instalments. The ${h.pct(h.P.quinquies.interesse, 0)} interest is spread inside the instalments, which therefore stay equal: early on an instalment holds more interest and less principal, towards the end the reverse. Differences of a few cents on the last instalment simply clear the rounding.` },
      { q: 'With a debt of 2,000 euros, how many instalments can I have at most?', a: `It depends on the ${h.eur(h.P.quinquies.rata_minima)} minimum instalment. With ${h.eur(2000)} and ${h.pct(h.P.quinquies.interesse, 0)} interest, the highest number that respects the threshold is ${h.num(h.M.piano('quinquies', 2000, 54).nEffettive)} instalments on the calculator’s estimate. If you asked for more in the application, the statement cut them automatically: check the number on the forms.` },
      { q: 'Did the first instalment of 31 July 2026 include interest?', a: `No. Interest runs from ${h.date(h.P.quinquies.interessi_dal)}, the day after the first due date, so the first instalment is all principal and costs. From the second instalment, on ${h.date(h.P.quinquies.dates[1])}, each amount includes some interest worked out on the balance left after earlier payments.` },
    ],
    body: (h) => {
      const a = h.M.piano('quinquies', 6000, 6), b = h.M.piano('quinquies', 6000, 18), c = h.M.piano('quinquies', 6000, 36), d = h.M.piano('quinquies', 6000, 54);
      return `<h2>More instalments, lower instalment, more interest</h2>
<p>A longer plan lowers the instalment but raises the interest, because the debt stays open longer. On the same ${h.eur(6000)}, the estimate changes like this:</p>
${h.table(['Instalments', 'Estimated instalment', 'Total interest', 'Last due date'], [a, b, c, d].map((p) => [String(p.nEffettive), h.eur(p.rate[0].importo, 2), h.eur(p.interessi, 2), h.date(p.ultima)]), `Different plans on ${h.eur(6000)} with ${h.pct(h.P.quinquies.interesse, 0)} interest (estimate)`, ['r', 'r', 'r', 'l'])}
<p>The number of instalments was chosen in the application, which closed on ${h.date(h.P.quinquies.domanda_entro)}, and cannot be changed afterwards. To cut the interest you can only pay some instalments early, or keep fewer bills in the plan through the ContiTu service described in the ${h.src('faqQuinquies', 'FAQs')}, which recalculates the instalments on the bills that remain.</p>
<!--mini:interessi-->
<h2>Where the official amount is shown</h2>
<p>The ${h.src('aderQuinquiesComunicazione', 'statement of sums due')} shows the total, plus the amount and due date of each instalment, with the payment forms. If you applied in the reserved area you find it only there; if you applied through the public area it was also sent by PEC or post. If the amount on the forms differs from the estimate on this page, the forms prevail: the law sets the rate and start date, not the way days are counted. The dates, however, are the same for everyone and are on the ${h.a('rottamazione-quinquies-scadenze', 'due dates')} page; the rule on missed instalments is in the ${h.a('rottamazione-quinquies-decadenza', 'lapse check')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
});
