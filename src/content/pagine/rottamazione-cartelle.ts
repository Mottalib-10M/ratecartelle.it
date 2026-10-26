import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-cartelle',
  group: 'cartelle',
  order: 2,
  tool: 'risparmio',
  outil: { defaultTipo: 'imposte' },
  related: ['cartelle-esattoriali', 'definizione-agevolata', 'rottamazione-multe', 'rottamazione-contributi-inps', 'rottamazione-quinquies-calcolo'],
  sources: ['l199', 'faqQuinquies', 'dl38', 'faqEnti', 'aderCartella', 'l234'],
  it: {
    slug: 'rottamazione-cartelle',
    nav: 'Quanto si risparmia',
    card: 'Le voci della cartella una per una: cosa si cancella con la rottamazione e cosa resta da pagare.',
    title: 'Rottamazione cartelle 2026: cosa si cancella e cosa paghi',
    description: 'Rottamazione delle cartelle 2026: inserisci le voci e vedi cosa si cancella (sanzioni, interessi, mora, aggio) e cosa resta, anche per multe e tributi locali.',
    h1: 'Rottamazione delle cartelle: quanto si cancella dal tuo debito',
    intro: 'Copia le voci della cartella o del prospetto informativo: il calcolo separa ciò che la definizione cancella da ciò che resta dovuto, e mostra quanto pagheresti a rate.',
    resume: (h) => {
      const r = h.M.risparmio('imposte', { capitale: 6000, sanzioni: 1800, interessi: 450, mora: 620, aggio: 380, spese: 15 });
      return `Con la rottamazione delle cartelle si paga solo una parte del debito iscritto a ruolo. Il comma 82 dell’articolo 1 della legge n. 199 del 2025 chiede il capitale e il rimborso delle spese per le procedure esecutive e per la notifica della cartella, e cancella gli interessi iscritti a ruolo, le sanzioni, gli interessi di mora dell’articolo 30 del DPR n. 602 del 1973, le sanzioni e somme aggiuntive sui contributi e l’aggio. Le stesse regole valgono per i tributi di regioni e comuni nella quinquies degli enti territoriali. Per le multe stradali, delle prefetture o dei comuni, la sanzione invece resta: si cancellano soltanto gli interessi, comprese le maggiorazioni semestrali, e l’aggio. Esempio: una cartella con ${h.eur(6000)} di imposta, ${h.eur(1800)} di sanzioni, ${h.eur(450)} di interessi, ${h.eur(620)} di mora, ${h.eur(380)} di aggio e ${h.eur(15)} di spese scende a ${h.eur(r.dovuto)}, con ${h.eur(r.cancellato)} cancellati, il ${h.pct(r.quota, 0)} del totale. A rate si aggiungono gli interessi del 3% annuo. L’importo esatto è nella Comunicazione delle somme dovute.`;
    },
    faqs: (h) => [
      { q: 'Dove trovo sulla cartella le voci da inserire?', a: 'Nel dettaglio degli addebiti della cartella ogni ruolo riporta l’importo dell’imposta o del contributo, le sanzioni, gli interessi, i diritti di notifica e, per i carichi più vecchi, gli oneri di riscossione. Gli interessi di mora maturano dopo i 60 giorni dalla notifica, quindi l’importo aggiornato si vede nell’area riservata o nell’estratto di ruolo. Il prospetto informativo indica direttamente le somme dovute con la definizione.' },
      { q: 'L’aggio c’è ancora nelle cartelle recenti?', a: `No, per i carichi affidati dal ${h.date(h.P.aggio_abolito_dal)} la legge n. 234 del 2021 ha sostituito l’aggio a carico del debitore con un finanziamento pubblico dell’Agente della riscossione. Nelle cartelle più vecchie compare come aggio o oneri di riscossione, in percentuale crescente dopo i 60 giorni: è una delle voci che la definizione cancella.` },
      { q: 'Le spese di notifica si pagano anche con la rottamazione?', a: 'Sì. Il comma 82 chiede il rimborso delle spese per le procedure esecutive e dei diritti di notifica della cartella, che restano quindi nelle somme dovute. Di solito sono pochi euro per cartella, ma con procedure esecutive già avviate, come un pignoramento, le spese possono essere più alte e vanno comprese nel conto.' },
    ],
    body: (h) => {
      const m = h.M.risparmio('multa_stato', { capitale: 0, sanzioni: 400, interessi: 240, mora: 0, aggio: 25, spese: 9 });
      return `<h2>Voce per voce</h2>
${h.table(['Voce della cartella', 'Imposte, INPS, tributi locali', 'Multe stradali'], [
  ['Imposta, tributo o contributo', 'si paga', '–'],
  ['Sanzioni', 'cancellate', 'la multa si paga'],
  ['Interessi iscritti a ruolo e maggiorazioni', 'cancellati', 'cancellati'],
  ['Interessi di mora', 'cancellati', 'cancellati'],
  ['Aggio od oneri di riscossione', 'cancellati', 'cancellati'],
  ['Spese di notifica e procedure', 'si pagano', 'si pagano'],
], 'Cosa resta dovuto con la definizione (commi 82 e 97 L. 199/2025; art. 10-quinquies DL 38/2026)', ['l', 'l', 'l'])}
<p>Per una multa la differenza è grande: ${h.eur(400)} di sanzione, ${h.eur(240)} di maggiorazioni e interessi, ${h.eur(25)} di aggio e ${h.eur(9)} di spese diventano ${h.eur(m.dovuto)}, perché la multa resta intera. Le ${h.src('faqEnti', 'FAQ sui debiti locali')} precisano che le maggiorazioni dell’articolo 27 della legge n. 689 del 1981 sono tra gli interessi cancellati. I dettagli sono nella pagina sulle ${h.a('rottamazione-multe', 'multe in cartella')}.</p>
<!--mini:taglio-->
<h2>E dopo il calcolo</h2>
<p>Per i debiti verso lo Stato e l’INPS la domanda della quinquies si è chiusa il ${h.date(h.P.quinquies.domanda_entro)}: il calcolo serve a capire la Comunicazione già ricevuta. Per i debiti di comuni e regioni che hanno aderito la domanda è aperta fino al ${h.date(h.P.enti.domanda_entro)}. Il ${h.src('faqQuinquies', 'testo delle FAQ')} ricorda che le somme già versate per un carico definibile restano acquisite e non si rimborsano, e contano solo i versamenti fatti a titolo di capitale e spese. Per capire se un carico rientra usa la verifica su ${h.a('definizione-agevolata', 'quale definizione ti copre')}; per leggere la cartella, la guida alle ${h.a('cartelle-esattoriali', 'cartelle esattoriali')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
  en: {
    slug: 'cartelle-settlement-savings',
    nav: 'How much you save',
    card: 'Each item on the tax bill: what the settlement writes off and what is left to pay.',
    title: 'Rottamazione cartelle 2026: what is written off and paid',
    description: 'Rottamazione of Italian tax bills in 2026: enter the items on your cartella and see what is written off (penalties, interest, late interest, fee) and the rest.',
    h1: 'Rottamazione of tax bills: how much comes off your debt',
    intro: 'Copy the items from the bill or the statement of eligible debts: the calculation separates what the settlement writes off from what stays due, and shows what you would pay in instalments.',
    resume: (h) => {
      const r = h.M.risparmio('imposte', { capitale: 6000, sanzioni: 1800, interessi: 450, mora: 620, aggio: 380, spese: 15 });
      return `With the rottamazione of tax bills you pay only part of the debt on the roll. Paragraph 82 of article 1 of Italian Law 199 of 2025 asks for the principal plus reimbursement of enforcement and service costs, and writes off the interest entered on the roll, penalties, the late-payment interest of article 30 of Presidential Decree 602 of 1973, penalties and surcharges on contributions, and the collection fee. The same rules apply to regional and municipal taxes in the local-authority quinquies. For traffic fines, from a prefettura or a comune, the penalty stays: only interest, including the six-monthly surcharges, and the fee are written off. Example: a bill with ${h.eur(6000)} of tax, ${h.eur(1800)} of penalties, ${h.eur(450)} of interest, ${h.eur(620)} of late interest, ${h.eur(380)} of fee and ${h.eur(15)} of costs comes down to ${h.eur(r.dovuto)}, with ${h.eur(r.cancellato)} written off, ${h.pct(r.quota, 0)} of the total. In instalments, 3% annual interest is added. The exact amount is in the statement of sums due.`;
    },
    faqs: (h) => [
      { q: 'Where on the bill do I find the items to enter?', a: 'In the breakdown of charges on the cartella each roll shows the tax or contribution, penalties, interest, service fees and, for older debts, collection charges. Late interest builds up after the 60 days from service, so the updated figure shows in the reserved area or in the estratto di ruolo. The statement of eligible debts gives the sums due under the settlement directly.' },
      { q: 'Is there still a collection fee on recent bills?', a: `No. For debts passed on from ${h.date(h.P.aggio_abolito_dal)}, Law 234 of 2021 replaced the fee charged to the debtor with public funding of the collection agency. On older bills it appears as aggio or collection charges, at a higher percentage after 60 days: it is one of the items the settlement writes off.` },
      { q: 'Do service costs still have to be paid under the rottamazione?', a: 'Yes. Paragraph 82 requires reimbursement of enforcement costs and the bill’s service fees, which therefore stay in the sums due. They are usually a few euros per bill, but if enforcement has already started, such as a seizure, costs can be higher and belong in the count.' },
    ],
    body: (h) => {
      const m = h.M.risparmio('multa_stato', { capitale: 0, sanzioni: 400, interessi: 240, mora: 0, aggio: 25, spese: 9 });
      return `<h2>Item by item</h2>
${h.table(['Item on the bill', 'Taxes, INPS, local taxes', 'Traffic fines'], [
  ['Tax or contribution', 'paid', '–'],
  ['Penalties', 'written off', 'the fine is paid'],
  ['Interest on the roll and surcharges', 'written off', 'written off'],
  ['Late interest', 'written off', 'written off'],
  ['Collection fee', 'written off', 'written off'],
  ['Service and enforcement costs', 'paid', 'paid'],
], 'What stays due under the settlement (paragraphs 82 and 97, Law 199/2025; article 10-quinquies, DL 38/2026)', ['l', 'l', 'l'])}
<p>For a fine the difference is large: ${h.eur(400)} of penalty, ${h.eur(240)} of surcharges and interest, ${h.eur(25)} of fee and ${h.eur(9)} of costs become ${h.eur(m.dovuto)}, because the fine itself stays. The ${h.src('faqEnti', 'FAQs on local debts')} state that the surcharges of article 27 of Law 689 of 1981 are among the interest written off. Details are on the ${h.a('rottamazione-multe', 'fines on a tax bill')} page.</p>
<!--mini:taglio-->
<h2>After the calculation</h2>
<p>For debts owed to the State and INPS the quinquies application closed on ${h.date(h.P.quinquies.domanda_entro)}: the calculation helps you read the statement you already received. For debts owed to comuni and regions that opted in, applications are open until ${h.date(h.P.enti.domanda_entro)}. The ${h.src('faqQuinquies', 'FAQs')} note that sums already paid on an eligible debt are kept and not refunded, and only payments made as principal and costs count. To see whether a debt qualifies use the check on ${h.a('definizione-agevolata', 'which settlement covers you')}; to read the bill, the guide to ${h.a('cartelle-esattoriali', 'Italian tax bills')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
});
