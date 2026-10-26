import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, SITE_NAMES, AUTHOR_NAME } from '../data/site-config';
import { P } from '../lib/engine/params';

/** llms.txt (RECETTE §21) : le site, ses données et ses pages, généré au build depuis le registre des pages. */
export const GET: APIRoute = () => {
  const u = (p: string) => SITE_URL + p;
  const lines = [
    `# ${SITE_NAMES.it}`,
    '',
    `> Strumenti indipendenti sulla definizione agevolata delle cartelle italiane pubblicati da ${AUTHOR_NAME}: calendario personale delle rate della rottamazione-quinquies (legge n. 199/2025), della quinquies dei carichi di regioni ed enti locali (art. 10-quinquies DL 38/2026), della rottamazione-quater (legge n. 197/2022) e della riammissione (DL 202/2024), ultimo giorno utile con la tolleranza di 5 giorni, verifica della decadenza, somme cancellate e somme dovute, confronto con la rateizzazione ordinaria. Importi stimati, calcolati nel browser. Sito non ufficiale, non è Agenzia delle entrate-Riscossione. Italiano e inglese.`,
    '',
    '## Fonti',
    '',
    `- Legge 30 dicembre 2025, n. 199, art. 1, commi 82-110; DL 38/2026 art. 10-quinquies (L. 88/2026, L. 113/2026); legge 197/2022, commi 222-252; DL 202/2024 art. 3-bis; DPR 602/1973. Testi riletti il ${P.retrieved_at}.`,
    '- FAQ pubbliche di Agenzia delle entrate-Riscossione (rottamazione-quinquies, 18/09/2026; enti territoriali, 15/10/2026).',
    `- Metodo e fonti: ${u(route('method', 'it'))}`,
    '',
    '## Pagine (italiano)',
    '',
    `- [${SITE_NAMES.it}](${u(route('home', 'it'))})`,
    ...PAGES.map((p) => `- [${p.it.h1}](${u(route(p.id, 'it'))}): ${p.it.description}`),
    '',
    '## Pages (English)',
    '',
    `- [Home](${u(route('home', 'en'))})`,
    ...PAGES.map((p) => `- [${p.en.h1}](${u(route(p.id, 'en'))}): ${p.en.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
