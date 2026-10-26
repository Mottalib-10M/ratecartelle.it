import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quater-decadenza',
  group: 'quater',
  order: 2,
  tool: 'decadenza',
  outil: { regimi: ['quater', 'riammissione'], defaultRegime: 'quater', defaultRate: 18 },
  related: ['rottamazione-quater', 'riammissione-rottamazione-quater', 'rottamazione-quinquies-decadenza', 'rateizzazione-cartelle', 'pagamento-rottamazione'],
  sources: ['l197', 'l197gu', 'faqQuater', 'aderQuaterDopo', 'l199'],
  it: {
    slug: 'rottamazione-quater-decadenza',
    nav: 'Decadenza dalla quater',
    card: 'Una rata saltata o pagata tardi basta a perdere la quater: verifica il tuo piano rata per rata.',
    title: 'Rottamazione quater decadenza: basta una sola rata saltata',
    description: 'Rottamazione quater, decadenza: una sola rata non pagata, pagata in parte o oltre i cinque giorni fa perdere il beneficio. Verifica il piano e cosa succede.',
    h1: 'Decadenza dalla rottamazione-quater: verifica rata per rata',
    intro: 'Segna per ogni rata della quater o della riammissione se l’hai pagata in tempo, in ritardo o in parte: la verifica dice se il piano è ancora valido e da quale rata si è interrotto.',
    resume: (h) => `Nella rottamazione-quater la regola di decadenza è la più severa fra le definizioni agevolate. Il comma 244 dell’articolo 1 della legge n. 197 del 2022 stabilisce che, in caso di mancato, insufficiente o tardivo versamento dell’unica rata o di una delle rate, la definizione non produce effetti e riprendono a decorrere i termini di prescrizione e decadenza per il recupero dei carichi. Il ritardo non superiore a cinque giorni non conta, ma oltre quel margine anche un solo euro mancante o un solo giorno in più chiudono il piano. La stessa regola vale per la riammissione prevista dal decreto-legge n. 202 del 2024, che rinvia alle norme della quater. Chi decade non perde quanto ha pagato: i versamenti restano acquisiti come acconto sull’importo complessivo dovuto, comprese sanzioni e interessi, e l’Agente della riscossione può riprendere le procedure di recupero. Il testo del comma 244 non vieta di chiedere poi la dilazione ordinaria dell’articolo 19 del DPR n. 602 del 1973 per il debito residuo. La verifica qui sopra applica la regola rata per rata, secondo il calendario della tua definizione.`,
    faqs: (h) => [
      { q: 'Ho pagato la rata della quater due euro in meno: sono decaduto?', a: 'Secondo il testo del comma 244 sì, perché il versamento insufficiente è trattato come quello mancato. La differenza va colmata entro i cinque giorni di tolleranza: se il saldo arriva dopo, il piano perde efficacia. Per questo conviene pagare con il modulo precompilato della rata, che riporta l’importo esatto.' },
      { q: 'Dopo la decadenza dalla quater posso chiedere una rateizzazione?', a: 'Il comma 244 non contiene un divieto di dilazione, quindi per il debito residuo si può presentare una richiesta ordinaria ai sensi dell’articolo 19 del DPR n. 602 del 1973, sull’importo pieno con sanzioni e interessi. Chi era decaduto entro il 30 settembre 2025 ha potuto anche inserire quei carichi nella quinquies, che costava molto meno.' },
      { q: 'Il piano decaduto della quater si può riattivare pagando le rate arretrate?', a: 'No, la legge non prevede il recupero delle rate saltate dopo la decadenza. L’unica strada è stata una nuova norma: prima la riammissione del 2025 per i decaduti al 31 dicembre 2024, poi la quinquies per i carichi persi entro il 30 settembre 2025. Senza una nuova legge non esiste una riapertura.' },
    ],
    body: (h) => `<h2>Quater e quinquies a confronto</h2>
${h.table(['Situazione', 'Quater e riammissione', 'Quinquies'], [
  ['Una rata intermedia non pagata', 'Decaduto', 'Non decaduto'],
  ['Due rate non pagate', 'Decaduto', 'Decaduto'],
  ['Rata pagata con 3 giorni di ritardo', 'In regola', 'In regola'],
  ['Rata pagata con 10 giorni di ritardo', 'Decaduto', 'Non decaduto, se pagata per intero'],
  ['Ultima rata pagata tardi', 'Decaduto', 'Decaduto'],
], 'Effetti dei mancati pagamenti (comma 244 L. 197/2022; comma 95 L. 199/2025)', ['l', 'l', 'l'])}
<p>La differenza nasce dal ${h.src('l199', 'comma 95 della legge n. 199 del 2025')}, che per la quinquies ha scelto di contare le rate scoperte invece di punire ogni ritardo. Chi ha piani in entrambe le definizioni deve quindi tenere due regole diverse sullo stesso calendario: la verifica della quinquies è nella pagina ${h.a('rottamazione-quinquies-decadenza', 'Sono decaduto?')}.</p>
<h2>Cosa succede dopo</h2>
<p>Le ${h.src('aderQuaterDopo', 'pagine ufficiali sulla quater')} ricordano che, dopo la decadenza, l’Agente della riscossione riprende l’attività di recupero sull’intero debito, al netto dei pagamenti fatti. Se ti accorgi di un pagamento parziale entro i cinque giorni, completa subito il versamento e conserva entrambe le ricevute. Per i pagamenti nei giorni festivi vale lo spostamento al primo giorno lavorativo, calcolato nella pagina sul ${h.a('pagamento-rottamazione', 'pagamento delle rate')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quater-lapse',
    nav: 'Quater lapse',
    card: 'One instalment skipped or paid late is enough to lose the quater: check your plan instalment by instalment.',
    title: 'Rottamazione quater lapse: one missed instalment is enough',
    description: 'Rottamazione quater lapse: one instalment unpaid, paid short or beyond the five days ends the benefit. Check your plan, see what happens next and what remains.',
    h1: 'Lapse from the rottamazione-quater: check each instalment',
    intro: 'Mark each quater or readmission instalment as paid on time, late or in part: the check says whether the plan still holds and at which instalment it broke.',
    resume: (h) => `In the rottamazione-quater the lapse rule is the strictest of the Italian tax settlements. Paragraph 244 of article 1 of Law 197 of 2022 states that if the single payment or any instalment is missed, short or late, the settlement has no effect and the time limits for collecting the debts start running again. A delay of up to five days does not count, but beyond that margin a single missing euro or a single extra day ends the plan. The same rule applies to the readmission under Decree-Law 202 of 2024, which refers back to the quater rules. Anyone who lapses keeps what they paid: the payments stay as part-payment of the full amount due, including penalties and interest, and the collection agency can restart recovery. The wording of paragraph 244 does not bar a later request for the ordinary instalment plan of article 19 of Presidential Decree 602 of 1973 for the remaining debt. The check above applies the rule instalment by instalment, following the calendar of your settlement.`,
    faqs: (h) => [
      { q: 'I paid the quater instalment two euros short: have I lapsed?', a: 'According to the wording of paragraph 244, yes, because a short payment is treated like a missed one. The gap must be filled within the five-day tolerance: if the balance arrives later, the plan loses effect. That is why it is best to pay with the instalment’s pre-filled form, which carries the exact amount.' },
      { q: 'After lapsing from the quater, can I ask for an instalment plan?', a: 'Paragraph 244 contains no instalment ban, so for the remaining debt an ordinary request under article 19 of Presidential Decree 602 of 1973 can be filed, on the full amount with penalties and interest. Anyone who lapsed by 30 September 2025 could also put those debts into the quinquies, which cost far less.' },
      { q: 'Can a lapsed quater plan be revived by paying the missed instalments?', a: 'No, the law does not allow skipped instalments to be made up after the lapse. The only way back has been a new law: first the 2025 readmission for those who had lapsed by 31 December 2024, then the quinquies for debts lost by 30 September 2025. Without a new law there is no reopening.' },
    ],
    body: (h) => `<h2>Quater and quinquies compared</h2>
${h.table(['Situation', 'Quater and readmission', 'Quinquies'], [
  ['One middle instalment unpaid', 'Lapsed', 'Not lapsed'],
  ['Two instalments unpaid', 'Lapsed', 'Lapsed'],
  ['Instalment 3 days late', 'Up to date', 'Up to date'],
  ['Instalment 10 days late', 'Lapsed', 'Not lapsed, if paid in full'],
  ['Last instalment late', 'Lapsed', 'Lapsed'],
], 'Effects of missed payments (paragraph 244, Law 197/2022; paragraph 95, Law 199/2025)', ['l', 'l', 'l'])}
<p>The difference comes from ${h.src('l199', 'paragraph 95 of Law 199 of 2025')}, which for the quinquies chose to count open instalments instead of penalising every delay. Anyone with plans in both settlements therefore has two rules on the same calendar: the quinquies check is on the ${h.a('rottamazione-quinquies-decadenza', 'Have I lapsed?')} page.</p>
<h2>What happens next</h2>
<p>The ${h.src('aderQuaterDopo', 'official quater pages')} note that after a lapse the collection agency resumes recovery of the whole debt, minus the payments made. If you notice a short payment within the five days, complete it straight away and keep both receipts. For payments falling on holidays the shift to the next working day applies, worked out on the ${h.a('pagamento-rottamazione', 'instalment payment')} page. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
