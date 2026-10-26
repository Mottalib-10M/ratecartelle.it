import type { Locale } from './routes';
const it = {
  updatedOn: 'Aggiornato il', editorialPolicy: 'Politica editoriale', contactLabel: 'Contatti', reviewedBy: 'Verificato da',
  skipToContent: 'Vai al contenuto', mainNav: 'Navigazione principale', breadcrumbLabel: 'Percorso', breadcrumbHome: 'Home', menuOpen: 'Apri il menu',
  faqTitle: 'Domande frequenti', relatedCalculators: 'Pagine e calcoli collegati', sourcesTitle: 'Fonti', writtenBy: 'Scritto da',
  asOf: 'Regole in vigore nel', lastUpdated: 'testi riletti il', footerValidated: 'Fonti: Gazzetta Ufficiale, Normattiva e pagine pubbliche di Agenzia delle entrate-Riscossione', footerBrowser: 'Nessun account · nulla di ciò che scrivi viene inviato o conservato · calcolo nel browser · gratis',
  footerDisclaimer: 'Sito indipendente pubblicato da Radif Partners. Non è il sito di Agenzia delle entrate-Riscossione, dell’Agenzia delle entrate, dell’INPS o di un comune, e non vende consulenze, pratiche o prestiti: nessun legame commerciale, nessuna commissione. Gli importi sono stime indicative calcolate dai testi di legge: fa fede solo la Comunicazione delle somme dovute inviata da Agenzia delle entrate-Riscossione.', footerPopular: '', notFound: 'Questa pagina non esiste.',
  readMore: 'Leggi tutto',
};
const en: typeof it = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages and calculations', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Rules in force in', lastUpdated: 'texts reread on', footerValidated: 'Sources: Gazzetta Ufficiale, Normattiva and the public pages of Agenzia delle entrate-Riscossione', footerBrowser: 'No account · nothing is sent or stored · runs in your browser · free',
  footerDisclaimer: 'Independent site published by Radif Partners. It is not the site of Agenzia delle entrate-Riscossione, the Agenzia delle entrate, INPS or a comune, and it sells no advice, paperwork service or loan: no commercial link, no commission. Amounts are estimates only, worked out from the legal texts: only the statement of sums due sent by Agenzia delle entrate-Riscossione is binding.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : it; }
