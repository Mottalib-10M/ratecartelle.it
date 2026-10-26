import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'saldo-e-stralcio',
  group: 'alternative',
  order: 2,
  tool: 'ammissibilita',
  outil: { defaultEnte: 'ade_dichiarazione', defaultAnno: 2012, defaultPrecedente: 'vecchie_decadute' },
  related: ['rateizzazione-cartelle', 'rottamazione-sexies', 'estratto-di-ruolo', 'rottamazione-quater', 'definizione-agevolata'],
  sources: ['l145', 'l197', 'aderStralcio', 'l199'],
  it: {
    slug: 'saldo-e-stralcio',
    nav: 'Saldo e stralcio',
    card: 'Saldo e stralcio del 2019 e stralcio fino a 1.000 euro del 2023: cosa resta oggi e chi può ancora usarli.',
    title: 'Saldo e stralcio cartelle: cosa resta nel 2026 e alternative',
    description: 'Saldo e stralcio delle cartelle: la misura del 2019 per chi aveva un ISEE basso, lo stralcio automatico fino a 1.000 euro del 2023 e cosa resta oggi a te.',
    h1: 'Saldo e stralcio: cosa resta oggi delle vecchie misure',
    intro: 'Indica creditore e anno di affidamento di un vecchio debito, e se era già in un saldo e stralcio o in una rottamazione: la verifica dice quale definizione lo può coprire oggi.',
    resume: (h) => `Con saldo e stralcio si indicano due misure diverse, entrambe chiuse. La prima è il saldo e stralcio dei commi da 184 a 198 dell’articolo 1 della legge n. 145 del 2018: permetteva alle persone fisiche in grave e comprovata difficoltà economica, con un ISEE del nucleo familiare non superiore a 20.000 euro, di estinguere i carichi affidati dal 2000 al 2017 per imposte dichiarate e non versate e contributi omessi pagando solo una percentuale del capitale, dal 16 al 35% secondo l’ISEE, senza sanzioni e interessi. La domanda si è chiusa nel 2019. La seconda è lo stralcio automatico dei commi da 222 a 230 della legge n. 197 del 2022, che ha cancellato senza domanda i singoli carichi con residuo fino a ${h.eur(h.P.stralcio.soglia)} affidati dal 2000 al 2015: per Stato, agenzie fiscali e INPS l’annullamento è stato totale al ${h.date(h.P.stralcio.annullamento_stato)}; per comuni, regioni e altri enti ha riguardato solo interessi e sanzioni, salvo diversa scelta dell’ente. Oggi chi è decaduto dal saldo e stralcio ha potuto inserire quei carichi nella quinquies, con domanda chiusa il ${h.date(h.P.quinquies.domanda_entro)}. Non esiste un nuovo saldo e stralcio in vigore.`,
    faqs: (h) => [
      { q: 'Il mio debito di 800 euro del 2012 è stato cancellato?', a: `Se il creditore era lo Stato, un’agenzia fiscale o l’INPS e il residuo del singolo carico al 1° gennaio 2023 non superava ${h.eur(h.P.stralcio.soglia)}, sì, in automatico. Se era un comune o una regione, di solito sono stati cancellati solo interessi e sanzioni. Lo vedi nell’estratto di ruolo: il carico annullato non compare più.` },
      { q: 'La soglia di 1.000 euro vale per la cartella o per il singolo debito?', a: 'Per il singolo carico, cioè per ogni ruolo dentro la cartella, comprensivo di capitale, interessi e sanzioni al 1° gennaio 2023. Una cartella da 2.500 euro con tre ruoli sotto i mille euro ha visto cancellati tutti e tre, se affidati entro il 2015 da enti statali.' },
      { q: 'Esiste ancora un saldo e stralcio per chi ha un ISEE basso?', a: 'No. Quello del 2019 era legato a una domanda con termini chiusi da anni e la quinquies non prevede percentuali ridotte in base all’ISEE: tutti pagano il capitale e le spese. Chi ha davvero difficoltà può chiedere una rateizzazione documentata fino a 120 rate, o valutare le procedure di sovraindebitamento con un professionista.' },
    ],
    body: (h) => `<h2>Le due misure a confronto</h2>
${h.table(['Misura', 'Carichi', 'Chi', 'Cosa si pagava'], [
  ['Saldo e stralcio (L. 145/2018)', 'Affidati 2000-2017', 'ISEE fino a 20.000 euro', 'Dal 16 al 35% del capitale'],
  ['Stralcio fino a 1.000 euro (L. 197/2022)', 'Affidati 2000-2015', 'Tutti, senza domanda', 'Niente per i carichi statali'],
  ['Quinquies (L. 199/2025)', 'Affidati 2000-2023', 'Chi ha fatto domanda', 'Capitale e spese'],
], 'Saldo, stralcio e quinquies', ['l', 'l', 'l', 'l'])}
<p>Il testo del saldo e stralcio è nella ${h.src('l145', 'legge n. 145 del 2018')}, quello dello stralcio automatico nella ${h.src('l197', 'legge n. 197 del 2022')}; le ${h.src('aderStralcio', 'pagine ufficiali sullo stralcio')} spiegano le scelte lasciate agli enti non statali. Il ${h.src('l199', 'comma 99 della legge n. 199 del 2025')} ha riammesso i carichi del saldo e stralcio decaduti.</p>
<!--mini:stralcio-->
<h2>Cosa fare oggi con un vecchio debito</h2>
<p>Controlla prima l’${h.a('estratto-di-ruolo', 'estratto di ruolo')}: un carico stralciato non c’è più. Se il debito è ancora lì ed è di un comune aderente, la quinquies degli enti è aperta fino al ${h.date(h.P.enti.domanda_entro)}; altrimenti resta la ${h.a('rateizzazione-cartelle', 'rateizzazione')}. Delle voci su nuove misure parla la pagina sulla ${h.a('rottamazione-sexies', 'rottamazione-sexies')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'saldo-e-stralcio',
    nav: 'Saldo e stralcio',
    card: 'The 2019 saldo e stralcio and the 2023 write-off up to 1,000 euros: what is left today and who can still use them.',
    title: 'Saldo e stralcio: what remains in 2026 and the alternatives',
    description: 'Saldo e stralcio of Italian tax bills: the 2019 measure for low-ISEE households, the automatic 2023 write-off up to 1,000 euros, and what is left for old debts.',
    h1: 'Saldo e stralcio: what is left of the old measures',
    intro: 'Give the creditor and year an old debt was passed on, and whether it was already in a saldo e stralcio or a settlement: the check says which settlement may cover it today.',
    resume: (h) => `Saldo e stralcio refers to two different measures, both closed. The first is the saldo e stralcio of paragraphs 184 to 198 of article 1 of Italian Law 145 of 2018: it allowed individuals in serious, proven financial hardship, with a household ISEE of no more than 20,000 euros, to settle debts passed on from 2000 to 2017 for declared but unpaid taxes and unpaid contributions by paying only a share of the principal, from 16 to 35% depending on the ISEE, with no penalties or interest. Applications closed in 2019. The second is the automatic write-off of paragraphs 222 to 230 of Law 197 of 2022, which cancelled without any application each debt with a balance up to ${h.eur(h.P.stralcio.soglia)} passed on from 2000 to 2015: for the State, tax agencies and INPS the cancellation was total on ${h.date(h.P.stralcio.annullamento_stato)}; for comuni, regions and other bodies it covered interest and penalties only, unless the body chose otherwise. Today anyone who lapsed from the saldo e stralcio could put those debts into the quinquies, with applications closed on ${h.date(h.P.quinquies.domanda_entro)}. No new saldo e stralcio is in force.`,
    faqs: (h) => [
      { q: 'Was my 800-euro debt from 2012 cancelled?', a: `If the creditor was the State, a tax agency or INPS and the balance of that single debt on 1 January 2023 was no more than ${h.eur(h.P.stralcio.soglia)}, yes, automatically. If it was a comune or region, usually only interest and penalties were cancelled. You can see it in the estratto di ruolo: a cancelled debt no longer appears.` },
      { q: 'Does the 1,000-euro threshold apply to the bill or to each debt?', a: 'To each single debt, meaning each roll inside the bill, including principal, interest and penalties on 1 January 2023. A 2,500-euro bill with three rolls under a thousand euros each saw all three cancelled, if passed on by 2015 by State bodies.' },
      { q: 'Is there still a saldo e stralcio for people on a low ISEE?', a: 'No. The 2019 one depended on an application window closed years ago, and the quinquies has no reduced percentages based on ISEE: everyone pays principal and costs. Anyone in real hardship can ask for a documented instalment plan of up to 120 instalments, or look at over-indebtedness procedures with a professional.' },
    ],
    body: (h) => `<h2>The two measures compared</h2>
${h.table(['Measure', 'Debts', 'Who', 'What was paid'], [
  ['Saldo e stralcio (Law 145/2018)', 'Passed on 2000-2017', 'ISEE up to 20,000 euros', '16 to 35% of principal'],
  ['Write-off up to 1,000 euros (Law 197/2022)', 'Passed on 2000-2015', 'Everyone, no application', 'Nothing for State debts'],
  ['Quinquies (Law 199/2025)', 'Passed on 2000-2023', 'Those who applied', 'Principal and costs'],
], 'Saldo, write-off and quinquies', ['l', 'l', 'l', 'l'])}
<p>The saldo e stralcio text is in ${h.src('l145', 'Law 145 of 2018')}, the automatic write-off in ${h.src('l197', 'Law 197 of 2022')}; the ${h.src('aderStralcio', 'official write-off pages')} explain the choices left to non-State bodies. ${h.src('l199', 'Paragraph 99 of Law 199 of 2025')} readmitted lapsed saldo e stralcio debts.</p>
<!--mini:stralcio-->
<h2>What to do today with an old debt</h2>
<p>Check the ${h.a('estratto-di-ruolo', 'estratto di ruolo')} first: a written-off debt is no longer there. If the debt is still listed and belongs to a participating comune, the local-authority quinquies is open until ${h.date(h.P.enti.domanda_entro)}; otherwise the ${h.a('rateizzazione-cartelle', 'instalment plan')} remains. Talk of new measures is covered on the ${h.a('rottamazione-sexies', 'rottamazione-sexies')} page. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
