import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rateizzazione-cartelle',
  group: 'alternative',
  order: 1,
  tool: 'rateizzazione',
  outil: { defaultImporto: 15000, defaultMesi: 84, defaultDefinizione: 9000 },
  related: ['rottamazione-quinquies-decadenza', 'saldo-e-stralcio', 'cartelle-esattoriali', 'rottamazione-contributi-inps', 'rottamazione-sexies'],
  sources: ['dpr602', 'dlgs110', 'aderRate', 'aderRateDecadenza', 'aderRateTassi'],
  it: {
    slug: 'rateizzazione-cartelle',
    nav: 'Rateizzazione o rottamazione',
    card: 'Rateizzazione ordinaria fino a 84 rate nel 2026 contro definizione agevolata: rata, interessi e costo totale.',
    title: 'Rateizzazione cartelle 2026: 84 rate o rottamazione?',
    description: 'Rateizzazione delle cartelle 2026: fino a 84 rate a semplice richiesta sotto 120.000 euro, 120 con documenti, decadenza a 8 rate, confronto con la rottamazione.',
    h1: 'Rateizzazione delle cartelle o rottamazione: quale costa meno',
    intro: 'Scrivi il debito totale della cartella, i mesi di dilazione e le somme che pagheresti con una definizione: il confronto mostra rata mensile, interessi e quanto spendi in tutto con le due strade.',
    resume: (h) => {
      const r = h.M.rateizzazione(15000, 84, '2026-10-26');
      return `La rateizzazione ordinaria dell’articolo 19 del DPR n. 602 del 1973 è la strada sempre aperta per pagare a rate le cartelle, anche quando non c’è una definizione agevolata. Dal 2025 il decreto legislativo n. 110 del 2024 ha cambiato le regole: per debiti fino a ${h.eur(h.P.rateizzazione.soglia_semplice)} per ciascuna richiesta basta dichiarare una temporanea difficoltà economica per ottenere fino a ${h.num(84)} rate mensili per le domande del 2025 e del 2026, ${h.num(96)} per quelle del 2027 e del 2028, ${h.num(108)} dal 2029. Documentando la difficoltà si arriva fino a ${h.num(h.P.rateizzazione.documentata_max)} rate; sopra la soglia la documentazione serve sempre. Ogni rata deve essere di almeno ${h.eur(h.P.rateizzazione.rata_minima)}. La differenza con la rottamazione è nel conto: la rateizzazione divide il debito pieno, con sanzioni, interessi di mora e interessi di dilazione, mentre la definizione cancella sanzioni e interessi ma ha date fisse e domande chiuse. Su ${h.eur(15000)} in ${h.num(84)} mesi la rata stimata è di ${h.eur(r.rata, 2)}. Il piano decade dopo ${h.num(8)} rate non pagate, anche non consecutive, per le richieste presentate dal 16 luglio 2022.`;
    },
    faqs: (h) => [
      { q: 'Posso chiedere la rateizzazione mentre aspetto una nuova rottamazione?', a: 'Sì, la rateizzazione si può chiedere in qualsiasi momento e, se arrivasse una nuova definizione, di solito le leggi permettono di inserirvi anche i carichi già rateizzati, sospendendo le vecchie rate fino alla prima scadenza. Nessuna norma però garantisce che ci sarà una nuova definizione, quindi aspettare senza pagare espone a fermi e pignoramenti.' },
      { q: 'Quanto costano gli interessi della rateizzazione?', a: `Sulle somme rateizzate si applicano gli interessi di dilazione, che le pagine ufficiali indicano al ${h.pct(h.P.rateizzazione.tasso_erariale, 1)} annuo per la maggior parte dei carichi e al ${h.pct(h.P.rateizzazione.tasso_inps, 2)} per alcuni crediti previdenziali. Si aggiungono a sanzioni e interessi di mora già maturati, che restano dovuti per intero: per questo una definizione, quando c’è, costa quasi sempre meno.` },
      { q: 'Con la rateizzazione in corso possono pignorarmi lo stipendio?', a: 'Con la richiesta presentata e poi accolta l’Agente della riscossione non avvia nuove procedure esecutive finché le rate sono pagate; il fermo amministrativo e l’ipoteca già iscritti restano, ma il fermo si può sospendere pagando la prima rata. Se il piano decade, le procedure possono ripartire sul debito residuo.' },
    ],
    body: (h) => `<h2>Le regole del 2026</h2>
${h.table(['Richiesta', 'Fino a 120.000 €', 'Oltre 120.000 €'], [
  ['A semplice richiesta (2025-2026)', `fino a ${h.num(84)} rate`, '–'],
  ['Con documenti (2025-2026)', `da ${h.num(85)} a ${h.num(120)} rate`, `fino a ${h.num(120)} rate`],
  ['Domande 2027-2028', `${h.num(96)} semplici, poi fino a ${h.num(120)}`, `fino a ${h.num(120)} rate`],
  ['Domande dal 2029', `${h.num(108)} semplici, poi fino a ${h.num(120)}`, `fino a ${h.num(120)} rate`],
  ['Rata minima', h.eur(h.P.rateizzazione.rata_minima), h.eur(h.P.rateizzazione.rata_minima)],
], 'Numero massimo di rate mensili (art. 19 DPR 602/1973 come modificato dal D.Lgs. 110/2024)', ['l', 'l', 'l'])}
<p>Le regole sono quelle del ${h.src('dlgs110', 'decreto legislativo n. 110 del 2024')} e sono descritte nelle pagine ufficiali sulla ${h.src('aderRate', 'rateizzazione')}. Le richieste presentate fino al 2024 seguono la versione precedente, con al massimo 72 rate semplici.</p>
<!--mini:rateizza-->
<h2>Decadenza e confronto</h2>
<p>Le ${h.src('aderRateDecadenza', 'regole sulla decadenza')} contano le rate non pagate secondo la data della richiesta: ${h.num(18)} per i piani in essere all’8 marzo 2020, ${h.num(10)} per quelli richiesti fino al 2021, ${h.num(5)} dal 1° gennaio al 15 luglio 2022, ${h.num(8)} dal 16 luglio 2022. Dopo la decadenza di un piano richiesto dal 16 luglio 2022 quel carico non può più essere rateizzato. Chi è decaduto dalla quinquies non può rateizzare i carichi persi, come spiega la pagina ${h.a('rottamazione-quinquies-decadenza', 'Sono decaduto?')}; per i piccoli debiti vecchi verifica prima lo ${h.a('saldo-e-stralcio', 'stralcio')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`,
  },
  en: {
    slug: 'cartelle-instalment-plan',
    nav: 'Instalment plan or rottamazione',
    card: 'Ordinary instalment plan up to 84 instalments in 2026 against the settlement: instalment, interest and total cost.',
    title: 'Rateizzazione cartelle 2026: 84 instalments or settlement?',
    description: 'Rateizzazione of Italian tax bills in 2026: up to 84 instalments on request below 120,000 euros, 120 with proof, lapse at 8 missed, against the rottamazione.',
    h1: 'Instalment plan or rottamazione: which costs less',
    intro: 'Enter the total debt on the bill, the months of the plan and what you would pay under a settlement: the comparison shows monthly instalment, interest and total spend on both routes.',
    resume: (h) => {
      const r = h.M.rateizzazione(15000, 84, '2026-10-26');
      return `The ordinary instalment plan of article 19 of Presidential Decree 602 of 1973 is the route always open for paying Italian tax bills in instalments, even when no settlement is available. From 2025 Legislative Decree 110 of 2024 changed the rules: for debts up to ${h.eur(h.P.rateizzazione.soglia_semplice)} per request, declaring temporary financial hardship is enough to obtain up to ${h.num(84)} monthly instalments for applications in 2025 and 2026, ${h.num(96)} for those in 2027 and 2028, ${h.num(108)} from 2029. Proving the hardship takes you up to ${h.num(h.P.rateizzazione.documentata_max)} instalments; above the threshold proof is always required. Each instalment must be at least ${h.eur(h.P.rateizzazione.rata_minima)}. The difference from the rottamazione is in the bill: an instalment plan spreads the full debt, with penalties, late interest and instalment interest, while a settlement writes off penalties and interest but has fixed dates and closed application windows. On ${h.eur(15000)} over ${h.num(84)} months the estimated instalment is ${h.eur(r.rata, 2)}. The plan lapses after ${h.num(8)} unpaid instalments, consecutive or not, for requests filed from 16 July 2022.`;
    },
    faqs: (h) => [
      { q: 'Can I ask for an instalment plan while waiting for a new rottamazione?', a: 'Yes, an instalment plan can be requested at any time and, if a new settlement arrived, laws usually allow debts already in a plan to be included, suspending the old instalments until the first due date. No rule guarantees a new settlement, though, so waiting without paying exposes you to vehicle liens and seizures.' },
      { q: 'How much does instalment interest cost?', a: `Instalment interest applies to the sums spread, which the official pages give as ${h.pct(h.P.rateizzazione.tasso_erariale, 1)} a year for most debts and ${h.pct(h.P.rateizzazione.tasso_inps, 2)} for some social security claims. It comes on top of penalties and late interest already built up, which stay due in full: that is why a settlement, when there is one, almost always costs less.` },
      { q: 'With a plan running, can my salary be seized?', a: 'Once the request is filed and then granted, the collection agency does not start new enforcement as long as instalments are paid; vehicle liens and mortgages already registered stay, but a vehicle lien can be suspended by paying the first instalment. If the plan lapses, enforcement can restart on the remaining debt.' },
    ],
    body: (h) => `<h2>The 2026 rules</h2>
${h.table(['Request', 'Up to €120,000', 'Above €120,000'], [
  ['On simple request (2025-2026)', `up to ${h.num(84)} instalments`, '–'],
  ['With proof (2025-2026)', `${h.num(85)} to ${h.num(120)} instalments`, `up to ${h.num(120)} instalments`],
  ['Applications 2027-2028', `${h.num(96)} on request, then up to ${h.num(120)}`, `up to ${h.num(120)} instalments`],
  ['Applications from 2029', `${h.num(108)} on request, then up to ${h.num(120)}`, `up to ${h.num(120)} instalments`],
  ['Minimum instalment', h.eur(h.P.rateizzazione.rata_minima), h.eur(h.P.rateizzazione.rata_minima)],
], 'Maximum monthly instalments (art. 19 DPR 602/1973 as amended by Legislative Decree 110/2024)', ['l', 'l', 'l'])}
<p>The rules come from ${h.src('dlgs110', 'Legislative Decree 110 of 2024')} and are described on the official pages on the ${h.src('aderRate', 'instalment plan')}. Requests filed up to 2024 follow the previous version, with at most 72 instalments on request.</p>
<!--mini:rateizza-->
<h2>Lapse and comparison</h2>
<p>The ${h.src('aderRateDecadenza', 'lapse rules')} count unpaid instalments according to the request date: ${h.num(18)} for plans running on 8 March 2020, ${h.num(10)} for those requested up to 2021, ${h.num(5)} from 1 January to 15 July 2022, ${h.num(8)} from 16 July 2022. After a plan requested from 16 July 2022 lapses, that debt can no longer be spread. Anyone who lapsed from the quinquies cannot spread the lost debts, as the ${h.a('rottamazione-quinquies-decadenza', 'Have I lapsed?')} page explains; for small old debts, check the ${h.a('saldo-e-stralcio', 'write-off')} first. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
