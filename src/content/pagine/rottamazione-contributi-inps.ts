import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-contributi-inps',
  group: 'cartelle',
  order: 4,
  tool: 'risparmio',
  outil: { tipi: ['inps', 'imposte'], defaultTipo: 'inps', defaultVoci: { capitale: 4200, sanzioni: 1650, interessi: 0, mora: 380, aggio: 0, spese: 6 }, defaultRate: 36 },
  related: ['definizione-agevolata', 'rottamazione-cartelle', 'rottamazione-quinquies-rate', 'rateizzazione-cartelle', 'estratto-di-ruolo'],
  sources: ['l199', 'faqQuinquies', 'aderQuinquiesAmbito', 'dlgs110'],
  it: {
    slug: 'rottamazione-contributi-inps',
    nav: 'Contributi INPS',
    card: 'Avvisi di addebito INPS: quali contributi rientrano nella quinquies e quanto si toglie con le sanzioni civili.',
    title: 'Rottamazione contributi INPS: avvisi di addebito e sanzioni',
    description: 'Rottamazione dei contributi INPS: quali avvisi di addebito rientrano nella quinquies, perché gli accertamenti restano fuori, quanto si risparmia sulle sanzioni.',
    h1: 'Contributi INPS e rottamazione: cosa rientra e quanto si toglie',
    intro: 'Scrivi le voci dell’avviso di addebito o della cartella INPS: il calcolo lascia i contributi e le spese, toglie sanzioni civili, somme aggiuntive e interessi di mora, e mostra la rata.',
    resume: (h) => {
      const r = h.M.risparmio('inps', { capitale: 4200, sanzioni: 1650, interessi: 0, mora: 380, aggio: 0, spese: 6 });
      return `La rottamazione-quinquies comprende i debiti verso l’INPS, ma solo una parte. Il comma 82 dell’articolo 1 della legge n. 199 del 2025 ammette i carichi affidati all’Agente della riscossione dal 2000 al 2023 che derivano dall’omesso versamento di contributi previdenziali dovuti all’INPS, con esclusione di quelli richiesti a seguito di accertamento. In pratica rientrano i contributi che il lavoratore autonomo, l’artigiano, il commerciante o il datore di lavoro conoscevano e non hanno pagato, come le rate fisse della gestione artigiani e commercianti o i contributi dichiarati con l’F24 e non versati; restano fuori quelli emersi da un’ispezione o da un verbale di accertamento. Per i carichi ammessi si pagano i contributi e le spese, mentre si cancellano le sanzioni civili e le somme aggiuntive dell’articolo 27 del decreto legislativo n. 46 del 1999 e gli interessi di mora. Esempio: un avviso con ${h.eur(4200)} di contributi, ${h.eur(1650)} di sanzioni civili, ${h.eur(380)} di mora e ${h.eur(6)} di spese scende a ${h.eur(r.dovuto)}. Le casse dei professionisti e l’INAIL non sono citate dalla norma.`;
    },
    faqs: (h) => [
      { q: 'L’avviso di addebito INPS è come una cartella per la rottamazione?', a: 'Sì. Dal 2011 l’INPS non iscrive più i contributi a ruolo con la cartella, ma notifica un avviso di addebito con valore di titolo esecutivo, che poi affida all’Agente della riscossione. Una volta affidato, è un carico come gli altri e compare nel prospetto dei debiti definibili, se rispetta le condizioni della legge.' },
      { q: 'Come capisco se i contributi vengono da un accertamento?', a: 'Nell’avviso di addebito o nell’estratto di ruolo è indicata la causale del credito: le rate fisse non pagate e i contributi denunciati e non versati sono omessi versamenti, mentre i verbali ispettivi e le rettifiche dell’INPS sono accertamenti. Il prospetto informativo dell’Agente elenca già solo i carichi che considera definibili.' },
      { q: 'Pagando la rottamazione recupero i contributi ai fini della pensione?', a: 'I contributi versati con la definizione sono il capitale del debito, quindi vengono accreditati sulla posizione come gli altri versamenti dopo l’estinzione del carico. Per sapere quando compaiono nell’estratto conto previdenziale conviene chiedere alla sede INPS, perché i tempi di aggiornamento dipendono dalla gestione.' },
    ],
    body: (h) => {
      const p = h.M.piano('quinquies', 4206, 36);
      return `<h2>Cosa rientra e cosa no</h2>
${h.table(['Debito verso la previdenza', 'Quinquies'], [
  ['Rate fisse IVS artigiani e commercianti non pagate', 'Sì'],
  ['Contributi a percentuale dichiarati e non versati', 'Sì'],
  ['Contributi dei dipendenti denunciati e non versati', 'Sì'],
  ['Contributi da verbale ispettivo o accertamento', 'No'],
  ['Casse dei professionisti, INAIL', 'Non citate dal comma 82'],
], 'Contributi e quinquies (comma 82 L. 199/2025)', ['l', 'l'])}
<p>Le ${h.src('faqQuinquies', 'FAQ ufficiali')} e la pagina sull’${h.src('aderQuinquiesAmbito', 'ambito della quinquies')} ricordano che conta l’origine del singolo carico, non il tipo di contribuente: lo stesso artigiano può avere un avviso ammesso e uno escluso. Su ${h.eur(4206)} di somme dovute, ${h.num(36)} rate danno circa ${h.eur(p.rate[0].importo, 2)} ciascuna, interessi del 3% compresi.</p>
<!--mini:rata-->
<h2>Se il carico INPS è escluso</h2>
<p>Per i contributi da accertamento resta la ${h.a('rateizzazione-cartelle', 'rateizzazione ordinaria')}, che non cancella nulla ma divide il debito fino a 84 rate mensili nel 2026 senza documentare la difficoltà sotto i 120.000 euro. Per controllare la natura di ogni debito si parte dall’${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
  en: {
    slug: 'rottamazione-inps-contributions',
    nav: 'INPS contributions',
    card: 'INPS charge notices: which contributions fall within the quinquies and how much comes off with civil penalties.',
    title: 'Rottamazione INPS contributions: charge notices, penalties',
    description: 'Rottamazione of INPS contributions: which charge notices fall within the quinquies, why audits stay out, and how much you save on civil penalties and extras.',
    h1: 'INPS contributions and the rottamazione: what is in and what comes off',
    intro: 'Enter the items on the INPS charge notice or bill: the calculation keeps contributions and costs, removes civil penalties, surcharges and late interest, and shows the instalment.',
    resume: (h) => {
      const r = h.M.risparmio('inps', { capitale: 4200, sanzioni: 1650, interessi: 0, mora: 380, aggio: 0, spese: 6 });
      return `The rottamazione-quinquies includes debts owed to INPS, the Italian social security institute, but only some of them. Paragraph 82 of article 1 of Law 199 of 2025 admits debts passed to the collection agency from 2000 to 2023 that come from unpaid social security contributions owed to INPS, excluding those claimed after an audit. In practice that covers contributions the self-employed, craftsmen, shopkeepers or employers knew about and did not pay, such as the fixed instalments of the craftsmen and traders scheme or contributions declared on the F24 and not paid; those arising from an inspection or an audit report stay out. For eligible debts you pay the contributions and costs, while civil penalties, the surcharges of article 27 of Legislative Decree 46 of 1999 and late interest are written off. Example: a notice with ${h.eur(4200)} of contributions, ${h.eur(1650)} of civil penalties, ${h.eur(380)} of late interest and ${h.eur(6)} of costs comes down to ${h.eur(r.dovuto)}. Professional pension funds and INAIL are not named in the rule.`;
    },
    faqs: (h) => [
      { q: 'Is an INPS charge notice like a tax bill for the rottamazione?', a: 'Yes. Since 2011 INPS no longer enters contributions on a roll with a cartella but serves a charge notice that is itself enforceable, then passes it to the collection agency. Once passed on, it is a debt like the others and appears in the statement of eligible debts, if it meets the law’s conditions.' },
      { q: 'How do I tell whether contributions come from an audit?', a: 'The charge notice or the estratto di ruolo states the reason for the claim: unpaid fixed instalments and contributions declared but not paid are unpaid payments, while inspection reports and INPS adjustments are audits. The agency’s statement of eligible debts already lists only the debts it considers eligible.' },
      { q: 'Does paying the rottamazione restore the contributions for my pension?', a: 'The contributions paid under the settlement are the principal of the debt, so they are credited to your record like other payments once the debt is settled. To know when they appear in your contribution statement, ask your INPS office, because update times depend on the scheme.' },
    ],
    body: (h) => {
      const p = h.M.piano('quinquies', 4206, 36);
      return `<h2>What is in and what is out</h2>
${h.table(['Social security debt', 'Quinquies'], [
  ['Unpaid fixed IVS instalments for craftsmen and traders', 'Yes'],
  ['Percentage contributions declared and not paid', 'Yes'],
  ['Employee contributions declared and not paid', 'Yes'],
  ['Contributions from an inspection or audit', 'No'],
  ['Professional funds, INAIL', 'Not named in paragraph 82'],
], 'Contributions and the quinquies (paragraph 82, Law 199/2025)', ['l', 'l'])}
<p>The ${h.src('faqQuinquies', 'official FAQs')} and the page on the ${h.src('aderQuinquiesAmbito', 'scope of the quinquies')} point out that what counts is the origin of each debt, not the type of contributor: the same craftsman can have one notice admitted and one excluded. On ${h.eur(4206)} due, ${h.num(36)} instalments give about ${h.eur(p.rate[0].importo, 2)} each, 3% interest included.</p>
<!--mini:rata-->
<h2>If the INPS debt is excluded</h2>
<p>For contributions from an audit the ${h.a('rateizzazione-cartelle', 'ordinary instalment plan')} remains, which writes nothing off but spreads the debt over up to 84 monthly instalments in 2026 without proving hardship below 120,000 euros. To check the nature of each debt, start from the ${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
});
