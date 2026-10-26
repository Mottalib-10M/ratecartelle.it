import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-multe',
  group: 'cartelle',
  order: 3,
  tool: 'risparmio',
  outil: { tipi: ['multa_stato', 'ente_multa'], defaultTipo: 'multa_stato', defaultVoci: { capitale: 0, sanzioni: 420, interessi: 260, mora: 35, aggio: 30, spese: 9 }, defaultRate: 10 },
  related: ['rottamazione-quinquies-comuni-regioni', 'rottamazione-cartelle', 'cartelle-esattoriali', 'saldo-e-stralcio', 'definizione-agevolata'],
  sources: ['l199', 'dl38', 'faqEnti', 'faqQuinquies', 'elencoEnti'],
  it: {
    slug: 'rottamazione-multe',
    nav: 'Multe in cartella',
    card: 'Multe stradali in cartella: con la rottamazione resta la sanzione, cadono maggiorazioni, interessi e aggio.',
    title: 'Rottamazione multe 2026: cosa si cancella dalla cartella',
    description: 'Rottamazione delle multe stradali in cartella: la sanzione resta, cadono maggiorazioni, interessi e aggio. Prefettura o comune, calcola quanto paghi oggi.',
    h1: 'Multe stradali in cartella: quanto si paga con la rottamazione',
    intro: 'Indica chi ha emesso la multa e scrivi le voci della cartella: il calcolo lascia la sanzione, toglie maggiorazioni, interessi e aggio, e dà l’importo con le rate.',
    resume: (h) => {
      const r = h.M.risparmio('multa_stato', { capitale: 0, sanzioni: 420, interessi: 260, mora: 35, aggio: 30, spese: 9 });
      return `Per le multe stradali la definizione agevolata cancella molto meno che per le imposte. Il comma 97 dell’articolo 1 della legge n. 199 del 2025 dice che per le sanzioni del codice della strada irrogate dalle amministrazioni dello Stato, come prefetture, Polizia stradale e Carabinieri, la quinquies si applica solo agli interessi comunque denominati, comprese le maggiorazioni dell’articolo 27, sesto comma, della legge n. 689 del 1981, agli interessi di mora e all’aggio. La sanzione resta dovuta per intero, insieme alle spese di notifica. Per le multe dei vigili urbani e degli altri enti locali vale la stessa regola, ma solo se il comune ha aderito alla quinquies degli enti territoriali dell’articolo 10-quinquies del decreto-legge n. 38 del 2026 e la riscossione è affidata all’Agente: la domanda è aperta fino al ${h.date(h.P.enti.domanda_entro)}. Esempio: una multa di ${h.eur(420)} cresciuta con ${h.eur(260)} di maggiorazioni, ${h.eur(35)} di mora, ${h.eur(30)} di aggio e ${h.eur(9)} di spese scende a ${h.eur(r.dovuto)}, con ${h.eur(r.cancellato)} cancellati. Le maggiorazioni del 10% ogni sei mesi sono spesso la voce più pesante delle vecchie multe.`;
    },
    faqs: (h) => [
      { q: 'La maggiorazione semestrale della multa si cancella?', a: 'Sì. L’articolo 27, sesto comma, della legge n. 689 del 1981 aumenta la sanzione non pagata di un decimo per ogni semestre, fino al triplo, e la legge della quinquies la tratta come interesse. Per questo una vecchia multa può dimezzarsi: la sanzione originaria resta, le maggiorazioni accumulate negli anni spariscono.' },
      { q: 'Una multa presa a Milano rientra nella quinquies degli enti?', a: `Dipende da due condizioni: che il comune compaia nell’elenco degli enti aderenti, aggiornato dall’Agente della riscossione al ${h.date(h.P.enti.elenco.aggiornato)}, e che la multa sia stata affidata all’Agente tra il 2000 e il 2023. Le multe riscosse direttamente dal comune o da un concessionario privato restano fuori da questa definizione.` },
      { q: 'Posso contestare la multa e chiedere la rottamazione insieme?', a: 'Nella domanda ti impegni a rinunciare ai giudizi in corso sui carichi inseriti, quindi le due strade non si sommano. Se il ricorso ha buone possibilità, per esempio per una notifica tardiva o una prescrizione già maturata, conviene valutarlo con un professionista prima di presentare la domanda.' },
    ],
    body: (h) => `<h2>Prefettura o comune</h2>
${h.table(['Chi ha emesso la multa', 'Definizione', 'Domanda'], [
  ['Prefettura, Polizia stradale, Carabinieri', 'Quinquies (comma 97 L. 199/2025)', `chiusa il ${h.date(h.P.quinquies.domanda_entro)}`],
  ['Comune o regione aderente, tramite l’Agente', 'Quinquies degli enti (art. 10-quinquies DL 38/2026)', `aperta fino al ${h.date(h.P.enti.domanda_entro)}`],
  ['Comune con riscossione propria o concessionario', 'Nessuna di queste', '–'],
], 'Quale definizione si applica alle multe stradali', ['l', 'l', 'l'])}
<p>Le ${h.src('faqEnti', 'FAQ sulla quinquies degli enti')} confermano che per le sanzioni amministrative, comprese quelle del codice della strada, si cancellano solo interessi e aggio. L’${h.src('elencoEnti', 'elenco degli enti aderenti')} è pubblicato dall’Agente; i dettagli del calendario sono nella pagina sulla ${h.a('rottamazione-quinquies-comuni-regioni', 'quinquies di comuni e regioni')}.</p>
<!--mini:multa-->
<h2>Vecchie multe e stralcio</h2>
<p>Le multe affidate tra il 2000 e il 2015 con un residuo fino a 1.000 euro possono essere già state toccate dallo ${h.a('saldo-e-stralcio', 'stralcio del 2023')}: per quelle delle prefetture l’annullamento è stato totale, per quelle di comuni e regioni ha riguardato solo gli interessi, salvo che l’ente si sia opposto o abbia scelto di annullare tutto. Prima di aderire controlla quindi l’importo aggiornato nell’area riservata o nell’${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'rottamazione-traffic-fines',
    nav: 'Fines on a tax bill',
    card: 'Traffic fines on a tax bill: under the rottamazione the fine stays, surcharges, interest and fee go.',
    title: 'Rottamazione multe 2026: what comes off a traffic fine',
    description: 'Rottamazione of traffic fines on an Italian tax bill: the fine stays, six-monthly surcharges, interest and fee go. Prefettura or comune, see what you pay.',
    h1: 'Traffic fines on a tax bill: what you pay under the rottamazione',
    intro: 'Say who issued the fine and enter the items on the bill: the calculation keeps the fine, removes surcharges, interest and fee, and gives the amount with instalments.',
    resume: (h) => {
      const r = h.M.risparmio('multa_stato', { capitale: 0, sanzioni: 420, interessi: 260, mora: 35, aggio: 30, spese: 9 });
      return `For traffic fines the Italian settlement writes off far less than for taxes. Paragraph 97 of article 1 of Law 199 of 2025 says that for highway code penalties imposed by State administrations, such as prefetture, the traffic police and the Carabinieri, the quinquies only applies to interest however named, including the surcharges of article 27, sixth paragraph, of Law 689 of 1981, to late interest and to the collection fee. The fine itself stays due in full, along with service costs. For fines from municipal police and other local authorities the same rule applies, but only if the comune has joined the local-authority quinquies of article 10-quinquies of Decree-Law 38 of 2026 and collection is handled by the national agency: applications are open until ${h.date(h.P.enti.domanda_entro)}. Example: a ${h.eur(420)} fine grown with ${h.eur(260)} of surcharges, ${h.eur(35)} of late interest, ${h.eur(30)} of fee and ${h.eur(9)} of costs comes down to ${h.eur(r.dovuto)}, with ${h.eur(r.cancellato)} written off. The 10% surcharge every six months is often the heaviest item on old fines.`;
    },
    faqs: (h) => [
      { q: 'Is the six-monthly surcharge on the fine written off?', a: 'Yes. Article 27, sixth paragraph, of Law 689 of 1981 raises an unpaid penalty by a tenth for each six months, up to three times, and the quinquies law treats it as interest. That is why an old fine can halve: the original penalty stays, the surcharges built up over the years disappear.' },
      { q: 'Does a fine received in Milan fall under the local-authority quinquies?', a: `It depends on two conditions: that the comune is on the list of participating authorities, updated by the collection agency on ${h.date(h.P.enti.elenco.aggiornato)}, and that the fine was passed to the agency between 2000 and 2023. Fines collected directly by the comune or by a private concessionaire are outside this settlement.` },
      { q: 'Can I challenge the fine and apply for the rottamazione together?', a: 'In the application you undertake to drop pending court cases on the debts included, so the two routes do not add up. If the appeal has good chances, for example for late service or a time bar already reached, it is worth weighing it with a professional before applying.' },
    ],
    body: (h) => `<h2>Prefettura or comune</h2>
${h.table(['Who issued the fine', 'Settlement', 'Application'], [
  ['Prefettura, traffic police, Carabinieri', 'Quinquies (paragraph 97, Law 199/2025)', `closed on ${h.date(h.P.quinquies.domanda_entro)}`],
  ['Participating comune or region, via the agency', 'Local-authority quinquies (art. 10-quinquies DL 38/2026)', `open until ${h.date(h.P.enti.domanda_entro)}`],
  ['Comune collecting itself or via a concessionaire', 'Neither of these', '–'],
], 'Which settlement applies to traffic fines', ['l', 'l', 'l'])}
<p>The ${h.src('faqEnti', 'FAQs on the local-authority quinquies')} confirm that for administrative penalties, including highway code ones, only interest and fee are written off. The ${h.src('elencoEnti', 'list of participating authorities')} is published by the agency; calendar details are on the ${h.a('rottamazione-quinquies-comuni-regioni', 'comuni and regions quinquies')} page.</p>
<!--mini:multa-->
<h2>Old fines and the write-off</h2>
<p>Fines passed on between 2000 and 2015 with a balance up to 1,000 euros may already have been touched by the ${h.a('saldo-e-stralcio', '2023 write-off')}: for prefettura fines the cancellation was total, for those of comuni and regions it covered interest only, unless the authority opted out or chose to cancel everything. Before applying, check the updated amount in the reserved area or in the ${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
