# Données de IT Definizione Agevolata (it-definizione-agevolata)

Une seule source de chiffres : `src/data/params-2026.json`. Aucune date, aucun taux, aucun seuil n'est
écrit à la main dans une page, un outil ou un mini-simulateur : tout passe par `h.P` (pages) ou par
`P` et le moteur `src/lib/engine/` (outils et minis).

## Contenu du fichier

- `quinquies` : commi 82-101 de l'art. 1 L. 199/2025 (période des charges, 54 dates, 3 % à partir du
  1/8/2026, rata minima 100 € selon la FAQ ADER n. 6 du 18/09/2026, tolérance de 5 jours limitée à
  l'unica et à la dernière rata, comma 95 modifié), date d'unica tenue pour ponctuelle par la FAQ n. 11.
- `enti` : art. 10-quinquies DL 38/2026 (L. 88/2026), dates réécrites par la L. 113/2026, FAQ enti du
  15/10/2026 (unica jusqu'au 5/4/2027, dilazioni revocate au 31/3/2027) ; chiffres de l'elenco des
  enti aderenti (date de la version, nombre de régions, provinces, communes, unions) : seulement les
  totaux, jamais la liste, qui reste sur le site de l'ADER.
- `quater` : commi 231-252 L. 197/2022, dates du DL 51/2023 (L. 87/2023), reports de 2024 (L. 18/2024,
  D.Lgs. 108/2024).
- `riammissione` : art. 3-bis DL 202/2024 (L. 15/2025).
- `stralcio` : commi 222-230 L. 197/2022.
- `rateizzazione` : art. 19 DPR 602/1973 modifié par l'art. 13 D.Lgs. 110/2024, taux et seuils de
  décadence des pages officielles de l'ADER.
- `sexies` : `testo_pubblicato` reste `false` tant qu'aucun texte n'est publié en Gazzetta Ufficiale ;
  `verificato_il` est la date de la dernière vérification. Ne rien écrire d'autre avant un texte.
- `sources` : libellé it/en et URL de chaque texte (Normattiva, Gazzetta Ufficiale, pages et FAQ ADER).

## Mise à jour : manuelle

Il n'y a pas de tâche planifiée : les règles changent par des lois et des FAQ, à des dates imprévisibles,
et chaque changement demande une relecture humaine. Procédure :

1. Relire le texte nouveau (Gazzetta Ufficiale, FAQ ADER) et modifier le JSON, y compris `retrieved_at`
   et, pour la sexies, `verificato_il`.
2. Adapter les tests de `src/lib/engine/definizione.test.ts` (dates, cas de décadence, montants).
3. `npm run check` sous le verrou Playwright, puis les contrôles complémentaires.

Les textes officiels téléchargés pour vérifier restent hors du dépôt (`data/raw/`, ignoré par git).
Les jours fériés sont calculés (samedi, dimanche, fêtes nationales, lundi de Pâques) ; le 4 octobre
(fête rétablie à partir de 2026, effet sur les échéances non vérifié) et les fêtes patronales ne sont
pas modélisés.
