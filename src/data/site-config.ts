/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://ratecartelle.it";
export const SITE_NAMES: Record<string, string> = {"it": "Rate Cartelle", "en": "Rate Cartelle"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Cartelle";
export const LANG_TAGS: Record<string, string> = {"it": "it-IT", "en": "en-IT"};
export const OG_LOCALES: Record<string, string> = {"it": "it_IT", "en": "en_GB"};
export const LOCALE_TAG = 'it-IT';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
/** Une locale par langue (RECETTE §4) : virgule décimale en italien, point en anglais. */
export const LOCALE_BY_LANG: Record<string, string> = { it: 'it-IT', en: 'en-GB' };
export const LAST_UPDATED = '2026-10-26';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"it": "Editore di strumenti indipendenti sulla definizione agevolata delle cartelle: calendario delle rate, verifica della decadenza e calcolo del risparmio", "en": "Publisher of independent tools on Italy's settlement of tax-collection debts: instalment calendar, lapse check and savings calculator"};
export const AUTHOR_DESC: Record<string, string> = {"it": "Radif Partners legge i commi da 82 a 101 della legge n. 199 del 2025, l'art. 10-quinquies del decreto-legge n. 38 del 2026, i commi da 231 a 252 della legge n. 197 del 2022 e le FAQ dell'Agenzia delle entrate-Riscossione, e ne ricava strumenti che girano interamente nel browser: date e importi delle rate, controllo delle rate saltate, somme cancellate e somme dovute. Radif Partners non è l'Agente della riscossione, non è un commercialista e non dà consulenza fiscale.", "en": "Radif Partners reads paragraphs 82 to 101 of Italian Law 199/2025, article 10-quinquies of Decree-Law 38/2026, paragraphs 231 to 252 of Law 197/2022 and the FAQs of Agenzia delle entrate-Riscossione, and turns them into tools that run entirely in your browser: instalment dates and amounts, a check of missed instalments, and what is written off against what you still owe. It is not the collection agency or a tax adviser and gives no tax advice."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"it": ["Rottamazione-quinquies (legge n. 199/2025, commi 82-101)", "Rottamazione-quinquies dei carichi di regioni e comuni (art. 10-quinquies DL 38/2026)", "Rottamazione-quater e riammissione (legge n. 197/2022, DL 202/2024)", "Decadenza dalla definizione agevolata", "Rateizzazione delle cartelle (art. 19 DPR 602/1973)", "Cartelle esattoriali e carichi affidati all'Agente della riscossione"], "en": ["Italy's rottamazione-quinquies tax-debt settlement", "The settlement of regional and municipal debts (Decree-Law 38/2026)", "Rottamazione-quater and its readmission", "Losing the benefit of an Italian debt settlement", "Ordinary instalment plans for Italian tax bills", "Italian tax-collection notices (cartelle)"]};
export const CONTACT_EMAIL = "contatti@ratecartelle.it";
export const THEME_COLOR = '#9F1D35';
export const LOGO_SYMBOL = 'DA';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-E4X507Y1L6';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z3rhai8y3f';
export const INDEXNOW_KEY = 'ddf14c6db8a664ca4f088ac55f5e74b6';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',  // vide : publication à titre personnel, pas de société
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "Partita IVA / TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
