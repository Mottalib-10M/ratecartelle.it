/** Moteur lié aux paramètres : les pages, les outils et les mini-simulateurs appellent ces fonctions, jamais un second calcul. */
import { params } from './params';
import * as D from './definizione';
export type { Regime, Rata, Piano, StatoRata, Verdetto, TipoDebito, Voci, Risparmio, Ente, Precedente, Ammissibilita } from './definizione';
export { addDays, daysBetween, isLavorativo, festivi, easter, prossimoLavorativo, REGIMI, verificaDecadenza, risparmio, ammissibilita, rataCostante } from './definizione';
export const ultimoGiorno = (scadenza: string) => D.ultimoGiornoUtile(params, scadenza);
export const piano = (regime: D.Regime, capitale: number, n: number) => D.piano(params, regime, capitale, n);
export const datePiano = (regime: D.Regime, n: number) => D.datePiano(params[regime], n);
export const prossimaRata = (regime: D.Regime, n: number, oggi: string) => D.prossimaRata(params, regime, n, oggi);
export const rateScadute = (regime: D.Regime, n: number, oggi: string) => D.rateScadute(params, regime, n, oggi);
export const rateizzazione = (importo: number, mesi: number, data: string, inps = false) => D.rateizzazione(params, importo, mesi, data, inps);
export const maxRateSemplici = (data: string) => D.maxRateSemplici(params, data);
export const rateDecadenzaRateizzazione = (data: string) => D.rateDecadenzaRateizzazione(params, data);
