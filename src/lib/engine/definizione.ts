/**
 * Moteur des définitions agevolate (fonctions pures, paramètres en argument).
 *
 * - quinquies : art. 1, commi 82-101, L. 199/2025 (rate bimestrali, 3 % dal 1° agosto 2026, rata minima 100 €,
 *   decadenza del comma 95 come modificato: unica, due rate anche non consecutive, ultima rata ; tolleranza
 *   di 5 giorni solo per unica e ultima rata).
 * - enti : art. 10-quinquies DL 38/2026 (L. 88/2026, L. 113/2026), stesse regole, calendario dal 31 marzo 2027.
 * - quater : art. 1, commi 231-252, L. 197/2022 (18 rate, prime due al 10 %, 2 % dal 1° novembre 2023 ;
 *   comma 244 : una sola rata mancata, insufficiente o pagata oltre 5 giorni basta a far decadere).
 * - riammissione : art. 3-bis DL 202/2024 (10 rate di pari importo, 2 % dal 1° novembre 2023, comma 244).
 *
 * La legge fissa il tasso, la data di partenza e le rate di pari importo, non la formula : l'importo di ogni
 * rata è una STIMA (rata costante, interessi semplici per periodo sul residuo). Fa fede la Comunicazione
 * delle somme dovute di Agenzia delle entrate-Riscossione.
 */

export type Regime = 'quinquies' | 'enti' | 'quater' | 'riammissione';
export const REGIMI: Regime[] = ['quinquies', 'enti', 'quater', 'riammissione'];

export interface RegimeParams {
  label: string; unica: string; max_rate: number; interesse: number; interessi_dal: string; dates: string[];
  rata_minima?: number; prime_due_quota?: number;
}
export interface Params {
  tolerance_days: number;
  quinquies: RegimeParams; enti: RegimeParams; quater: RegimeParams; riammissione: RegimeParams;
  rateizzazione: { soglia_semplice: number; rata_minima: number; semplice: Array<{ dal: string; al: string; max: number }>; documentata_max: number; tasso_erariale: number; tasso_inps: number; decadenza_rate: Array<{ richieste_dal: string; rate: number }> };
}

/* ---------- Dates ---------- */
const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const fromISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
export const addDays = (iso: string, n: number) => { const d = fromISO(iso); d.setUTCDate(d.getUTCDate() + n); return toISO(d); };
export const daysBetween = (a: string, b: string) => Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86400000);
const monthIndex = (iso: string) => { const [y, m] = iso.split('-').map(Number); return y * 12 + (m - 1); };

/** Dimanche de Pâques (algorithme de Meeus/Butcher, calendrier grégorien). */
export function easter(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return `${y}-${pad(month)}-${pad(day)}`;
}
/** Festivi nazionali italiani (art. 2 L. 260/1949 e successive), lunedì dell'Angelo compreso. */
export function festivi(y: number): string[] {
  const fixed = ['01-01', '01-06', '04-25', '05-01', '06-02', '08-15', '11-01', '12-08', '12-25', '12-26'].map((md) => `${y}-${md}`);
  return [...fixed, addDays(easter(y), 1)];
}
export function isLavorativo(iso: string): boolean {
  const wd = fromISO(iso).getUTCDay();
  if (wd === 0 || wd === 6) return false;
  return !festivi(Number(iso.slice(0, 4))).includes(iso);
}
export const prossimoLavorativo = (iso: string) => { let d = iso; while (!isLavorativo(d)) d = addDays(d, 1); return d; };

/**
 * Ultimo giorno utile per un versamento : scadenza spostata al primo giorno lavorativo, più i 5 giorni di
 * tolleranza, con un nuovo spostamento se il quinto giorno cade di sabato, domenica o festivo. È la lettura
 * di Agenzia delle entrate-Riscossione : 31/7/2026 → 5/8/2026 (FAQ quinquies n. 11), 15/9/2024 → 23/9/2024.
 */
export function ultimoGiornoUtile(p: Pick<Params, 'tolerance_days'>, scadenza: string): string {
  return prossimoLavorativo(addDays(prossimoLavorativo(scadenza), p.tolerance_days));
}

/* ---------- Piano delle rate ---------- */
export interface Rata { n: number; scadenza: string; ultimoGiorno: string; importo: number; capitale: number; interessi: number; residuo: number }
export interface Piano { regime: Regime; rate: Rata[]; nRichieste: number; nEffettive: number; ridotto: boolean; totale: number; interessi: number; capitale: number; ultima: string }

