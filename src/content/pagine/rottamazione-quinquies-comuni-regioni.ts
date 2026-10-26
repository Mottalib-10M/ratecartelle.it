import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quinquies-comuni-regioni',
  group: 'quinquies',
  order: 5,
  tool: 'piano',
  outil: { regimi: ['enti'], defaultRegime: 'enti', defaultImporto: 2400, defaultRate: 24 },
  related: ['rottamazione-multe', 'definizione-agevolata', 'rottamazione-quinquies-scadenze', 'rottamazione-cartelle', 'estratto-di-ruolo'],
  sources: ['dl38', 'l113', 'aderEnti', 'aderEntiDomanda', 'aderEntiProspetto', 'elencoEnti', 'faqEnti'],
  it: {
    slug: 'rottamazione-quinquies-comuni-regioni',
    nav: 'Comuni e regioni',
    card: 'IMU, TARI, bollo e multe dei vigili: domanda entro il 15 dicembre 2026, prima rata il 31 marzo 2027.',
    title: 'Rottamazione quinquies comuni e regioni: domanda e rate',
    description: 'Rottamazione quinquies per IMU, TARI, bollo e multe di comuni e regioni: domanda entro il 15 dicembre 2026, 54 rate dal 31 marzo 2027, enti che aderiscono.',
    h1: 'Quinquies di comuni e regioni: domanda entro il 15 dicembre 2026',
    intro: 'Per i debiti affidati da regioni, province e comuni che hanno aderito, scrivi le somme indicate nel prospetto e il numero di rate: il calendario parte dal 31 marzo 2027 e arriva fino al 2036.',
    resume: (h) => {
      const p = h.M.piano('enti', 2400, 24);
      return `La quinquies dei debiti di comuni e regioni estende le regole della legge n. 199 del 2025 ai carichi affidati all’Agente della riscossione dal ${h.date(h.P.enti.carichi_dal)} al ${h.date(h.P.enti.carichi_al)} da regioni ed enti locali che hanno deciso di applicarla alle proprie entrate. L’ha introdotta l’articolo 10-quinquies del decreto-legge n. 38 del 2026, convertito dalla legge n. 88 del 2026, e la legge n. 113 del 2026 ne ha riscritto le date. Riguarda debiti tributari e non tributari, come IMU, TARI, bollo auto regionale, multe dei vigili e canoni, ed esclude solo le condanne della Corte dei conti. La domanda si presenta online dal ${h.date(h.P.enti.domanda_dal)} al ${h.date(h.P.enti.domanda_entro)}. La Comunicazione arriva entro il ${h.date(h.P.enti.comunicazione_entro)}; si paga in unica soluzione entro il ${h.date(h.P.enti.unica)} o fino a ${h.num(h.P.enti.max_rate)} rate bimestrali di almeno ${h.eur(h.P.enti.rata_minima)}, con interessi del ${h.pct(h.P.enti.interesse, 0)} dal ${h.date(h.P.enti.interessi_dal)}. Esempio: ${h.eur(2400)} in ${h.num(24)} rate danno circa ${h.eur(p.rate[0].importo, 2)} a rata. Per tributi si cancellano sanzioni e interessi; per le multe resta la sanzione e cadono interessi, maggiorazioni e aggio.`;
    },
    faqs: (h) => [
      { q: 'Il mio comune ha aderito alla quinquies?', a: `L’Agente della riscossione pubblica l’elenco delle regioni e degli enti locali che hanno adottato il provvedimento. Nella versione del ${h.date(h.P.enti.elenco.aggiornato)} figurano ${h.num(h.P.enti.elenco.regioni)} regioni, ${h.num(h.P.enti.elenco.province_citta_metropolitane)} enti di area vasta, ${h.num(h.P.enti.elenco.comuni)} comuni e ${h.num(h.P.enti.elenco.unioni)} unioni. Conta l’ente che ha affidato il carico: un comune assente dall’elenco non comparirà nel prospetto informativo.` },
      { q: 'Come presento la domanda per i debiti del comune?', a: 'Solo online sul sito di Agenzia delle entrate-Riscossione: nell’area riservata, con SPID, CIE o CNS, il servizio propone soltanto i carichi definibili da selezionare; nell’area pubblica si compila il modulo allegando un documento di riconoscimento e indicando un indirizzo e-mail non PEC per la ricevuta. Nella domanda si sceglie il numero di rate e si rinuncia agli eventuali giudizi in corso.' },
      { q: 'Avevo una rateizzazione delle multe comunali: cosa succede?', a: `Con la domanda, per i debiti definibili, i pagamenti della vecchia rateizzazione restano sospesi fino alla prima rata del ${h.date(h.P.enti.unica)}, quando quella rateizzazione viene revocata. Se nello stesso piano ci sono debiti che non rientrano, le loro rate vanno pagate con il servizio di pagamento online o allo sportello fino alla revoca.` },
      { q: 'Posso unire nello stesso piano IMU e multe dello stesso comune?', a: 'Sì, la domanda indica le cartelle che vuoi definire e la Comunicazione riunisce le somme in un unico piano con le rate scelte. Le regole di calcolo restano diverse per voce: per l’IMU si cancellano sanzioni e interessi, per le multe resta la sanzione e cadono solo interessi, maggiorazioni e aggio.' },
    ],
    body: (h) => `<h2>Il calendario dei debiti locali</h2>
<p>La ${h.src('l113', 'legge n. 113 del 2026')} ha riscritto la lettera c dell’${h.src('dl38', 'articolo 10-quinquies')}: unica soluzione entro il ${h.date(h.P.enti.unica)}, oppure le prime cinque rate il 31 marzo, 31 maggio, 31 luglio, 30 settembre e 30 novembre del 2027 e le successive il 31 gennaio, 31 marzo, 31 maggio, 31 luglio, 30 settembre e 30 novembre di ogni anno dal 2028. Con ${h.num(h.P.enti.max_rate)} rate l’ultima cade il ${h.date(h.P.enti.dates[53])}. Le ${h.src('faqEnti', 'FAQ ufficiali')} considerano tempestivo l’unico versamento fatto entro il ${h.date(h.P.enti.unica_ultimo_giorno_faq)}. Le regole di decadenza sono quelle della quinquies: due rate scoperte, anche non consecutive, oppure l’ultima.</p>
<!--mini:enti-->
<h2>Prima della domanda: il prospetto</h2>
<p>I dati dei carichi definibili sono disponibili dal ${h.date(h.P.enti.dati_dal)}. Il ${h.src('aderEntiProspetto', 'prospetto informativo')} elenca le cartelle definibili con le somme dovute, senza spese di notifica e procedure e senza gli interessi delle rate, e si chiede nell’area riservata o con il modulo dell’area pubblica. Prima di chiederlo conviene verificare l’ente nell’${h.src('elencoEnti', 'elenco degli enti aderenti')}. Per i debiti verso lo Stato e l’INPS la domanda della quinquies si è invece chiusa il ${h.date(h.P.quinquies.domanda_entro)}. Chi ha multe dei vigili trova le regole specifiche nella pagina sulle ${h.a('rottamazione-multe', 'multe in cartella')}; la data di affidamento di ogni carico si legge nell’${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-quinquies-local-authorities',
    nav: 'Comuni and regions',
    card: 'IMU, TARI, car tax and council fines: apply by 15 December 2026, first instalment on 31 March 2027.',
    title: 'Rottamazione quinquies for comuni: apply by 15 December',
    description: 'Rottamazione quinquies for IMU, TARI, car tax and fines owed to comuni and regions: apply by 15 December 2026, 54 instalments from 31 March 2027, who opted in.',
    h1: 'The quinquies for comuni and regions: apply by 15 December 2026',
    intro: 'For debts passed on by regions, provinces and comuni that opted in, enter the sums shown in the statement of eligible debts and the number of instalments: the calendar starts on 31 March 2027 and runs to 2036.',
    resume: (h) => {
      const p = h.M.piano('enti', 2400, 24);
      return `The quinquies for debts owed to comuni and regions extends the rules of Italian Law 199 of 2025 to debts passed to the collection agency between ${h.date(h.P.enti.carichi_dal)} and ${h.date(h.P.enti.carichi_al)} by regions and local authorities that decided to apply it to their own revenue. It was introduced by article 10-quinquies of Decree-Law 38 of 2026, converted by Law 88 of 2026, and Law 113 of 2026 rewrote its dates. It covers tax and non-tax debts, such as IMU property tax, TARI waste tax, regional car tax, municipal fines and fees, and excludes only Court of Auditors judgments. Applications are online from ${h.date(h.P.enti.domanda_dal)} to ${h.date(h.P.enti.domanda_entro)}. The statement arrives by ${h.date(h.P.enti.comunicazione_entro)}; payment is a single sum by ${h.date(h.P.enti.unica)} or up to ${h.num(h.P.enti.max_rate)} two-monthly instalments of at least ${h.eur(h.P.enti.rata_minima)}, with ${h.pct(h.P.enti.interesse, 0)} interest from ${h.date(h.P.enti.interessi_dal)}. Example: ${h.eur(2400)} over ${h.num(24)} instalments comes to about ${h.eur(p.rate[0].importo, 2)} each. For taxes, penalties and interest are written off; for fines the penalty stays and interest, surcharges and the fee go.`;
    },
    faqs: (h) => [
      { q: 'Has my comune opted into the quinquies?', a: `The collection agency publishes the list of regions and local authorities that adopted the decision. The version of ${h.date(h.P.enti.elenco.aggiornato)} lists ${h.num(h.P.enti.elenco.regioni)} regions, ${h.num(h.P.enti.elenco.province_citta_metropolitane)} wider-area bodies, ${h.num(h.P.enti.elenco.comuni)} comuni and ${h.num(h.P.enti.elenco.unioni)} unions. What counts is the authority that passed on the debt: a comune missing from the list will not appear in the statement of eligible debts.` },
      { q: 'How do I apply for debts owed to my comune?', a: 'Online only, on the Agenzia delle entrate-Riscossione website: in the reserved area, with SPID, CIE or CNS, the service offers only the eligible debts to select; in the public area you fill in the form, attach an identity document and give a non-PEC email address for the receipt. The application sets the number of instalments and waives any court case under way.' },
      { q: 'I had an instalment plan for council fines: what happens?', a: `With the application, for eligible debts, payments under the old plan are suspended until the first instalment of ${h.date(h.P.enti.unica)}, when that plan is revoked. If the same plan holds debts that do not qualify, their instalments must be paid through the online payment service or at a counter until the revocation.` },
      { q: 'Can IMU and fines from the same comune go in one plan?', a: 'Yes, the application lists the bills you want to settle and the statement combines the sums into one plan with the instalments chosen. The calculation rules still differ by item: for IMU penalties and interest are written off, for fines the penalty stays and only interest, surcharges and the fee go.' },
    ],
    body: (h) => `<h2>The calendar for local debts</h2>
<p>${h.src('l113', 'Law 113 of 2026')} rewrote letter c of ${h.src('dl38', 'article 10-quinquies')}: a single payment by ${h.date(h.P.enti.unica)}, or the first five instalments on 31 March, 31 May, 31 July, 30 September and 30 November 2027 and the rest on 31 January, 31 March, 31 May, 31 July, 30 September and 30 November of each year from 2028. With ${h.num(h.P.enti.max_rate)} instalments the last falls on ${h.date(h.P.enti.dates[53])}. The ${h.src('faqEnti', 'official FAQs')} treat a single payment made by ${h.date(h.P.enti.unica_ultimo_giorno_faq)} as on time. The lapse rules are those of the quinquies: two open instalments, consecutive or not, or the last one.</p>
<!--mini:enti-->
<h2>Before applying: the statement of eligible debts</h2>
<p>Data on eligible debts has been available since ${h.date(h.P.enti.dati_dal)}. The ${h.src('aderEntiProspetto', 'statement of eligible debts')} (prospetto informativo) lists the bills that qualify with the sums due, without service and enforcement costs and without instalment interest, and is requested in the reserved area or with the public-area form. Before requesting it, check the authority in the ${h.src('elencoEnti', 'list of participating authorities')}. For debts owed to the State and INPS the quinquies application closed on ${h.date(h.P.quinquies.domanda_entro)}. People with municipal fines will find the specific rules on the ${h.a('rottamazione-multe', 'fines on a tax bill')} page; the handover date of each debt is in the ${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
