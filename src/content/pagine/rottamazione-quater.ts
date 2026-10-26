import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quater',
  group: 'quater',
  order: 1,
  tool: 'piano',
  outil: { regimi: ['quater'], defaultRegime: 'quater', defaultImporto: 10000, defaultRate: 18 },
  related: ['rottamazione-quater-decadenza', 'riammissione-rottamazione-quater', 'rottamazione-quinquies-30-novembre', 'saldo-e-stralcio', 'definizione-agevolata'],
  sources: ['l197', 'l197gu', 'l87', 'l18', 'gu182', 'aderQuater', 'aderQuaterPagare', 'faqQuater'],
  it: {
    slug: 'rottamazione-quater',
    nav: 'Rottamazione-quater',
    card: 'Il piano di 18 rate fino al 30 novembre 2027: date, importi stimati con il 2% e rate che restano.',
    title: 'Rottamazione quater: rate rimaste fino al 30 novembre 2027',
    description: 'Rottamazione quater: piano di 18 rate fino al 30 novembre 2027, prime due al 10%, interessi del 2% dal novembre 2023, ultimo giorno utile e stima delle rate.',
    h1: 'Rottamazione-quater: il piano delle 18 rate fino al 2027',
    intro: 'Inserisci le somme dovute della tua Comunicazione: il piano mostra le 18 rate della quater con data, ultimo giorno utile e importo stimato, e quelle che restano da pagare da oggi.',
    resume: (h) => {
      const p = h.M.piano('quater', 10000, 18);
      return `La rottamazione-quater è la definizione agevolata dei commi da 231 a 252 dell’articolo 1 della legge n. 197 del 2022, per i carichi affidati all’Agente della riscossione dal ${h.date(h.P.quater.carichi_dal)} al ${h.date(h.P.quater.carichi_al)}. Con le date fissate dal decreto-legge n. 51 del 2023, convertito dalla legge n. 87 del 2023, si pagava in unica soluzione entro il ${h.date(h.P.quater.unica)} o in un massimo di ${h.num(h.P.quater.max_rate)} rate: la prima e la seconda pari al 10% delle somme dovute, il ${h.date(h.P.quater.dates[0])} e il ${h.date(h.P.quater.dates[1])}, le altre sedici di pari importo il 28 febbraio, 31 maggio, 31 luglio e 30 novembre di ogni anno dal 2024 al 2027. Sulle rate corrono interessi del ${h.pct(h.P.quater.interesse, 0)} annuo dal ${h.date(h.P.quater.interessi_dal)}. Su ${h.eur(10000)} la stima dà ${h.eur(p.rate[0].importo)} per ciascuna delle prime due rate e circa ${h.eur(p.rate[2].importo, 2)} per le successive. Chi è ancora in regola paga fino al ${h.date(h.P.quater.dates[17])}: una sola rata non pagata, insufficiente o versata oltre i cinque giorni di tolleranza fa decadere. I carichi della quater persi entro il 30 settembre 2025 potevano entrare nella quinquies.`;
    },
    faqs: (h) => [
      { q: 'Quante rate della quater restano da pagare nel 2027?', a: `Nel 2027 cadono le ultime quattro rate del piano: il ${h.date(h.P.quater.dates[14])}, il ${h.date(h.P.quater.dates[15])}, il ${h.date(h.P.quater.dates[16])} e il ${h.date(h.P.quater.dates[17])}. Prima, il ${h.date(h.P.quater.dates[13])}, scade la quattordicesima. Ogni rata ha il suo ultimo giorno utile con i cinque giorni di tolleranza: la tabella qui sopra li calcola uno per uno.` },
      { q: 'Perché le prime due rate della quater erano più alte?', a: `La legge chiedeva il 10% delle somme dovute per ciascuna delle prime due rate, quindi il 20% entro novembre 2023, e divideva il restante 80% in sedici rate uguali. Su ${h.eur(10000)} significa ${h.eur(1000)} a ottobre e ${h.eur(1000)} a novembre 2023, poi rate più basse che comprendono gli interessi del ${h.pct(h.P.quater.interesse, 0)}.` },
      { q: 'La quater e la quinquies possono convivere per la stessa persona?', a: 'Sì, per carichi diversi. Chi era in regola con la quater al 30 settembre 2025 continua quel piano per i carichi che vi sono compresi, e può aver aderito alla quinquies per altri carichi, per esempio quelli affidati tra luglio 2022 e dicembre 2023. In quel caso le scadenze dei due piani si sommano, e il 30 novembre cadono nello stesso giorno.' },
    ],
    body: (h) => `<h2>Le date e le proroghe</h2>
<p>Il calendario originale del ${h.src('l197', 'comma 232')} è stato spostato dal ${h.src('l87', 'decreto-legge n. 51 del 2023')}. Nel 2024 due interventi hanno dato più tempo: il ${h.src('l18', 'decreto Milleproroghe convertito dalla legge n. 18 del 2024')} ha permesso di pagare le prime tre rate entro il 15 marzo 2024, e il ${h.src('gu182', 'decreto legislativo n. 108 del 2024')} ha spostato la quinta rata dal 31 luglio al 15 settembre 2024, con pagamenti tempestivi fino al ${h.date(h.M.ultimoGiorno('2024-09-15'))}. Per le zone colpite dall’alluvione del maggio 2023 il decreto-legge n. 61 del 2023 ha previsto uno spostamento di tre mesi. Dal 2025 le scadenze sono tornate quelle ordinarie, che la tabella mostra.</p>
<!--mini:quater-->
<h2>Cosa resta della quater nel 2026</h2>
<p>Chi è rimasto in regola paga le rate del 2026 e del 2027 con gli importi della Comunicazione del 2023. Chi era decaduto ha avuto due possibilità: la ${h.a('riammissione-rottamazione-quater', 'riammissione')} con domanda entro il ${h.date(h.P.riammissione.domanda_entro)}, per i decaduti al 31 dicembre 2024, e la quinquies per i carichi persi entro il ${h.date(h.P.quinquies.quater_in_regola_al)}. I canali di pagamento sono descritti nelle ${h.src('aderQuaterPagare', 'pagine ufficiali')}; la regola sulla rata singola è spiegata nella pagina sulla ${h.a('rottamazione-quater-decadenza', 'decadenza dalla quater')}. Con la stessa legge del 2022 è arrivato anche lo ${h.a('saldo-e-stralcio', 'stralcio dei debiti fino a 1.000 euro')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quater',
    nav: 'Rottamazione-quater',
    card: 'The 18-instalment plan running to 30 November 2027: dates, estimated amounts with 2% interest and instalments left.',
    title: 'Rottamazione quater: instalments left until November 2027',
    description: 'Rottamazione quater: the 18-instalment plan to 30 November 2027, first two at 10%, 2% interest from November 2023, every last useful day and estimated amounts.',
    h1: 'Rottamazione-quater: the 18-instalment plan to 2027',
    intro: 'Enter the sum due shown in your statement: the plan shows the 18 quater instalments with date, last useful day and estimated amount, and those still to pay from today.',
    resume: (h) => {
      const p = h.M.piano('quater', 10000, 18);
      return `The rottamazione-quater is the settlement in paragraphs 231 to 252 of article 1 of Italian Law 197 of 2022, for debts passed to the collection agency between ${h.date(h.P.quater.carichi_dal)} and ${h.date(h.P.quater.carichi_al)}. With the dates set by Decree-Law 51 of 2023, converted by Law 87 of 2023, you paid a single sum by ${h.date(h.P.quater.unica)} or up to ${h.num(h.P.quater.max_rate)} instalments: the first and second equal to 10% of the sum due, on ${h.date(h.P.quater.dates[0])} and ${h.date(h.P.quater.dates[1])}, the other sixteen equal, on 28 February, 31 May, 31 July and 30 November of each year from 2024 to 2027. Interest runs at ${h.pct(h.P.quater.interesse, 0)} a year from ${h.date(h.P.quater.interessi_dal)}. On ${h.eur(10000)} the estimate gives ${h.eur(p.rate[0].importo)} for each of the first two instalments and about ${h.eur(p.rate[2].importo, 2)} for the rest. Anyone still up to date pays until ${h.date(h.P.quater.dates[17])}: a single instalment unpaid, short or paid after the five-day tolerance ends the settlement. Quater debts lost by 30 September 2025 could move into the quinquies.`;
    },
    faqs: (h) => [
      { q: 'How many quater instalments are left to pay in 2027?', a: `2027 holds the last four instalments of the plan: ${h.date(h.P.quater.dates[14])}, ${h.date(h.P.quater.dates[15])}, ${h.date(h.P.quater.dates[16])} and ${h.date(h.P.quater.dates[17])}. Before that, on ${h.date(h.P.quater.dates[13])}, the fourteenth is due. Each instalment has its own last useful day with the five-day tolerance: the table above works them out one by one.` },
      { q: 'Why were the first two quater instalments higher?', a: `The law required 10% of the sum due for each of the first two instalments, so 20% by November 2023, and split the remaining 80% into sixteen equal instalments. On ${h.eur(10000)} that means ${h.eur(1000)} in October and ${h.eur(1000)} in November 2023, then lower instalments that include the ${h.pct(h.P.quater.interesse, 0)} interest.` },
      { q: 'Can the quater and the quinquies run side by side for one person?', a: 'Yes, for different debts. Anyone up to date with the quater on 30 September 2025 carries on with that plan for the debts in it, and may have joined the quinquies for other debts, for example those passed on between July 2022 and December 2023. The two plans’ due dates then add up, and on 30 November they fall on the same day.' },
    ],
    body: (h) => `<h2>Dates and extensions</h2>
<p>The original calendar of ${h.src('l197', 'paragraph 232')} was moved by ${h.src('l87', 'Decree-Law 51 of 2023')}. In 2024 two measures gave extra time: the ${h.src('l18', 'Milleproroghe decree converted by Law 18 of 2024')} allowed the first three instalments to be paid by 15 March 2024, and ${h.src('gu182', 'Legislative Decree 108 of 2024')} moved the fifth instalment from 31 July to 15 September 2024, with payments on time up to ${h.date(h.M.ultimoGiorno('2024-09-15'))}. For areas hit by the May 2023 floods, Decree-Law 61 of 2023 allowed a three-month shift. From 2025 the due dates are back to the ordinary ones shown in the table.</p>
<!--mini:quater-->
<h2>What is left of the quater in 2026</h2>
<p>Those still up to date pay the 2026 and 2027 instalments with the amounts in the 2023 statement. Those who had lapsed had two options: the ${h.a('riammissione-rottamazione-quater', 'readmission')}, applying by ${h.date(h.P.riammissione.domanda_entro)}, for people who had lapsed by 31 December 2024, and the quinquies for debts lost by ${h.date(h.P.quinquies.quater_in_regola_al)}. Payment channels are described on the ${h.src('aderQuaterPagare', 'official pages')}; the single-instalment rule is explained on the ${h.a('rottamazione-quater-decadenza', 'quater lapse')} page. The same 2022 law also brought the ${h.a('saldo-e-stralcio', 'write-off of debts up to 1,000 euros')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
