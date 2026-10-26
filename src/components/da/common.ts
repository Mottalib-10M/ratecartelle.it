/** Petits outils communs aux outils du site : libellés, formats, export .ics (rien ne quitte le navigateur). */
import { formatMoney, formatNumber, displayDate } from '../../lib/format';
import type { Regime } from '../../lib/engine/index';
export type L = 'it' | 'en';
export const T = <A,>(l: L, it: A, en: A) => (l === 'en' ? en : it);
export const eur = (x: number, l: L, d?: number) => formatMoney(x, d ?? (Number.isInteger(Math.round(x * 100) / 100) ? 0 : 2), l);
export const eur2 = (x: number, l: L) => formatMoney(x, 2, l);
export const num = (x: number, l: L) => formatNumber(x, 0, l);
export const dt = (iso: string, l: L) => displayDate(iso, l === 'en' ? 'en-GB' : 'it-IT');
/** Date courte : 31/07/2026 (it), 31 Jul 2026 (en). */
export const dts = (iso: string, l: L) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(l === 'en' ? 'en-GB' : 'it-IT', { day: '2-digit', month: l === 'en' ? 'short' : '2-digit', year: 'numeric', timeZone: 'UTC' });

export const REGIME_LABEL: Record<Regime, { it: string; en: string }> = {
  quinquies: { it: 'Rottamazione-quinquies (cartelle dello Stato e INPS)', en: 'Rottamazione-quinquies (State and INPS debts)' },
  enti: { it: 'Quinquies di comuni e regioni (domanda entro il 15/12/2026)', en: 'Quinquies for comuni and regions (apply by 15/12/2026)' },
  quater: { it: 'Rottamazione-quater (piano in corso)', en: 'Rottamazione-quater (plan under way)' },
  riammissione: { it: 'Riammissione alla quater (piano in corso)', en: 'Readmission to the quater (plan under way)' },
};
export const REGIME_SHORT: Record<Regime, { it: string; en: string }> = {
  quinquies: { it: 'Rottamazione-quinquies', en: 'Rottamazione-quinquies' },
  enti: { it: 'Quinquies enti territoriali', en: 'Local-authority quinquies' },
  quater: { it: 'Rottamazione-quater', en: 'Rottamazione-quater' },
  riammissione: { it: 'Riammissione quater', en: 'Quater readmission' },
};

/** Giorni da oggi a una data, in parole. */
export function tra(oggi: string, iso: string, l: L): string {
  const n = Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${oggi}T00:00:00Z`)) / 86400000);
  if (n < 0) return T(l, 'scaduta', 'passed');
  if (n === 0) return T(l, 'oggi', 'today');
  if (n === 1) return T(l, 'domani', 'tomorrow');
  return T(l, `tra ${n} giorni`, `in ${n} days`);
}

/** Oggi nel fuso di Roma, letto nel browser (dopo il primo rendu). */
export function oggiRoma(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export interface IcsEvent { date: string; summary: string; description: string }
/** Fichier .ics (RFC 5545), un évènement « journée entière » par échéance, téléchargé localement. */
export function downloadIcs(events: IcsEvent[], filename: string): void {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const next = (iso: string) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10).replace(/-/g, ''); };
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Radif Partners//Definizione agevolata//IT', 'CALSCALE:GREGORIAN'];
  events.forEach((e, i) => {
    lines.push('BEGIN:VEVENT', `UID:${e.date}-${i}-definizione-agevolata`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${e.date.replace(/-/g, '')}`, `DTEND;VALUE=DATE:${next(e.date)}`, `SUMMARY:${esc(e.summary)}`, `DESCRIPTION:${esc(e.description)}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.summary)}`, 'TRIGGER:-P3D', 'END:VALARM', 'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

export const btn = 'inline-flex h-11 items-center gap-2 rounded-lg border border-navy-300 bg-white px-4 text-sm font-semibold text-navy-800 hover:bg-navy-50';
export const btnPrimary = 'inline-flex h-11 items-center gap-2 rounded-lg bg-accent-600 px-4 text-sm font-semibold text-white hover:bg-accent-700';
