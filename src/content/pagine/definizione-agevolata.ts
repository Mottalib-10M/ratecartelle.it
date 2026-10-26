import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'definizione-agevolata',
  group: 'cartelle',
  order: 1,
  tool: 'ammissibilita',
  outil: { defaultEnte: 'ade_dichiarazione', defaultAnno: 2019 },
  related: ['rottamazione-cartelle', 'rottamazione-quinquies-comuni-regioni', 'rottamazione-sexies', 'estratto-di-ruolo', 'rottamazione-contributi-inps'],
  sources: ['l199', 'aderQuinquiesAmbito', 'dl38', 'elencoEnti', 'l197', 'dl202'],
  it: {
    slug: 'definizione-agevolata',
    nav: 'Quale definizione mi copre',
    card: 'Anno di affidamento, creditore e rottamazioni precedenti: quale definizione agevolata vale per il tuo carico.',
    title: 'Definizione agevolata 2026: quale rottamazione ti copre',
    description: 'Definizione agevolata 2026: quinquies per Stato e INPS, quinquies di comuni e regioni, quater e riammissione. Verifica quale copre il tuo carico e i termini.',
    h1: 'Definizione agevolata: quale rottamazione vale per il tuo debito',
    intro: 'Indica chi è il creditore, l’anno in cui il carico è stato affidato all’Agente della riscossione e le rottamazioni a cui hai già aderito: la verifica dice quale definizione può coprirlo e se il termine è ancora aperto.',
    resume: (h) => `Definizione agevolata è il nome tecnico delle «rottamazioni»: leggi che permettono di estinguere i debiti affidati all’Agente della riscossione pagando il capitale e le spese, senza sanzioni, interessi e aggio. Nel 2026 ne contano quattro. La rottamazione-quinquies della legge n. 199 del 2025 copre i carichi affidati dal ${h.date(h.P.quinquies.carichi_dal)} al ${h.date(h.P.quinquies.carichi_al)} per imposte dichiarate e non versate, controlli automatici e formali, contributi INPS non accertati e, per i soli interessi e aggio, multe delle prefetture; la domanda si è chiusa il ${h.date(h.P.quinquies.domanda_entro)}. La quinquies degli enti territoriali dell’articolo 10-quinquies del decreto-legge n. 38 del 2026 copre i carichi dello stesso periodo affidati da regioni ed enti locali che hanno aderito, con domanda aperta fino al ${h.date(h.P.enti.domanda_entro)}. La rottamazione-quater della legge n. 197 del 2022, per carichi fino al ${h.date(h.P.quater.carichi_al)}, e la riammissione del decreto-legge n. 202 del 2024 restano in corso per chi paga ancora le rate. Per i carichi affidati dal 2024 non c’è oggi alcuna definizione.`,
    faqs: (h) => [
      { q: 'Un avviso di accertamento dell’Agenzia delle entrate rientra nella quinquies?', a: 'No. La quinquies copre le imposte dichiarate e non versate e quelle emerse dai controlli automatici e formali delle dichiarazioni; restano fuori i carichi nati da un avviso di accertamento. Lo stesso vale per i contributi INPS chiesti dopo un accertamento. Per questi debiti, se non pagati, la strada resta la rateizzazione ordinaria con gli interessi previsti.' },
      { q: 'Ero in regola con la quater: posso passare alla quinquies?', a: `No, per i carichi che erano nella quater o nella riammissione e per cui al ${h.date(h.P.quinquies.quater_in_regola_al)} tutte le rate scadute risultavano pagate. Il comma 100 li esclude: quei carichi restano nel vecchio piano, con il tasso del 2% e la regola severa della rata singola. Chi a quella data era decaduto poteva invece portarli nella quinquies.` },
      { q: 'Che differenza c’è tra rottamazione e definizione agevolata?', a: 'Nessuna nella sostanza: «definizione agevolata» è l’espressione usata dalle leggi, «rottamazione» quella entrata nell’uso comune, con il numero latino che indica la versione (bis, ter, quater, quinquies). Ogni versione ha le sue date, i suoi carichi ammessi e le sue regole di decadenza, quindi conta sempre quale legge si applica al proprio debito.' },
    ],
    body: (h) => `<h2>Le definizioni dal 2016 a oggi</h2>
<p>Il ${h.src('l199', 'comma 99 della legge n. 199 del 2025')} ricorda la serie: la prima definizione del decreto-legge n. 193 del 2016, la seconda del decreto-legge n. 148 del 2017, la terza del decreto-legge n. 119 del 2018, il saldo e stralcio della legge n. 145 del 2018 e la riapertura del decreto-legge n. 34 del 2019. Poi sono arrivate la ${h.src('l197', 'quater del 2022')}, la ${h.src('dl202', 'riammissione del 2025')} e la quinquies del 2026. Chi era decaduto dalle prime tre o dal saldo e stralcio, o dalla quater al ${h.date(h.P.quinquies.quater_in_regola_al)}, poteva portare quei carichi nella quinquies, se rientranti nelle categorie del comma 82.</p>
${h.table(['Definizione', 'Carichi affidati', 'Domanda', 'Rate e interessi'], [
  ['Quater (L. 197/2022)', `fino al ${h.date(h.P.quater.carichi_al)}`, 'chiusa', `${h.num(h.P.quater.max_rate)} rate, ${h.pct(h.P.quater.interesse, 0)}`],
  ['Riammissione (DL 202/2024)', 'decaduti dalla quater', `chiusa il ${h.date(h.P.riammissione.domanda_entro)}`, `${h.num(h.P.riammissione.max_rate)} rate, ${h.pct(h.P.riammissione.interesse, 0)}`],
  ['Quinquies (L. 199/2025)', `${h.date(h.P.quinquies.carichi_dal)} – ${h.date(h.P.quinquies.carichi_al)}`, `chiusa il ${h.date(h.P.quinquies.domanda_entro)}`, `${h.num(h.P.quinquies.max_rate)} rate, ${h.pct(h.P.quinquies.interesse, 0)}`],
  ['Quinquies enti (DL 38/2026)', `${h.date(h.P.enti.carichi_dal)} – ${h.date(h.P.enti.carichi_al)}`, `entro il ${h.date(h.P.enti.domanda_entro)}`, `${h.num(h.P.enti.max_rate)} rate, ${h.pct(h.P.enti.interesse, 0)}`],
], 'Le definizioni agevolate ancora in corso nel 2026', ['l', 'l', 'l', 'l'])}
<!--mini:copertura-->
<h2>Come leggere il proprio caso</h2>
<p>Contano tre cose: chi è il creditore, quando il carico è stato affidato e da dove nasce il debito. L’anno di affidamento si legge nell’${h.a('estratto-di-ruolo', 'estratto di ruolo')} e non coincide con la data della cartella. Per la quinquies le ${h.src('aderQuinquiesAmbito', 'pagine ufficiali')} elencano le categorie ammesse; per i debiti locali serve che l’ente compaia nell’${h.src('elencoEnti', 'elenco degli enti aderenti')}. Il ${h.a('rottamazione-cartelle', 'calcolo del risparmio')} mostra quanto si cancella, e per i carichi dal 2024 la pagina sulla ${h.a('rottamazione-sexies', 'rottamazione-sexies')} dice cosa è pubblicato. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'italian-tax-debt-settlement',
    nav: 'Which settlement covers me',
    card: 'Year passed on, creditor and earlier settlements: which Italian settlement applies to your debt.',
    title: 'Definizione agevolata 2026: which settlement covers you',
    description: 'Definizione agevolata 2026: quinquies for State and INPS debts, quinquies for comuni and regions, quater and readmission. Check which covers your debt.',
    h1: 'Definizione agevolata: which settlement applies to your debt',
    intro: 'Say who the creditor is, the year the debt was passed to the collection agency and any settlements you already joined: the check tells you which settlement can cover it and whether the deadline is still open.',
    resume: (h) => `Definizione agevolata is the legal name for the Italian “rottamazioni”: laws that let you clear debts passed to the collection agency by paying the principal and costs, with no penalties, interest or collection fee. In 2026 four of them matter. The rottamazione-quinquies of Law 199 of 2025 covers debts passed on between ${h.date(h.P.quinquies.carichi_dal)} and ${h.date(h.P.quinquies.carichi_al)} for taxes declared but not paid, automated and formal return checks, INPS contributions not arising from an assessment and, for interest and fee only, fines issued by a prefettura; applications closed on ${h.date(h.P.quinquies.domanda_entro)}. The local-authority quinquies of article 10-quinquies of Decree-Law 38 of 2026 covers debts from the same period passed on by regions and local authorities that opted in, with applications open until ${h.date(h.P.enti.domanda_entro)}. The rottamazione-quater of Law 197 of 2022, for debts up to ${h.date(h.P.quater.carichi_al)}, and the readmission of Decree-Law 202 of 2024 are still running for people paying instalments. For debts passed on from 2024 there is no settlement today.`,
    faqs: (h) => [
      { q: 'Is an Agenzia delle entrate tax assessment covered by the quinquies?', a: 'No. The quinquies covers taxes declared but not paid and those found by automated and formal checks of tax returns; debts arising from a tax assessment notice are left out. The same goes for INPS contributions claimed after an assessment. For these debts, if unpaid, the route remains the ordinary instalment plan with its interest.' },
      { q: 'I was up to date with the quater: can I switch to the quinquies?', a: `No, for debts that were in the quater or readmission and on which every instalment due by ${h.date(h.P.quinquies.quater_in_regola_al)} had been paid. Paragraph 100 excludes them: those debts stay in the old plan, with 2% interest and the strict single-instalment rule. Anyone who had lapsed by that date could instead bring them into the quinquies.` },
      { q: 'What is the difference between rottamazione and definizione agevolata?', a: 'None in substance: “definizione agevolata” is the phrase used in the laws, “rottamazione” the everyday word, with a Latin number for the version (bis, ter, quater, quinquies). Each version has its own dates, eligible debts and lapse rules, so what matters is always which law applies to your debt.' },
    ],
    body: (h) => `<h2>The settlements from 2016 to today</h2>
<p>${h.src('l199', 'Paragraph 99 of Law 199 of 2025')} lists the series: the first settlement under Decree-Law 193 of 2016, the second under Decree-Law 148 of 2017, the third under Decree-Law 119 of 2018, saldo e stralcio under Law 145 of 2018 and the reopening under Decree-Law 34 of 2019. Then came the ${h.src('l197', '2022 quater')}, the ${h.src('dl202', '2025 readmission')} and the 2026 quinquies. Anyone who had lapsed from the first three or from saldo e stralcio, or from the quater by ${h.date(h.P.quinquies.quater_in_regola_al)}, could bring those debts into the quinquies, if they fell within the categories of paragraph 82.</p>
${h.table(['Settlement', 'Debts passed on', 'Application', 'Instalments and interest'], [
  ['Quater (Law 197/2022)', `up to ${h.date(h.P.quater.carichi_al)}`, 'closed', `${h.num(h.P.quater.max_rate)} instalments, ${h.pct(h.P.quater.interesse, 0)}`],
  ['Readmission (DL 202/2024)', 'lapsed from the quater', `closed on ${h.date(h.P.riammissione.domanda_entro)}`, `${h.num(h.P.riammissione.max_rate)} instalments, ${h.pct(h.P.riammissione.interesse, 0)}`],
  ['Quinquies (Law 199/2025)', `${h.date(h.P.quinquies.carichi_dal)} – ${h.date(h.P.quinquies.carichi_al)}`, `closed on ${h.date(h.P.quinquies.domanda_entro)}`, `${h.num(h.P.quinquies.max_rate)} instalments, ${h.pct(h.P.quinquies.interesse, 0)}`],
  ['Local quinquies (DL 38/2026)', `${h.date(h.P.enti.carichi_dal)} – ${h.date(h.P.enti.carichi_al)}`, `by ${h.date(h.P.enti.domanda_entro)}`, `${h.num(h.P.enti.max_rate)} instalments, ${h.pct(h.P.enti.interesse, 0)}`],
], 'Italian settlements still running in 2026', ['l', 'l', 'l', 'l'])}
<!--mini:copertura-->
<h2>How to read your own case</h2>
<p>Three things count: who the creditor is, when the debt was passed on and where the debt comes from. The handover year is shown in the ${h.a('estratto-di-ruolo', 'estratto di ruolo')} and is not the date of the bill. For the quinquies the ${h.src('aderQuinquiesAmbito', 'official pages')} list the eligible categories; for local debts the authority must appear in the ${h.src('elencoEnti', 'list of participating authorities')}. The ${h.a('rottamazione-cartelle', 'savings calculator')} shows how much is written off, and for debts from 2024 the ${h.a('rottamazione-sexies', 'rottamazione-sexies')} page says what has been published. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