const r2 = (x: number) => Math.round(x * 100) / 100;

/** Date delle rate per un piano di `n` rate (1 = unica soluzione). */
export function datePiano(rp: RegimeParams, n: number): string[] {
  if (n <= 1) return [rp.unica];
  return rp.dates.slice(0, Math.min(n, rp.max_rate));
}

/**
 * Piano stimato. Interessi semplici sul residuo per ogni periodo (tasso annuo × mesi / 12), dal giorno prima
 * dell'inizio degli interessi ; rata costante sulle rate « di pari ammontare ». Quater : prime due rate al
 * 10 % delle somme dovute, poi 16 rate costanti sul resto.
 */
export function piano(p: Params, regime: Regime, capitale: number, nRichieste: number): Piano {
  const rp = p[regime];
  const max = rp.max_rate;
  let n = Math.max(1, Math.min(Math.round(nRichieste) || 1, max));
  if (regime === 'quater' && n > 1) n = max; // la quater prevede l'unica soluzione o il piano di 18 rate
  const build = (k: number): Rata[] => {
    const dates = datePiano(rp, k);
    const anchor = addDays(rp.interessi_dal, -1);
    // Unica soluzione : niente interessi (quinquies, enti, quater) ; riammissione : 2 % dal 1° novembre 2023.
    const conInteressi = k > 1 || regime === 'riammissione';
    // Fattore di ogni periodo : 1 + tasso × mesi / 12, dal giorno prima dell'inizio degli interessi.
    let prev = anchor;
    const f = dates.map((d) => {
      if (!conInteressi || d <= anchor) return 1;
      const m = Math.max(0, monthIndex(d) - monthIndex(prev));
      prev = d;
      return 1 + rp.interesse * m / 12;
    });
    const fixed = regime === 'quater' && k > 1 ? [1, 2].map(() => capitale * (rp.prime_due_quota ?? 0.1)) : [];
    const after = (i: number) => f.slice(i + 1).reduce((x, y) => x * y, 1);
    const all = f.reduce((x, y) => x * y, 1);
    const free = dates.map((_, i) => i).filter((i) => i >= fixed.length);
    const A = (capitale * all - fixed.reduce((s, x, i) => s + x * after(i), 0)) / free.reduce((s, i) => s + after(i), 0);
    const rate: Rata[] = [];
    let residuo = capitale;
    dates.forEach((d, i) => {
      const interessi = r2(residuo * (f[i] - 1));
      let importo = i < fixed.length ? r2(fixed[i]) : r2(A);
      if (i === dates.length - 1) importo = r2(residuo + interessi); // l'ultima chiude il conto
      const quotaCap = r2(importo - interessi);
      residuo = Math.max(0, r2(residuo - quotaCap));
      rate.push({ n: i + 1, scadenza: d, ultimoGiorno: ultimoGiornoUtile(p, d), importo, capitale: quotaCap, interessi, residuo });
    });
    return rate;
  };
  let rate = build(n);
  const min = rp.rata_minima ?? 0;
  let ridotto = false;
  // FAQ quinquies n. 6 : se le rate scendono sotto 100 €, il numero è ridotto d'ufficio quanto basta.
  while (min && n > 1 && rate.some((r) => r.importo < min)) { n -= 1; ridotto = true; rate = build(n); }
  const totale = r2(rate.reduce((s, r) => s + r.importo, 0));
  return { regime, rate, nRichieste: Math.round(nRichieste) || 1, nEffettive: rate.length, ridotto, totale, interessi: r2(totale - capitale), capitale, ultima: rate[rate.length - 1].scadenza };
}

/** Prossima scadenza (data >= oggi) di un piano di `n` rate, con il suo numero. */
export function prossimaRata(p: Params, regime: Regime, n: number, oggi: string): { n: number; scadenza: string; ultimoGiorno: string } | null {
  const dates = datePiano(p[regime], regime === 'quater' && n > 1 ? p.quater.max_rate : n);
  for (let i = 0; i < dates.length; i++) {
    const ug = ultimoGiornoUtile(p, dates[i]);
    if (ug >= oggi) return { n: i + 1, scadenza: dates[i], ultimoGiorno: ug };
  }
  return null;
}

