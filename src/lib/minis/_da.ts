/** Outils propres aux mini-simulateurs du site (préfixe « _ » : ignoré par le registre). */
import { T, type L } from './_kit';
import { formatMoney } from '../format';
export const e2 = (n: number, l: L) => formatMoney(n, 2, l);
export const d = (iso: string, l: L) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(l === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const yn = (l: L) => [{ value: '0', label: 'No' }, { value: '1', label: T(l, 'Sì', 'Yes') }];
