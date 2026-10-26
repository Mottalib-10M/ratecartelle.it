# Ajouter ou modifier une page de IT Definizione Agevolata (it-definizione-agevolata)

À lire avec `~/Documents/GitHub/RECETTE-SITE.md` §6 (unicité), §7 (FAQ), §9 (écriture), §9.3
(mini-simulateurs), §11 (titres), §21 (bloc citable). Éditeur : Radif Partners. Le site est indépendant :
il ne se présente jamais comme Agenzia delle entrate-Riscossione, l'Agenzia delle entrate, l'INPS ou une
commune, n'utilise aucun logo officiel, ne propose ni conseil payant, ni prêt, ni formulaire commercial,
et ne reproduit pas les tableaux ni la liste des enti de l'ADER (on cite le fait et on met le lien).

## Une page = un fichier

- `src/content/pagine/<id>.ts`, avec `defineGuide` ; l'id est le nom du fichier. Outil principal dans
  `tool` : `'piano' | 'scadenze' | 'decadenza' | 'risparmio' | 'ammissibilita' | 'rateizzazione' |
  'pagamento'`, réglages dans `outil` (ex. `{ regimi: ['quater'], defaultRate: 18 }`).
- Les deux langues (`it`, `en`) : slug, nav, card, title (50-60 car., terme-clé en tête), description
  (150-160 car.), h1, intro, `resume(h)` (un seul paragraphe d'au moins 120 mots, replié à 3 lignes),
  `faqs(h)` (3 à 5 questions uniques sur tout le site, réponses de 40 à 90 mots), `body(h)`.
- L'accueil (page pilier, calendrier personnel des rate, 7 FAQ) est dans `src/content/home.ts`.
  Pages de service écrites à la main dans `src/pages/it/` et `src/pages/en/`.
- Plafond : 100 pages HTML. Rien sur une « rottamazione-sexies » au-delà de « aucun texte publié » tant
  que `P.sexies.testo_pubblicato` est faux.

## Aucun chiffre en dur

Dates, taux et seuils : `h.P` ; calculs : `h.M` (`piano`, `ultimoGiorno`, `risparmio`, `rateizzazione`…).
Formats : `h.eur`, `h.num`, `h.pct`, `h.date` ; liens internes `h.a(id, texte)`, sources `h.src(clé)`.
Pas de tiret cadratin ; en italien le signe % est collé au nombre.

## Mini-simulateurs

`<!--mini:KIND-->` dans le corps. Disponibles (`src/lib/minis/`) : rata, interessi, prossima, saltate,
taglio, multa, stralcio, cartella, rateizza, copertura, enti, quater, tolleranza, riammissione.

## Contrôles

`npm run check`, plus `python3 scripts/check-regles.py .`, `node scripts/check-contraste.mjs .`,
`node scripts/check-saisie.mjs . --max=60`, `node scripts/check-nombres.mjs .`.
Les contrôles qui lancent Playwright passent sous le verrou `~/Documents/GitHub/.playwright.lock`.