/* ---------- Decadenza ---------- */
/** Stato di ogni rata scaduta : pagata (entro la scadenza o nei 5 giorni), pagata oltre i 5 giorni, in parte, non pagata. */
export type StatoRata = 'ok' | 'tardi' | 'parziale' | 'no';
export interface Verdetto { decaduto: boolean; motivo: 'unica' | 'due_rate' | 'ultima' | 'una_rata' | null; arretrate: number; inRegola: boolean; avviso: 'nessuno' | 'una_arretrata' | 'ritardi_tollerati'; }

/**
 * Quinquies ed enti (comma 95 L. 199/2025 come modificato) : decade chi non paga (o paga in parte) l'unica
 * rata, due rate anche non consecutive, o l'ultima ; il ritardo oltre 5 giorni conta solo per unica e ultima.
 * Un versamento successivo copre la rata più vecchia rimasta scoperta (FAQ n. 12) : chi salta una rata e paga
 * l'ultima lascia scoperta l'ultima.
 * Quater e riammissione (comma 244 L. 197/2022) : basta una rata non pagata, insufficiente o oltre 5 giorni.
 */
export function verificaDecadenza(regime: Regime, nRate: number, stati: StatoRata[]): Verdetto {
  const scadute = stati.length;
  const arretrate = stati.filter((s) => s === 'no' || s === 'parziale').length;
  const base = { arretrate, inRegola: arretrate === 0 };
  if (regime === 'quater' || regime === 'riammissione') {
    const bad = stati.some((s) => s !== 'ok');
    if (!bad) return { ...base, decaduto: false, motivo: null, avviso: 'nessuno' };
    return { ...base, decaduto: true, motivo: nRate <= 1 ? 'unica' : 'una_rata', avviso: 'nessuno' };
  }
  if (nRate <= 1) {
    const s = stati[0];
    const dec = !!s && s !== 'ok';
    return { ...base, decaduto: dec, motivo: dec ? 'unica' : null, avviso: 'nessuno' };
  }
  if (arretrate >= 2) return { ...base, decaduto: true, motivo: 'due_rate', avviso: 'nessuno' };
  const ultimaScaduta = scadute >= nRate;
  if (ultimaScaduta && (arretrate >= 1 || stati[nRate - 1] === 'tardi')) return { ...base, decaduto: true, motivo: 'ultima', avviso: 'nessuno' };
  if (arretrate === 1) return { ...base, decaduto: false, motivo: null, avviso: 'una_arretrata' };
  if (stati.some((s) => s === 'tardi')) return { ...base, decaduto: false, motivo: null, avviso: 'ritardi_tollerati' };
  return { ...base, decaduto: false, motivo: null, avviso: 'nessuno' };
}

/** Rate già scadute a una data (ultimo giorno utile passato). */
export function rateScadute(p: Params, regime: Regime, n: number, oggi: string): Array<{ n: number; scadenza: string; ultimoGiorno: string }> {
  const dates = datePiano(p[regime], regime === 'quater' && n > 1 ? p.quater.max_rate : n);
  return dates.map((d, i) => ({ n: i + 1, scadenza: d, ultimoGiorno: ultimoGiornoUtile(p, d) })).filter((r) => r.ultimoGiorno < oggi);
}

/* ---------- Risparmio ---------- */
export type TipoDebito = 'imposte' | 'inps' | 'multa_stato' | 'ente_tributo' | 'ente_multa';
export interface Voci { capitale: number; sanzioni: number; interessi: number; mora: number; aggio: number; spese: number }
export interface Risparmio { dovuto: number; cancellato: number; quota: number; dettaglio: Array<{ voce: keyof Voci; importo: number; cancellata: boolean }> }
/**
 * Cosa si paga e cosa si cancella. Imposte, contributi e tributi locali : si pagano capitale e spese, si
 * cancellano sanzioni, interessi, mora e aggio (comma 82). Multe stradali dello Stato (comma 97) e sanzioni
 * amministrative degli enti (art. 10-quinquies, lett. f) : la sanzione resta dovuta, si cancellano solo
 * interessi (compresa la maggiorazione dell'art. 27 L. 689/1981, da indicare come « interessi ») e aggio.
 */
export function risparmio(tipo: TipoDebito, v: Voci): Risparmio {
  const multa = tipo === 'multa_stato' || tipo === 'ente_multa';
  const canc: Record<keyof Voci, boolean> = { capitale: false, sanzioni: !multa, interessi: true, mora: true, aggio: true, spese: false };
  const dettaglio = (Object.keys(canc) as Array<keyof Voci>).map((k) => ({ voce: k, importo: Math.max(0, v[k] || 0), cancellata: canc[k] }));
  const dovuto = r2(dettaglio.filter((d) => !d.cancellata).reduce((s, d) => s + d.importo, 0));
  const cancellato = r2(dettaglio.filter((d) => d.cancellata).reduce((s, d) => s + d.importo, 0));
  const tot = dovuto + cancellato;
  return { dovuto, cancellato, quota: tot > 0 ? cancellato / tot : 0, dettaglio };
}

