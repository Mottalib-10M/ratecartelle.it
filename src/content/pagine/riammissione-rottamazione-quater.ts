import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'riammissione-rottamazione-quater',
  group: 'quater',
  order: 3,
  tool: 'piano',
  outil: { regimi: ['riammissione'], defaultRegime: 'riammissione', defaultImporto: 8000, defaultRate: 10 },
  related: ['rottamazione-quater', 'rottamazione-quater-decadenza', 'rottamazione-quinquies-rate', 'rottamazione-quinquies-30-novembre', 'rottamazione-sexies'],
  sources: ['dl202', 'aderRiammissione', 'l197'],
  it: {
    slug: 'riammissione-rottamazione-quater',
    nav: 'Riammissione alla quater',
    card: 'Le 10 rate della riammissione fino al 30 novembre 2027: importi stimati e rate che restano da pagare.',
    title: 'Riammissione rottamazione quater: le 10 rate fino al 2027',
    description: 'Riammissione alla rottamazione quater: dieci rate uguali fino al 30 novembre 2027, interessi del 2% dal novembre 2023, date, ultimo giorno utile e stime.',
    h1: 'Riammissione alla quater: il piano delle 10 rate',
    intro: 'Scrivi le somme dovute indicate nella Comunicazione della riammissione e il numero di rate scelto: il piano mostra ogni scadenza fino al 2027, con l’ultimo giorno utile e l’importo stimato.',
    resume: (h) => {
      const p = h.M.piano('riammissione', 8000, 10);
      return `La riammissione alla rottamazione-quater è stata prevista dall’articolo 3-bis del decreto-legge n. 202 del 2024, il Milleproroghe, convertito dalla legge n. 15 del 2025. Era riservata a chi, al ${h.date(h.P.riammissione.decaduti_al)}, aveva perso la quater per una rata non pagata, insufficiente o tardiva, e valeva solo per i debiti già compresi nella dichiarazione di adesione del 2023. La domanda andava presentata online entro il ${h.date(h.P.riammissione.domanda_entro)} e l’Agente della riscossione ha inviato la Comunicazione delle somme dovute entro il ${h.date(h.P.riammissione.comunicazione_entro)}. Il pagamento avviene in unica soluzione entro il ${h.date(h.P.riammissione.unica)} oppure in un massimo di ${h.num(h.P.riammissione.max_rate)} rate consecutive di pari importo: le prime due il 31 luglio e il 30 novembre 2025, le altre il 28 febbraio, 31 maggio, 31 luglio e 30 novembre del 2026 e del 2027. Gli interessi del ${h.pct(h.P.riammissione.interesse, 0)} annuo decorrono dal ${h.date(h.P.riammissione.interessi_dal)}, quindi già dalla quater originaria. Su ${h.eur(8000)} in dieci rate la stima è di circa ${h.eur(p.rate[0].importo, 2)} a rata. Per il resto si applicano le regole della quater, compresa la decadenza alla prima rata saltata.`;
    },
    faqs: (h) => [
      { q: 'Posso ancora chiedere la riammissione alla quater?', a: `No. Il termine per la domanda era il ${h.date(h.P.riammissione.domanda_entro)} e non è stato riaperto. Chi non l’ha presentata, o chi è decaduto anche dalla riammissione entro il ${h.date(h.P.quinquies.quater_in_regola_al)}, ha potuto usare la quinquies, che ha accolto i carichi della quater e della riammissione non più in regola a quella data.` },
      { q: 'Perché le rate della riammissione sono uguali e quelle della quater no?', a: 'La quater chiedeva il 10% per ciascuna delle prime due rate e divideva il resto in sedici rate. Il decreto del 2024 ha scelto invece dieci rate consecutive di pari ammontare. Gli interessi, però, partono sempre dal novembre 2023, per cui le rate della riammissione comprendono quasi due anni di interessi già maturati alla prima scadenza.' },
      { q: 'Se salto una rata della riammissione posso entrare nella quinquies?', a: `Solo se la decadenza è avvenuta entro il ${h.date(h.P.quinquies.quater_in_regola_al)} e la domanda è stata presentata entro il ${h.date(h.P.quinquies.domanda_entro)}. Per una rata saltata dopo, per esempio quella di novembre 2026, oggi non esiste una nuova definizione: il debito torna dovuto per intero, al netto dei pagamenti fatti.` },
    ],
    body: (h) => `<h2>Il calendario della riammissione</h2>
${h.table(['Rata', 'Scadenza', 'Ultimo giorno utile'], h.P.riammissione.dates.map((d, i) => [`${i + 1}ª`, h.date(d), h.date(h.M.ultimoGiorno(d))]), 'Scadenze dell’art. 3-bis DL 202/2024, con i cinque giorni di tolleranza', ['l', 'l', 'l'])}
<p>Le date vengono dal ${h.src('dl202', 'testo coordinato del decreto-legge n. 202 del 2024')}; le ${h.src('aderRiammissione', 'pagine ufficiali sulla riammissione')} spiegano domanda, Comunicazione e canali di pagamento. A ottobre 2026 restano da pagare le rate del 30 novembre 2026 e le quattro del 2027.</p>
<!--mini:riammissione-->
<h2>Riammissione, quater e quinquies</h2>
<p>La riammissione segue la ${h.a('rottamazione-quater', 'quater')} in tutto, tranne il numero di rate e le date: per questo una sola rata non pagata fa decadere, come spiega la pagina sulla ${h.a('rottamazione-quater-decadenza', 'decadenza dalla quater')}. La rata del ${h.date('2026-11-30')} coincide con quella della quater e con la terza della quinquies, e la pagina sul ${h.a('rottamazione-quinquies-30-novembre', '30 novembre')} le mette a confronto. Di una nuova riapertura dopo la quinquies si parla nella pagina sulla ${h.a('rottamazione-sexies', 'rottamazione-sexies')}, che oggi non ha un testo di legge. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quater-readmission',
    nav: 'Readmission to the quater',
    card: 'The 10 readmission instalments to 30 November 2027: estimated amounts and instalments still to pay.',
    title: 'Riammissione rottamazione quater: the 10 instalments to 2027',
    description: 'Readmission to the rottamazione quater: ten equal instalments to 30 November 2027, 2% interest from November 2023, due dates, last useful days and estimates.',
    h1: 'Readmission to the quater: the 10-instalment plan',
    intro: 'Enter the sum due shown in the readmission statement and the number of instalments chosen: the plan shows each due date up to 2027, with the last useful day and the estimated amount.',
    resume: (h) => {
      const p = h.M.piano('riammissione', 8000, 10);
      return `Readmission to the rottamazione-quater was created by article 3-bis of Decree-Law 202 of 2024, the Milleproroghe, converted by Law 15 of 2025. It was open to anyone who, by ${h.date(h.P.riammissione.decaduti_al)}, had lost the quater through an instalment that was unpaid, short or late, and it only covered debts already listed in the 2023 application. The application had to be filed online by ${h.date(h.P.riammissione.domanda_entro)} and the collection agency sent the statement of sums due by ${h.date(h.P.riammissione.comunicazione_entro)}. Payment is a single sum by ${h.date(h.P.riammissione.unica)} or up to ${h.num(h.P.riammissione.max_rate)} consecutive equal instalments: the first two on 31 July and 30 November 2025, the rest on 28 February, 31 May, 31 July and 30 November of 2026 and 2027. Interest at ${h.pct(h.P.riammissione.interesse, 0)} a year runs from ${h.date(h.P.riammissione.interessi_dal)}, so from the original quater. On ${h.eur(8000)} in ten instalments the estimate is about ${h.eur(p.rate[0].importo, 2)} each. Otherwise the quater rules apply, including lapse at the first missed instalment.`;
    },
    faqs: (h) => [
      { q: 'Can I still apply for readmission to the quater?', a: `No. The application deadline was ${h.date(h.P.riammissione.domanda_entro)} and it has not been reopened. Anyone who did not apply, or who also lapsed from the readmission by ${h.date(h.P.quinquies.quater_in_regola_al)}, could use the quinquies, which took in quater and readmission debts no longer up to date on that date.` },
      { q: 'Why are readmission instalments equal when quater ones are not?', a: 'The quater asked for 10% for each of the first two instalments and split the rest into sixteen. The 2024 decree chose ten consecutive equal instalments instead. Interest, however, still runs from November 2023, so readmission instalments include almost two years of interest already built up at the first due date.' },
      { q: 'If I miss a readmission instalment, can I join the quinquies?', a: `Only if the lapse happened by ${h.date(h.P.quinquies.quater_in_regola_al)} and the application was filed by ${h.date(h.P.quinquies.domanda_entro)}. For an instalment missed later, such as November 2026, there is no new settlement today: the debt is due in full again, minus the payments made.` },
    ],
    body: (h) => `<h2>The readmission calendar</h2>
${h.table(['Instalment', 'Due date', 'Last useful day'], h.P.riammissione.dates.map((d, i) => [`${i + 1}`, h.date(d), h.date(h.M.ultimoGiorno(d))]), 'Due dates of art. 3-bis DL 202/2024, with the five-day tolerance', ['l', 'l', 'l'])}
<p>The dates come from the ${h.src('dl202', 'consolidated text of Decree-Law 202 of 2024')}; the ${h.src('aderRiammissione', 'official readmission pages')} explain the application, the statement and the payment channels. As of October 2026 the instalment of 30 November 2026 and the four of 2027 are still to pay.</p>
<!--mini:riammissione-->
<h2>Readmission, quater and quinquies</h2>
<p>The readmission follows the ${h.a('rottamazione-quater', 'quater')} in everything except the number of instalments and the dates: that is why a single unpaid instalment ends it, as the ${h.a('rottamazione-quater-decadenza', 'quater lapse')} page explains. The ${h.date('2026-11-30')} instalment coincides with the quater one and the third quinquies one, and the ${h.a('rottamazione-quinquies-30-novembre', '30 November')} page compares them. Talk of a new reopening after the quinquies is covered on the ${h.a('rottamazione-sexies', 'rottamazione-sexies')} page, which has no law text today. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
