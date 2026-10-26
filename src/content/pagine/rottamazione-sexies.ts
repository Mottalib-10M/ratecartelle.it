import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-sexies',
  group: 'alternative',
  order: 3,
  tool: 'scadenze',
  outil: { defaultRegime: 'tutte', defaultMesi: 6 },
  related: ['rottamazione-quinquies-comuni-regioni', 'rateizzazione-cartelle', 'saldo-e-stralcio', 'riammissione-rottamazione-quater', 'cartelle-esattoriali'],
  sources: ['l199', 'l197', 'dl202', 'dl38', 'aderScadenze'],
  it: {
    slug: 'rottamazione-sexies',
    nav: 'Rottamazione-sexies',
    card: 'Nessun testo pubblicato sulla rottamazione-sexies: cosa c’è di certo oggi e le scadenze da non perdere.',
    title: 'Rottamazione sexies: nessun testo di legge, cosa c’è oggi',
    description: 'Rottamazione sexies: al 26 ottobre 2026 non esiste un testo pubblicato. Cosa è certo, come sono nate le definizioni precedenti e le scadenze da rispettare.',
    h1: 'Rottamazione-sexies: cosa esiste davvero oggi',
    intro: 'Mentre di una nuova definizione si parla soltanto, le scadenze delle definizioni in vigore corrono: l’elenco qui sotto mostra quelle dei prossimi mesi, con l’ultimo giorno utile.',
    resume: (h) => `Al ${h.date(h.P.sexies.verificato_il)} non esiste una rottamazione-sexies: nessuna legge, nessun decreto e nessun disegno di legge approvato ne fissa regole, periodi o date, e quindi questo sito non ne calcola rate né requisiti. Lo diremo qui quando un testo sarà pubblicato in Gazzetta Ufficiale. Fino ad allora valgono le definizioni esistenti. La quinquies dei debiti statali, della legge n. 199 del 2025, ha chiuso le domande il ${h.date(h.P.quinquies.domanda_entro)} e copre i carichi affidati fino al ${h.date(h.P.quinquies.carichi_al)}. La quinquies dei comuni e delle regioni aderenti, dell’articolo 10-quinquies del decreto-legge n. 38 del 2026, accetta domande fino al ${h.date(h.P.enti.domanda_entro)}. La quater e la riammissione proseguono per chi è in regola fino al 30 novembre 2027. Chi ha carichi affidati dal 2024 in poi oggi non ha una definizione: può pagare, chiedere una rateizzazione ordinaria o valutare un ricorso. Aspettare una legge che non esiste espone a interessi di mora, fermi e pignoramenti, e saltare una rata di un piano in corso per attendere una nuova misura può far perdere quella che c’è.`,
    faqs: (h) => [
      { q: 'Se arriva la sexies, potrò inserire i debiti della quinquies decaduta?', a: 'Nessuno può dirlo prima del testo. In passato alcune leggi hanno riammesso i carichi delle definizioni decadute, come il comma 99 della legge n. 199 del 2025, ma non è una regola: ogni definizione stabilisce da sé quali carichi ammette. Contare su questa possibilità per smettere di pagare è una scommessa rischiosa.' },
      { q: 'Come si sono succedute le rottamazioni finora?', a: 'La prima definizione delle cartelle è del decreto-legge n. 193 del 2016, seguita dalla rottamazione-bis del decreto-legge n. 148 del 2017, dalla ter del decreto-legge n. 119 del 2018, dalla quater della legge n. 197 del 2022 e dalla quinquies della legge n. 199 del 2025, con l’estensione ai debiti locali del 2026. Ognuna aveva periodi e regole propri.' },
      { q: 'Come saprò se la rottamazione-sexies viene approvata?', a: 'Una definizione diventa reale solo con la pubblicazione della legge o del decreto in Gazzetta Ufficiale; poi l’Agente della riscossione pubblica le istruzioni e apre il servizio per la domanda. Annunci, emendamenti e bozze possono cambiare o sparire. Questa pagina viene riletta a mano e riporta la data dell’ultima verifica.' },
    ],
    body: (h) => `<h2>Le definizioni in vigore oggi</h2>
${h.table(['Definizione', 'Carichi', 'Domanda', 'Ultima rata'], [
  ['Quinquies (L. 199/2025)', `affidati fino al ${h.date(h.P.quinquies.carichi_al)}`, `chiusa il ${h.date(h.P.quinquies.domanda_entro)}`, h.date(h.P.quinquies.dates[53])],
  ['Quinquies degli enti (DL 38/2026)', `affidati fino al ${h.date(h.P.enti.carichi_al)}`, `aperta fino al ${h.date(h.P.enti.domanda_entro)}`, h.date(h.P.enti.dates[53])],
  ['Quater (L. 197/2022)', `affidati fino al ${h.date(h.P.quater.carichi_al)}`, 'chiusa nel 2023', h.date(h.P.quater.dates[17])],
  ['Riammissione (DL 202/2024)', 'decaduti dalla quater', `chiusa il ${h.date(h.P.riammissione.domanda_entro)}`, h.date(h.P.riammissione.dates[9])],
  ['Rottamazione-sexies', 'nessun testo', '–', '–'],
], `Situazione verificata il ${h.date(h.P.sexies.verificato_il)}`, ['l', 'l', 'l', 'l'])}
<p>Le regole vengono dalla ${h.src('l199', 'legge n. 199 del 2025')}, dall’${h.src('dl38', 'articolo 10-quinquies del decreto-legge n. 38 del 2026')}, dalla ${h.src('l197', 'legge n. 197 del 2022')} e dal ${h.src('dl202', 'decreto-legge n. 202 del 2024')}; il calendario delle ${h.src('aderScadenze', 'prossime scadenze')} è pubblicato dall’Agente della riscossione.</p>
<!--mini:copertura-->
<h2>Cosa fare nell’attesa</h2>
<p>Se hai debiti di un comune aderente, la ${h.a('rottamazione-quinquies-comuni-regioni', 'quinquies degli enti')} è l’unica domanda aperta. Per i carichi recenti la strada concreta è la ${h.a('rateizzazione-cartelle', 'rateizzazione')}, che le definizioni passate hanno spesso permesso di far confluire in una nuova misura. Delle vecchie misure chiuse parla la pagina sul ${h.a('saldo-e-stralcio', 'saldo e stralcio')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-sexies',
    nav: 'Rottamazione-sexies',
    card: 'No published text on the rottamazione-sexies: what is certain today and the due dates not to miss.',
    title: 'Rottamazione sexies: no law text yet, what exists today',
    description: 'Rottamazione sexies: as of 26 October 2026 no text has been published. What is certain, how earlier settlements came about and the due dates still to meet.',
    h1: 'Rottamazione-sexies: what really exists today',
    intro: 'While a new settlement is only being talked about, the due dates of the settlements in force keep running: the list below shows those of the coming months, with the last useful day.',
    resume: (h) => `As of ${h.date(h.P.sexies.verificato_il)} there is no rottamazione-sexies: no law, decree or approved bill sets its rules, periods or dates, so this site does not work out instalments or conditions for it. We will say so here when a text is published in the Gazzetta Ufficiale. Until then the existing settlements apply. The State quinquies, under Law 199 of 2025, closed applications on ${h.date(h.P.quinquies.domanda_entro)} and covers debts passed on up to ${h.date(h.P.quinquies.carichi_al)}. The quinquies for participating comuni and regions, under article 10-quinquies of Decree-Law 38 of 2026, accepts applications until ${h.date(h.P.enti.domanda_entro)}. The quater and the readmission carry on for those up to date until 30 November 2027. Anyone with debts passed on from 2024 onwards has no settlement today: they can pay, request an ordinary instalment plan or consider an appeal. Waiting for a law that does not exist exposes you to late interest, vehicle liens and seizures, and skipping an instalment of a running plan to wait for a new measure can lose the one you have.`,
    faqs: (h) => [
      { q: 'If the sexies arrives, will I be able to add lapsed quinquies debts?', a: 'Nobody can say before the text exists. In the past some laws readmitted debts from lapsed settlements, such as paragraph 99 of Law 199 of 2025, but it is not a rule: each settlement decides which debts it admits. Counting on that possibility to stop paying is a risky bet.' },
      { q: 'How have the rottamazioni followed one another so far?', a: 'The first tax bill settlement came with Decree-Law 193 of 2016, followed by the rottamazione-bis of Decree-Law 148 of 2017, the ter of Decree-Law 119 of 2018, the quater of Law 197 of 2022 and the quinquies of Law 199 of 2025, with the 2026 extension to local debts. Each had its own periods and rules.' },
      { q: 'How will I know if the rottamazione-sexies is approved?', a: 'A settlement becomes real only when the law or decree is published in the Gazzetta Ufficiale; then the collection agency publishes instructions and opens the application service. Announcements, amendments and drafts can change or vanish. This page is reread by hand and shows the date of the last check.' },
    ],
    body: (h) => `<h2>The settlements in force today</h2>
${h.table(['Settlement', 'Debts', 'Application', 'Last instalment'], [
  ['Quinquies (Law 199/2025)', `passed on up to ${h.date(h.P.quinquies.carichi_al)}`, `closed on ${h.date(h.P.quinquies.domanda_entro)}`, h.date(h.P.quinquies.dates[53])],
  ['Local-authority quinquies (DL 38/2026)', `passed on up to ${h.date(h.P.enti.carichi_al)}`, `open until ${h.date(h.P.enti.domanda_entro)}`, h.date(h.P.enti.dates[53])],
  ['Quater (Law 197/2022)', `passed on up to ${h.date(h.P.quater.carichi_al)}`, 'closed in 2023', h.date(h.P.quater.dates[17])],
  ['Readmission (DL 202/2024)', 'lapsed from the quater', `closed on ${h.date(h.P.riammissione.domanda_entro)}`, h.date(h.P.riammissione.dates[9])],
  ['Rottamazione-sexies', 'no text', '–', '–'],
], `Situation checked on ${h.date(h.P.sexies.verificato_il)}`, ['l', 'l', 'l', 'l'])}
<p>The rules come from ${h.src('l199', 'Law 199 of 2025')}, ${h.src('dl38', 'article 10-quinquies of Decree-Law 38 of 2026')}, ${h.src('l197', 'Law 197 of 2022')} and ${h.src('dl202', 'Decree-Law 202 of 2024')}; the calendar of ${h.src('aderScadenze', 'upcoming due dates')} is published by the collection agency.</p>
<!--mini:copertura-->
<h2>What to do while waiting</h2>
<p>If you have debts with a participating comune, the ${h.a('rottamazione-quinquies-comuni-regioni', 'local-authority quinquies')} is the only open application. For recent debts the practical route is the ${h.a('rateizzazione-cartelle', 'instalment plan')}, which past settlements have often allowed to be folded into a new measure. Closed older measures are covered on the ${h.a('saldo-e-stralcio', 'saldo e stralcio')} page. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
