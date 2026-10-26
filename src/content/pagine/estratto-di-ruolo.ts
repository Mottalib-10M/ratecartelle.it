import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'estratto-di-ruolo',
  group: 'cartelle',
  order: 6,
  tool: 'ammissibilita',
  outil: { defaultEnte: 'inps_omesso', defaultAnno: 2016, defaultPrecedente: 'vecchie_decadute' },
  related: ['cartelle-esattoriali', 'definizione-agevolata', 'rottamazione-contributi-inps', 'saldo-e-stralcio', 'rottamazione-quinquies-comuni-regioni'],
  sources: ['dpr602', 'aderEntiProspetto', 'aderQuinquiesAmbito', 'l199'],
  it: {
    slug: 'estratto-di-ruolo',
    nav: 'Estratto di ruolo',
    card: 'Come leggere l’estratto di ruolo: anno di affidamento, creditore e importi che decidono la definizione.',
    title: 'Estratto di ruolo: come leggerlo per la definizione 2026',
    description: 'Estratto di ruolo: dove scaricarlo gratis, come leggere anno di affidamento, ente creditore e residui, e capire carico per carico quale definizione si applica.',
    h1: 'Estratto di ruolo: leggerlo per capire quale definizione ti copre',
    intro: 'Copia dall’estratto di ruolo il creditore e l’anno di affidamento di un carico, e indica se era già in una rottamazione: la verifica dice quale definizione può coprirlo.',
    resume: (h) => `L’estratto di ruolo è il documento che riepiloga tutti i debiti affidati all’Agente della riscossione a nome di una persona o di un’impresa: per ogni cartella o avviso indica l’ente creditore, il tipo di entrata, la data di affidamento del carico, la data di notifica e l’importo residuo, diviso fra imposta, sanzioni, interessi, mora e spese. Si scarica gratis nell’area riservata del sito di Agenzia delle entrate-Riscossione, con SPID, CIE o CNS, oppure si chiede allo sportello. Per la definizione agevolata è il punto di partenza, perché le leggi guardano al singolo carico e non alla cartella intera: la quinquies dei debiti statali ammette i carichi affidati dal ${h.date(h.P.quinquies.carichi_dal)} al ${h.date(h.P.quinquies.carichi_al)} che derivano da imposte dichiarate e non versate, da controlli automatici o formali e da contributi INPS non accertati; quella degli enti territoriali i carichi dello stesso periodo affidati da regioni ed enti aderenti. Dal 2021 l’articolo 12, comma 4-bis, del DPR n. 602 del 1973 stabilisce che l’estratto di ruolo non si può impugnare: le cartelle che si ritengono mai notificate si contestano direttamente solo in casi limitati, quando il debitore dimostra un pregiudizio specifico, come l’esclusione da un appalto pubblico.`,
    faqs: (h) => [
      { q: 'L’estratto di ruolo e il prospetto informativo sono la stessa cosa?', a: 'No. L’estratto di ruolo elenca tutti i debiti affidati all’Agente, definibili o no. Il prospetto informativo è il documento che l’Agente ha messo a disposizione per la definizione agevolata e mostra solo i carichi che rientrano, con le somme dovute già calcolate. Per i debiti di comuni e regioni il prospetto è disponibile durante il periodo di domanda.' },
      { q: 'Dove leggo l’anno di affidamento di un carico?', a: 'Nell’estratto di ruolo ogni carico ha una data di consegna o di affidamento del ruolo all’Agente, diversa dalla data della cartella e da quella di notifica. È quella data che decide se il carico rientra nel periodo dal 2000 al 2023: una cartella notificata nel 2025 può riguardare un carico affidato nel 2023.' },
      { q: 'L’estratto di ruolo mostra anche i debiti prescritti?', a: 'L’estratto riporta i carichi ancora in carico all’Agente, compresi quelli per cui potrebbe essere maturata la prescrizione: non è l’Agente a dichiararla d’ufficio. Verificare la prescrizione richiede di ricostruire notifiche e atti interruttivi carico per carico, un lavoro da fare con un professionista prima di decidere se aderire.' },
    ],
    body: (h) => `<h2>Le colonne che contano</h2>
${h.table(['Dato dell’estratto', 'Perché conta per la definizione'], [
  ['Ente creditore', 'Stato e INPS nella quinquies, comuni e regioni aderenti nella quinquies degli enti'],
  ['Data di affidamento', 'Deve cadere fra il 1° gennaio 2000 e il 31 dicembre 2023'],
  ['Tipo di entrata', 'Imposte dichiarate o accertamento, contributi omessi o accertati, multa'],
  ['Importo residuo per voce', 'Separa ciò che si cancella da ciò che resta dovuto'],
  ['Rottamazioni precedenti', 'I carichi della quater in regola al 30 settembre 2025 restano fuori'],
], 'Come usare l’estratto di ruolo per la definizione agevolata', ['l', 'l'])}
<p>Il ${h.src('l199', 'comma 99 della legge n. 199 del 2025')} ammette alla quinquies anche i carichi delle rottamazioni dal 2016 al 2019 e del saldo e stralcio da cui si era decaduti, mentre il comma 100 esclude quelli della quater ancora in regola. Le pagine sull’${h.src('aderQuinquiesAmbito', 'ambito della quinquies')} e sul ${h.src('aderEntiProspetto', 'prospetto degli enti')} spiegano come vengono selezionati i carichi.</p>
<!--mini:copertura-->
<h2>Impugnare o definire</h2>
<p>L’${h.src('dpr602', 'articolo 12, comma 4-bis')}, introdotto dal decreto-legge n. 146 del 2021, ha chiuso la strada del ricorso contro il solo estratto di ruolo. Chi aderisce a una definizione rinuncia ai giudizi sui carichi inseriti, quindi la scelta va fatta prima. Per leggere le voci di ogni cartella c’è la guida alle ${h.a('cartelle-esattoriali', 'cartelle esattoriali')}; per i contributi, la pagina sui ${h.a('rottamazione-contributi-inps', 'debiti INPS')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'estratto-di-ruolo',
    nav: 'Estratto di ruolo',
    card: 'How to read the estratto di ruolo: year passed on, creditor and amounts that decide the settlement.',
    title: 'Estratto di ruolo: how to read it for the settlement',
    description: 'Estratto di ruolo, the Italian statement of debts: where to get it free, how to read the hand-over year, creditor and balances, and which settlement fits.',
    h1: 'Estratto di ruolo: reading it to see which settlement covers you',
    intro: 'Copy from the estratto di ruolo the creditor and the year a debt was passed on, and say whether it was already in a settlement: the check says which settlement may cover it.',
    resume: (h) => `The estratto di ruolo is the document listing every debt passed to the Italian collection agency in the name of a person or business: for each bill or notice it shows the creditor body, the type of revenue, the date the debt was passed on, the service date and the remaining balance, split into tax, penalties, interest, late interest and costs. It can be downloaded free from the reserved area of the Agenzia delle entrate-Riscossione website, with SPID, CIE or CNS, or requested at a counter. For the settlement it is the starting point, because the laws look at each single debt and not at the whole bill: the State quinquies admits debts passed on from ${h.date(h.P.quinquies.carichi_dal)} to ${h.date(h.P.quinquies.carichi_al)} that come from declared but unpaid taxes, automated or formal checks and non-assessed INPS contributions; the local-authority one admits debts from the same period passed on by participating regions and authorities. Since 2021 article 12, paragraph 4-bis, of Presidential Decree 602 of 1973 states that the estratto di ruolo cannot be challenged: bills believed never served can be contested directly only in limited cases, when the debtor shows a specific harm, such as exclusion from a public contract.`,
    faqs: (h) => [
      { q: 'Are the estratto di ruolo and the statement of eligible debts the same?', a: 'No. The estratto di ruolo lists every debt passed to the agency, eligible or not. The statement of eligible debts is the document the agency provided for the settlement and shows only the debts that qualify, with the sums due already worked out. For comuni and regions the statement is available during the application period.' },
      { q: 'Where do I read the year a debt was passed on?', a: 'In the estratto di ruolo each debt has a date the roll was handed to the agency, which differs from the bill date and the service date. That is the date deciding whether the debt falls in the 2000 to 2023 window: a bill served in 2025 may concern a debt passed on in 2023.' },
      { q: 'Does the estratto di ruolo also show time-barred debts?', a: 'It shows the debts still held by the agency, including those that may have become time-barred: the agency does not declare that on its own. Checking the time bar means rebuilding service dates and interrupting acts debt by debt, work to do with a professional before deciding whether to apply.' },
    ],
    body: (h) => `<h2>The columns that matter</h2>
${h.table(['Item in the statement', 'Why it matters for the settlement'], [
  ['Creditor body', 'State and INPS in the quinquies, participating comuni and regions in the local one'],
  ['Date passed on', 'Must fall between 1 January 2000 and 31 December 2023'],
  ['Type of revenue', 'Declared taxes or audit, unpaid or assessed contributions, fine'],
  ['Balance per item', 'Separates what is written off from what stays due'],
  ['Earlier settlements', 'Quater debts up to date on 30 September 2025 stay out'],
], 'How to use the estratto di ruolo for the settlement', ['l', 'l'])}
<p>${h.src('l199', 'Paragraph 99 of Law 199 of 2025')} also admits to the quinquies lapsed debts from the 2016 to 2019 settlements and from the saldo e stralcio, while paragraph 100 excludes quater debts still up to date. The pages on the ${h.src('aderQuinquiesAmbito', 'scope of the quinquies')} and on the ${h.src('aderEntiProspetto', 'local-authority statement')} explain how debts are selected.</p>
<!--mini:copertura-->
<h2>Challenge or settle</h2>
<p>${h.src('dpr602', 'Article 12, paragraph 4-bis')}, introduced by Decree-Law 146 of 2021, closed the route of appealing against the estratto di ruolo alone. Anyone joining a settlement drops court cases on the debts included, so the choice must be made first. To read the items on each bill there is the guide to ${h.a('cartelle-esattoriali', 'Italian tax bills')}; for contributions, the page on ${h.a('rottamazione-contributi-inps', 'INPS debts')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