/* ---------- Rateizzazione ordinaria (art. 19 DPR 602/1973) ---------- */
export interface Rateizzazione { maxSemplice: number; maxDocumentata: number; mesi: number; rata: number; totale: number; interessi: number; documentazione: boolean; rataMinimaOk: boolean }
export function maxRateSemplici(p: Params, dataRichiesta: string): number {
  const f = p.rateizzazione.semplice.find((x) => dataRichiesta >= x.dal && dataRichiesta <= x.al);
  return f ? f.max : p.rateizzazione.semplice[0].max;
}
/** Rata mensile costante al tasso annuo indicato (piano alla francese, interessi mensili). */
export function rataCostante(importo: number, mesi: number, tassoAnnuo: number): number {
  const i = tassoAnnuo / 12;
  if (mesi <= 0) return importo;
  if (i === 0) return importo / mesi;
  return (importo * i) / (1 - Math.pow(1 + i, -mesi));
}
export function rateizzazione(p: Params, importo: number, mesiRichiesti: number, dataRichiesta: string, previdenziale = false): Rateizzazione {
  const R = p.rateizzazione;
  const maxSemplice = importo > R.soglia_semplice ? 0 : maxRateSemplici(p, dataRichiesta);
  const mesi = Math.max(1, Math.min(Math.round(mesiRichiesti), R.documentata_max));
  const tasso = previdenziale ? R.tasso_inps : R.tasso_erariale;
  const rata = r2(rataCostante(importo, mesi, tasso));
  const totale = r2(rata * mesi);
  return { maxSemplice, maxDocumentata: R.documentata_max, mesi, rata, totale, interessi: r2(totale - importo), documentazione: importo > R.soglia_semplice || mesi > maxSemplice, rataMinimaOk: rata >= R.rata_minima };
}
/** Numero di rate non pagate che fa decadere un piano, secondo la data della richiesta. */
export function rateDecadenzaRateizzazione(p: Params, dataRichiesta: string): number {
  const r = [...p.rateizzazione.decadenza_rate].sort((a, b) => (a.richieste_dal < b.richieste_dal ? 1 : -1)).find((x) => dataRichiesta >= x.richieste_dal);
  return r ? r.rate : 8;
}

/* ---------- Ammissibilità ---------- */
export type Ente = 'ade_dichiarazione' | 'ade_accertamento' | 'inps_omesso' | 'inps_accertamento' | 'prefettura' | 'comune_regione' | 'altro_statale' | 'escluso';
export type Precedente = 'nessuna' | 'quater_in_regola' | 'quater_decaduto' | 'vecchie_decadute';
export interface Ammissibilita { quinquies: boolean; enti: boolean; motivo: string; nota?: string }
/**
 * Quali definizioni coprono un carico. Quinquies : carichi affidati 2000-2023 da omessi versamenti di imposte
 * dichiarate o da controlli automatici e formali, o da contributi INPS non accertati, e multe delle prefetture
 * (solo interessi e aggio) ; esclusi i carichi della quater o riammissione in regola al 30 settembre 2025.
 * Enti territoriali : carichi 2000-2023 di regioni ed enti locali che hanno aderito (elenco ADER).
 */
export function ammissibilita(annoAffidamento: number, ente: Ente, precedente: Precedente): Ammissibilita {
  const periodo = annoAffidamento >= 2000 && annoAffidamento <= 2023;
  if (!periodo) return { quinquies: false, enti: false, motivo: annoAffidamento > 2023 ? 'dopo_2023' : 'prima_2000' };
  if (ente === 'escluso') return { quinquies: false, enti: false, motivo: 'escluso' };
  if (ente === 'comune_regione') return { quinquies: false, enti: true, motivo: 'enti' };
  if (ente === 'ade_accertamento' || ente === 'inps_accertamento' || ente === 'altro_statale') return { quinquies: false, enti: false, motivo: 'accertamento' };
  if (precedente === 'quater_in_regola' && annoAffidamento <= 2022) return { quinquies: false, enti: false, motivo: 'quater_in_regola' };
  return { quinquies: true, enti: false, motivo: ente === 'prefettura' ? 'multa' : 'ok' };
}
