import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'cartelle-esattoriali',
  group: 'cartelle',
  order: 5,
  tool: 'ammissibilita',
  outil: { defaultEnte: 'ade_dichiarazione', defaultAnno: 2024, defaultPrecedente: 'nessuna' },
  related: ['estratto-di-ruolo', 'rottamazione-cartelle', 'rateizzazione-cartelle', 'definizione-agevolata', 'rottamazione-sexies'],
  sources: ['aderCartella', 'dpr602', 'l234', 'l199'],
  it: {
    slug: 'cartelle-esattoriali',
    nav: 'Cartelle esattoriali',
    card: 'Cartella appena arrivata: 60 giorni per pagare, cosa contiene e quale definizione la può coprire.',
    title: 'Cartelle esattoriali: 60 giorni, voci e definizioni 2026',
    description: 'Cartelle esattoriali nel 2026: i 60 giorni per pagare senza mora, come leggere le voci e quando la cartella rientra in una definizione agevolata o no.',
    h1: 'Cartelle esattoriali: cosa fare quando arriva una cartella',
    intro: 'Indica chi è il creditore e l’anno in cui il debito è stato affidato all’Agente della riscossione: la verifica dice se la cartella rientra in una definizione agevolata o se la strada è un’altra.',
    resume: (h) => `La cartella di pagamento è l’atto con cui l’Agente della riscossione chiede un debito iscritto a ruolo da un ente creditore: Agenzia delle entrate, INPS, prefetture, comuni, regioni o altri enti. Dalla notifica ci sono ${h.num(h.P.pagamento_cartella_giorni)} giorni per pagare, chiedere una rateizzazione o presentare ricorso; dopo, sul solo importo dell’imposta maturano gli interessi di mora dell’articolo 30 del DPR n. 602 del 1973 e l’Agente può avviare fermi, ipoteche o pignoramenti. Ogni cartella contiene uno o più ruoli, ciascuno con imposta o contributo, sanzioni, interessi e spese di notifica; per i carichi affidati prima del ${h.date(h.P.aggio_abolito_dal)} compare anche l’aggio. Le definizioni agevolate in vigore riguardano solo i carichi affidati fino al ${h.date(h.P.quinquies.carichi_al)}: una cartella notificata nel 2026 per un debito affidato nel 2024 o nel 2025 non rientra nella quinquies, e oggi nessun testo di legge la copre. Per quelle cartelle le strade sono il pagamento entro i sessanta giorni, la rateizzazione ordinaria fino a 84 rate o il ricorso, se ci sono motivi. La data di affidamento si legge nell’estratto di ruolo.`,
    faqs: (h) => [
      { q: 'Una cartella notificata nel 2026 può entrare nella quinquies?', a: `Solo se il carico è stato affidato all’Agente entro il ${h.date(h.P.quinquies.carichi_al)}, cosa che capita quando la notifica arriva molto dopo l’affidamento. Conta la data di affidamento, non quella di notifica: la trovi nell’estratto di ruolo. Inoltre la domanda per i debiti statali si è chiusa il ${h.date(h.P.quinquies.domanda_entro)}.` },
      { q: 'Entro quanto tempo va contestata una cartella?', a: 'Dipende dal motivo e dal tipo di debito: per le imposte il ricorso va al giudice tributario entro sessanta giorni dalla notifica, per i contributi INPS e per le multe valgono termini e giudici diversi. Un ricorso non sospende il pagamento da solo: serve una richiesta di sospensione. È una scelta da fare con un professionista.' },
      { q: 'Se non pago la cartella cosa può succedere?', a: 'Dopo i sessanta giorni l’Agente può mandare un preavviso di fermo dell’auto o di ipoteca e poi procedere con il fermo, l’ipoteca sopra certe soglie o il pignoramento di stipendio, pensione o conto. Una richiesta di rateizzazione presentata in tempo blocca le nuove azioni finché le rate sono pagate.' },
    ],
    body: (h) => `<h2>Le voci della cartella</h2>
${h.table(['Voce', 'Cosa è', 'Con la quinquies'], [
  ['Imposta o contributo', 'Il debito originario', 'si paga'],
  ['Sanzioni', 'Per il mancato o tardivo pagamento', 'cancellate'],
  ['Interessi', 'Calcolati dall’ente fino all’iscrizione a ruolo', 'cancellati'],
  ['Interessi di mora', 'Dopo i 60 giorni dalla notifica', 'cancellati'],
  ['Aggio', 'Solo carichi affidati prima del 2022', 'cancellato'],
  ['Diritti di notifica', 'Costo della notifica', 'si pagano'],
], 'Come leggere una cartella (art. 25 e 30 DPR 602/1973; comma 82 L. 199/2025)', ['l', 'l', 'l'])}
<p>Le ${h.src('aderCartella', 'pagine ufficiali sulla cartella')} spiegano come pagarla e come richiederne una copia. L’aggio è stato abolito per i carichi affidati dal 2022 dalla ${h.src('l234', 'legge n. 234 del 2021')}.</p>
<!--mini:cartella-->
<h2>Quale strada scegliere</h2>
<p>Se la cartella è vecchia e rientra nella quinquies, la ${h.a('rottamazione-cartelle', 'simulazione voce per voce')} mostra quanto si cancella. Se è recente, il confronto fra le rate possibili è nella pagina sulla ${h.a('rateizzazione-cartelle', 'rateizzazione')}. Per conoscere date di affidamento e importi aggiornati di tutte le cartelle a tuo nome serve l’${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'italian-tax-bills',
    nav: 'Italian tax bills',
    card: 'A tax bill has just arrived: 60 days to pay, what it contains and which settlement may cover it.',
    title: 'Cartelle esattoriali: 60 days, bill items and settlements',
    description: 'Cartelle esattoriali, Italian tax bills: the 60 days to pay without late interest, how to read the items, and when a bill falls within a settlement today.',
    h1: 'Italian tax bills: what to do when a cartella arrives',
    intro: 'Say who the creditor is and the year the debt was passed to the collection agency: the check says whether the bill falls within a settlement or whether another route applies.',
    resume: (h) => `The cartella di pagamento is the document the Italian collection agency uses to claim a debt entered on the roll by a creditor body: the Revenue Agency, INPS, prefetture, comuni, regions or other bodies. From service you have ${h.num(h.P.pagamento_cartella_giorni)} days to pay, request an instalment plan or appeal; after that, late interest under article 30 of Presidential Decree 602 of 1973 builds up on the tax amount alone and the agency can start vehicle liens, mortgages or seizures. Each bill holds one or more rolls, each with tax or contribution, penalties, interest and service fees; for debts passed on before ${h.date(h.P.aggio_abolito_dal)} the collection fee also appears. The settlements in force only cover debts passed on up to ${h.date(h.P.quinquies.carichi_al)}: a bill served in 2026 for a debt passed on in 2024 or 2025 is outside the quinquies, and no law text covers it today. For those bills the routes are paying within the sixty days, the ordinary instalment plan of up to 84 instalments, or an appeal where there are grounds. The date passed on is shown in the estratto di ruolo.`,
    faqs: (h) => [
      { q: 'Can a bill served in 2026 enter the quinquies?', a: `Only if the debt was passed to the agency by ${h.date(h.P.quinquies.carichi_al)}, which happens when service comes long after the hand-over. What counts is the hand-over date, not the service date: you find it in the estratto di ruolo. Besides, applications for State debts closed on ${h.date(h.P.quinquies.domanda_entro)}.` },
      { q: 'How long do I have to challenge a bill?', a: 'It depends on the grounds and the type of debt: for taxes the appeal goes to the tax court within sixty days of service, while INPS contributions and fines have different deadlines and courts. An appeal does not suspend payment by itself: a suspension request is needed. It is a choice to make with a professional.' },
      { q: 'What can happen if I do not pay the bill?', a: 'After the sixty days the agency can send a notice of vehicle lien or mortgage and then proceed with the lien, a mortgage above certain thresholds, or seizure of salary, pension or account. An instalment request filed in time blocks new actions as long as instalments are paid.' },
    ],
    body: (h) => `<h2>The items on the bill</h2>
${h.table(['Item', 'What it is', 'Under the quinquies'], [
  ['Tax or contribution', 'The original debt', 'paid'],
  ['Penalties', 'For non-payment or late payment', 'written off'],
  ['Interest', 'Worked out by the creditor up to the roll', 'written off'],
  ['Late interest', 'After 60 days from service', 'written off'],
  ['Collection fee', 'Only debts passed on before 2022', 'written off'],
  ['Service fees', 'Cost of serving the bill', 'paid'],
], 'How to read a tax bill (art. 25 and 30 DPR 602/1973; paragraph 82, Law 199/2025)', ['l', 'l', 'l'])}
<p>The ${h.src('aderCartella', 'official pages on the bill')} explain how to pay it and how to request a copy. The collection fee was abolished for debts passed on from 2022 by ${h.src('l234', 'Law 234 of 2021')}.</p>
<!--mini:cartella-->
<h2>Which route to choose</h2>
<p>If the bill is old and falls within the quinquies, the ${h.a('rottamazione-cartelle', 'item-by-item simulation')} shows what comes off. If it is recent, the comparison of possible instalments is on the ${h.a('rateizzazione-cartelle', 'instalment plan')} page. To know the hand-over dates and updated amounts of every bill in your name you need the ${h.a('estratto-di-ruolo', 'estratto di ruolo')}. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
