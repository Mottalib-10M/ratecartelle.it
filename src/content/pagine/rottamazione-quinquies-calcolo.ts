import { defineGuide } from '../../lib/guide-types';

export default defineGuide({
  id: 'rottamazione-quinquies-calcolo',
  group: 'quinquies',
  order: 7,
  tool: 'risparmio',
  outil: { tipi: ['imposte', 'inps', 'multa_stato'], defaultTipo: 'imposte', defaultVoci: { capitale: 12000, sanzioni: 3600, interessi: 900, mora: 1500, aggio: 0, spese: 18 }, defaultRate: 54 },
  related: ['rottamazione-quinquies-rate', 'rottamazione-cartelle', 'rottamazione-quinquies-decadenza', 'rateizzazione-cartelle', 'rottamazione-contributi-inps'],
  sources: ['l199', 'faqQuinquies', 'aderQuinquiesComunicazione', 'dpr602'],
  it: {
    slug: 'rottamazione-quinquies-calcolo',
    nav: 'Calcolo dalla cartella',
    card: 'Dalla cartella alla rata: somme dovute, interessi del 3% e numero di rate, con il confronto fra 9 e 54 rate.',
    title: 'Rottamazione quinquies calcolo: dalla cartella alla rata',
    description: 'Calcolo della rottamazione quinquies dalla cartella: somme dovute senza sanzioni e interessi, rata con il 3% dal 1° agosto 2026, costo di 54 rate o di poche.',
    h1: 'Calcolo della rottamazione-quinquies: dalla cartella alla rata',
    intro: 'Parti dalle voci della cartella: il calcolo trova le somme dovute con la quinquies, poi le divide nel numero di rate che scegli e mostra quanto pesano gli interessi del 3% annuo.',
    resume: (h) => {
      const r = h.M.risparmio('imposte', { capitale: 12000, sanzioni: 3600, interessi: 900, mora: 1500, aggio: 0, spese: 18 });
      const p54 = h.M.piano('quinquies', r.dovuto, 54);
      const p9 = h.M.piano('quinquies', r.dovuto, 9);
      return `Il calcolo della rottamazione-quinquies si fa in due passaggi. Il primo toglie dalla cartella ciò che il comma 82 della legge n. 199 del 2025 cancella: sanzioni, interessi iscritti a ruolo, interessi di mora e aggio. Restano il capitale e le spese di notifica e di procedura, cioè le somme dovute. Il secondo passaggio divide le somme dovute nel numero di rate scelto, fino a ${h.num(h.P.quinquies.max_rate)} rate bimestrali dal ${h.date(h.P.quinquies.dates[0])} al ${h.date(h.P.quinquies.dates[53])}, con gli interessi del ${h.pct(h.P.quinquies.interesse, 0)} annuo dal ${h.date(h.P.quinquies.interessi_dal)}; ogni rata deve essere di almeno ${h.eur(h.P.quinquies.rata_minima)}. Esempio: una cartella con ${h.eur(12000)} di imposta, ${h.eur(3600)} di sanzioni, ${h.eur(900)} di interessi, ${h.eur(1500)} di mora e ${h.eur(18)} di spese porta a ${h.eur(r.dovuto)} di somme dovute. In ${h.num(54)} rate la stima è di ${h.eur(p54.rate[0].importo, 2)} a rata, con ${h.eur(p54.interessi)} di interessi in tutto; in ${h.num(9)} rate si pagano ${h.eur(p9.rate[0].importo, 2)} a rata e ${h.eur(p9.interessi)} di interessi. Il dato ufficiale resta quello della Comunicazione delle somme dovute.`;
    },
    faqs: (h) => [
      { q: 'Perché la mia Comunicazione dice una cifra diversa dal calcolo?', a: 'Il calcolo parte dalle voci che inserisci, mentre la Comunicazione considera i versamenti già fatti sui singoli carichi, le spese effettive delle procedure e il metodo di calcolo degli interessi dell’Agente. Piccole differenze sono normali; se la differenza è grande, controlla che le voci copiate siano aggiornate e riferite agli stessi carichi.' },
      { q: 'Conviene pagare più rate e tenere i soldi investiti?', a: `Il ${h.pct(h.P.quinquies.interesse, 0)} semplice sul residuo è un costo basso rispetto agli interessi di mora o a quelli della rateizzazione ordinaria, quindi un piano lungo può avere senso. Va però considerato il rischio: più rate significa più scadenze da rispettare e nove anni in cui due rate saltate fanno perdere tutto. Il confronto qui sopra mostra il costo esatto.` },
      { q: 'Il calcolo vale anche per i debiti dei comuni?', a: 'Lo schema è lo stesso, ma la quinquies degli enti territoriali ha date proprie: la prima rata è il 31 marzo 2027 e gli interessi del 3% partono dal 1° aprile 2027. Per quei debiti usa il calendario della pagina dedicata ai comuni e alle regioni, che applica le scadenze dell’articolo 10-quinquies.' },
    ],
    body: (h) => {
      const rows = [1, 3, 9, 18, 36, 54].map((n) => { const p = h.M.piano('quinquies', 10000, n); return [h.num(n), h.eur(p.rate[0].importo, 2), h.eur(p.interessi), h.date(p.ultima)]; });
      return `<h2>Quanto costano le rate</h2>
${h.table(['Rate', 'Prima rata', 'Interessi totali', 'Ultima scadenza'], rows, 'Stima su 10.000 euro di somme dovute, interessi del 3% dal 1° agosto 2026', ['l', 'r', 'r', 'l'])}
<p>Gli interessi crescono quasi in proporzione alla durata, perché il ${h.src('l199', 'comma 83')} li applica al residuo per tutto il periodo. La stima usa interessi semplici calcolati per periodo e una rata costante, con l’ultima che chiude il conto; il metodo è descritto nella pagina sui numeri. La ${h.src('aderQuinquiesComunicazione', 'Comunicazione delle somme dovute')} riporta gli importi ufficiali di ogni rata.</p>
<!--mini:interessi-->
<h2>Dopo il calcolo</h2>
<p>Le ${h.src('faqQuinquies', 'FAQ ufficiali')} chiariscono che, se le rate scendono sotto i 100 euro, il numero viene ridotto d’ufficio fino a rispettare la soglia. Per vedere ogni scadenza con il suo importo usa il ${h.a('rottamazione-quinquies-rate', 'piano delle rate')}; per capire cosa succede con un pagamento saltato, la verifica ${h.a('rottamazione-quinquies-decadenza', 'Sono decaduto?')}. Testi riletti il ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
  en: {
    slug: 'rottamazione-quinquies-calculation',
    nav: 'Calculation from the bill',
    card: 'From the bill to the instalment: sum due, 3% interest and number of instalments, comparing 9 with 54.',
    title: 'Rottamazione quinquies calculation: from bill to instalment',
    description: 'Rottamazione quinquies calculation from the bill: sum due without penalties and interest, instalment with 3% from 1 August 2026, cost of 54 instalments or few.',
    h1: 'Rottamazione-quinquies calculation: from the bill to the instalment',
    intro: 'Start from the items on the bill: the calculation finds the sum due under the quinquies, then splits it into the number of instalments you choose and shows the weight of the 3% annual interest.',
    resume: (h) => {
      const r = h.M.risparmio('imposte', { capitale: 12000, sanzioni: 3600, interessi: 900, mora: 1500, aggio: 0, spese: 18 });
      const p54 = h.M.piano('quinquies', r.dovuto, 54);
      const p9 = h.M.piano('quinquies', r.dovuto, 9);
      return `The rottamazione-quinquies calculation takes two steps. The first removes from the bill what paragraph 82 of Italian Law 199 of 2025 writes off: penalties, interest on the roll, late interest and the collection fee. What remains is the principal plus service and enforcement costs, the sum due. The second step splits the sum due into the chosen number of instalments, up to ${h.num(h.P.quinquies.max_rate)} two-monthly instalments from ${h.date(h.P.quinquies.dates[0])} to ${h.date(h.P.quinquies.dates[53])}, with interest at ${h.pct(h.P.quinquies.interesse, 0)} a year from ${h.date(h.P.quinquies.interessi_dal)}; each instalment must be at least ${h.eur(h.P.quinquies.rata_minima)}. Example: a bill with ${h.eur(12000)} of tax, ${h.eur(3600)} of penalties, ${h.eur(900)} of interest, ${h.eur(1500)} of late interest and ${h.eur(18)} of costs leads to a sum due of ${h.eur(r.dovuto)}. In ${h.num(54)} instalments the estimate is ${h.eur(p54.rate[0].importo, 2)} each, with ${h.eur(p54.interessi)} of interest overall; in ${h.num(9)} instalments you pay ${h.eur(p9.rate[0].importo, 2)} each and ${h.eur(p9.interessi)} of interest. The official figure remains the one in the statement of sums due.`;
    },
    faqs: (h) => [
      { q: 'Why does my statement show a different figure from the calculation?', a: 'The calculation starts from the items you enter, while the statement takes into account payments already made on each debt, actual enforcement costs and the agency’s own interest method. Small differences are normal; if the gap is large, check that the items you copied are up to date and refer to the same debts.' },
      { q: 'Is it worth paying more instalments and keeping the money invested?', a: `Simple interest of ${h.pct(h.P.quinquies.interesse, 0)} on the balance is a low cost compared with late interest or ordinary instalment plan interest, so a long plan can make sense. The risk counts too: more instalments means more due dates to meet and nine years in which two missed instalments lose everything. The comparison above shows the exact cost.` },
      { q: 'Does the calculation also work for council debts?', a: 'The method is the same, but the local-authority quinquies has its own dates: the first instalment is on 31 March 2027 and the 3% interest starts on 1 April 2027. For those debts use the calendar on the comuni and regions page, which applies the due dates of article 10-quinquies.' },
    ],
    body: (h) => {
      const rows = [1, 3, 9, 18, 36, 54].map((n) => { const p = h.M.piano('quinquies', 10000, n); return [h.num(n), h.eur(p.rate[0].importo, 2), h.eur(p.interessi), h.date(p.ultima)]; });
      return `<h2>What instalments cost</h2>
${h.table(['Instalments', 'First instalment', 'Total interest', 'Last due date'], rows, 'Estimate on 10,000 euros due, 3% interest from 1 August 2026', ['l', 'r', 'r', 'l'])}
<p>Interest grows almost in line with the length of the plan, because ${h.src('l199', 'paragraph 83')} applies it to the balance for the whole period. The estimate uses simple interest worked out per period and a constant instalment, with the last one closing the account; the method is described on the figures page. The ${h.src('aderQuinquiesComunicazione', 'statement of sums due')} gives the official amount of each instalment.</p>
<!--mini:interessi-->
<h2>After the calculation</h2>
<p>The ${h.src('faqQuinquies', 'official FAQs')} make clear that if instalments drop below 100 euros, their number is cut automatically until the threshold is met. To see every due date with its amount use the ${h.a('rottamazione-quinquies-rate', 'instalment plan')}; to see what happens after a missed payment, the ${h.a('rottamazione-quinquies-decadenza', 'Have I lapsed?')} check. Texts reread on ${h.date(h.P.retrieved_at)}.</p>`;
    },
  },
});
