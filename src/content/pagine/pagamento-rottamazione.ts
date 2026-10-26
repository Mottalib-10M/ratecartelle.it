import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'pagamento-rottamazione',
  group: 'quinquies',
  order: 6,
  tool: 'pagamento',
  outil: { defaultRegime: 'quinquies' },
  related: ['rottamazione-quinquies-30-novembre', 'rottamazione-quinquies-scadenze', 'rottamazione-quinquies-decadenza', 'rottamazione-quater-decadenza', 'rottamazione-quinquies-rate'],
  sources: ['aderQuinquiesPagare', 'aderQuaterPagare', 'faqQuinquies', 'l199', 'l197'],
  it: {
    slug: 'pagamento-rottamazione',
    nav: 'Come e quando pagare',
    card: 'Ultimo giorno utile di ogni rata con tolleranza e festivi, canali di pagamento e pagamenti parziali.',
    title: 'Pagamento rottamazione: ultimo giorno utile e come pagare',
    description: 'Pagamento della rottamazione: ultimo giorno utile di ogni rata con i cinque giorni e i festivi, canali pagoPA, domiciliazione e cosa fare se paghi meno o tardi.',
    h1: 'Pagare una rata della rottamazione: entro quando e come',
    intro: 'Scegli la definizione e la scadenza della rata: il calcolo aggiunge i cinque giorni di tolleranza, salta sabati, domeniche e festivi e dice fino a quale giorno il pagamento conta come tempestivo.',
    resume: (h) => `Ogni rata di una definizione agevolata ha una data di scadenza fissata dalla legge e un ultimo giorno utile più lontano. Le leggi della quater e della quinquies non considerano tardivo un versamento con un ritardo fino a cinque giorni; se la scadenza o il quinto giorno cadono di sabato, di domenica o in un giorno festivo, il termine passa al primo giorno lavorativo successivo. Per la rata del ${h.date('2026-11-30')} si arriva così a lunedì ${h.date(h.M.ultimoGiorno('2026-11-30'))}; per l’unica soluzione della quinquies, scaduta il 31 luglio 2026, le FAQ ufficiali hanno indicato il ${h.date(h.P.quinquies.unica_ultimo_giorno_faq)}. Nella quinquies il margine conta davvero solo per l’unica soluzione e l’ultima rata, perché le rate intermedie fanno decadere solo quando restano scoperte in due; nella quater e nella riammissione vale per ogni rata. Si paga con i moduli allegati alla Comunicazione delle somme dovute, nei canali del circuito pagoPA, con il servizio di pagamento online dell’Agente della riscossione, con la domiciliazione bancaria attivabile nell’area riservata, o allo sportello su appuntamento. Conserva sempre la ricevuta con la data.`,
    faqs: (h) => [
      { q: 'Posso pagare la rata con un modulo pagoPA di un’altra rata?', a: 'No. Ogni modulo ha un codice che identifica una rata precisa e il suo importo, e usarne uno sbagliato crea un pagamento imputato a un’altra scadenza. Se hai perso i moduli puoi scaricarli di nuovo dall’area riservata o chiederne una copia online, ricevendoli per e-mail.' },
      { q: 'Posso pagare solo alcune cartelle della Comunicazione?', a: 'Sì, con il servizio ContiTu indicato nelle pagine ufficiali puoi scegliere quali carichi della Comunicazione pagare in forma agevolata e ottenere nuovi moduli per quella parte. Le cartelle che lasci fuori non beneficiano della definizione e tornano dovute per intero, con sanzioni e interessi.' },
      { q: 'La domiciliazione bancaria evita il rischio di pagare tardi?', a: 'Riduce il rischio di dimenticanze, perché l’addebito parte da solo alla scadenza. Va però attivata per tempo nell’area riservata e il conto deve avere la provvista: un addebito respinto equivale a una rata non pagata, con le conseguenze previste da ciascuna definizione. Controlla l’esito nell’estratto conto.' },
    ],
    body: (h) => `<h2>Canali di pagamento</h2>
${h.table(['Canale', 'Cosa serve', 'Prova del pagamento'], [
  ['Paga online dell’Agente della riscossione', 'Codice del modulo', 'Ricevuta elettronica'],
  ['Home banking e app nel circuito pagoPA o CBILL', 'Codice del modulo', 'Contabile della banca'],
  ['Uffici postali, banche, tabaccai e ricevitorie', 'Modulo cartaceo', 'Ricevuta di cassa'],
  ['Domiciliazione bancaria', 'Attivazione nell’area riservata', 'Addebito in conto'],
  ['Sportello, su appuntamento', 'Documento e modulo', 'Quietanza'],
], 'Come pagare le rate (pagine ufficiali di Agenzia delle entrate-Riscossione)', ['l', 'l', 'l'])}
<p>I canali sono descritti nelle pagine ufficiali su come pagare la ${h.src('aderQuinquiesPagare', 'quinquies')} e la ${h.src('aderQuaterPagare', 'quater')}. Il calcolo considera festivi le domeniche e le feste nazionali, compresi il Lunedì dell’Angelo, il 25 aprile, il 2 giugno e l’8 dicembre; non tiene conto delle feste patronali locali.</p>
<!--mini:tolleranza-->
<h2>Se hai pagato meno o in ritardo</h2>
<p>Nella quinquies le ${h.src('faqQuinquies', 'FAQ ufficiali')} spiegano che un pagamento successivo copre prima la rata più vecchia rimasta scoperta: chi completa una rata intermedia resta in regola finché non si accumulano due rate scoperte. Nella quater ogni differenza va colmata entro i cinque giorni, come spiega la pagina sulla ${h.a('rottamazione-quater-decadenza', 'decadenza dalla quater')}. Lo stato di ogni rata si verifica con ${h.a('rottamazione-quinquies-decadenza', 'Sono decaduto?')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-payment',
    nav: 'How and when to pay',
    card: 'Last useful day of each instalment with tolerance and holidays, payment channels and partial payments.',
    title: 'Rottamazione payment: last useful day and how to pay',
    description: 'Rottamazione payment: the last useful day of each instalment with the five days and holidays, pagoPA channels, direct debit, and what if you pay short or late.',
    h1: 'Paying a rottamazione instalment: by when and how',
    intro: 'Pick the settlement and the instalment due date: the calculation adds the five-day tolerance, skips Saturdays, Sundays and holidays, and gives the day up to which the payment counts as on time.',
    resume: (h) => `Every instalment of an Italian tax settlement has a due date set by law and a later last useful day. The quater and quinquies laws do not treat a payment up to five days late as late; if the due date or the fifth day falls on a Saturday, Sunday or public holiday, the deadline moves to the next working day. For the ${h.date('2026-11-30')} instalment that leads to Monday ${h.date(h.M.ultimoGiorno('2026-11-30'))}; for the quinquies single payment, due on 31 July 2026, the official FAQs gave ${h.date(h.P.quinquies.unica_ultimo_giorno_faq)}. In the quinquies the margin really matters only for the single payment and the last instalment, because middle instalments end the settlement only when two are left open; in the quater and the readmission it applies to every instalment. You pay with the forms attached to the statement of sums due, on the pagoPA channels, with the collection agency’s online payment service, by direct debit set up in the reserved area, or at a counter by appointment. Always keep the dated receipt.`,
    faqs: (h) => [
      { q: 'Can I pay an instalment with another instalment’s pagoPA form?', a: 'No. Each form carries a code identifying a specific instalment and its amount, and using the wrong one creates a payment credited to another due date. If you lost the forms you can download them again from the reserved area or request a copy online, received by e-mail.' },
      { q: 'Can I pay only some of the bills in the statement?', a: 'Yes, with the ContiTu service named on the official pages you can choose which debts in the statement to pay under the settlement and get new forms for that part. The bills you leave out do not benefit from the settlement and are due in full again, with penalties and interest.' },
      { q: 'Does direct debit remove the risk of paying late?', a: 'It reduces the risk of forgetting, because the debit starts by itself on the due date. It must be set up in time in the reserved area, though, and the account must hold the funds: a rejected debit counts as an unpaid instalment, with the consequences each settlement sets. Check the outcome on your bank statement.' },
    ],
    body: (h) => `<h2>Payment channels</h2>
${h.table(['Channel', 'What you need', 'Proof of payment'], [
  ['The collection agency’s online payment', 'Form code', 'Electronic receipt'],
  ['Home banking and apps on pagoPA or CBILL', 'Form code', 'Bank confirmation'],
  ['Post offices, banks, tobacconists, lottery outlets', 'Paper form', 'Till receipt'],
  ['Direct debit', 'Set-up in the reserved area', 'Account debit'],
  ['Counter, by appointment', 'ID and form', 'Receipt'],
], 'How to pay instalments (official pages of Agenzia delle entrate-Riscossione)', ['l', 'l', 'l'])}
<p>The channels are described on the official pages on paying the ${h.src('aderQuinquiesPagare', 'quinquies')} and the ${h.src('aderQuaterPagare', 'quater')}. The calculation treats Sundays and national holidays as non-working days, including Easter Monday, 25 April, 2 June and 8 December; it does not account for local patron saint days.</p>
<!--mini:tolleranza-->
<h2>If you paid short or late</h2>
<p>In the quinquies the ${h.src('faqQuinquies', 'official FAQs')} explain that a later payment first covers the oldest open instalment: anyone who completes a middle instalment stays up to date as long as two open instalments do not build up. In the quater every gap must be filled within the five days, as the ${h.a('rottamazione-quater-decadenza', 'quater lapse')} page explains. The state of each instalment can be checked with ${h.a('rottamazione-quinquies-decadenza', 'Have I lapsed?')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
