import { describe, it, expect } from 'vitest';
import * as M from './index';
import { P } from './params';

describe('ultimo giorno utile (5 giorni di tolleranza e festivi)', () => {
  it('31/7/2026 → mercoledì 5/8/2026 (FAQ quinquies n. 11)', () => expect(M.ultimoGiorno('2026-07-31')).toBe(P.quinquies.unica_ultimo_giorno_faq));
  it('15/9/2024 (domenica) → lunedì 23/9/2024 (quinta rata quater)', () => expect(M.ultimoGiorno('2024-09-15')).toBe('2024-09-23'));
  it('30/11/2026 (lunedì) → 5/12/2026 sabato → lunedì 7/12/2026', () => expect(M.ultimoGiorno('2026-11-30')).toBe('2026-12-07'));
  it('Pasqua 2027 = 28 marzo, lunedì dell’Angelo festivo', () => { expect(M.easter(2027)).toBe('2027-03-28'); expect(M.isLavorativo('2027-03-29')).toBe(false); });
  it('enti: 31/3/2027 → 5/4/2027 (FAQ enti n. 13)', () => expect(M.ultimoGiorno('2027-03-31')).toBe(P.enti.unica_ultimo_giorno_faq));
  it('2 giugno festivo', () => expect(M.isLavorativo('2027-06-02')).toBe(false));
});

describe('calendari di legge', () => {
  it('quinquies: 54 rate, prima 31/7/2026, ultima 31/5/2035', () => { const d = M.datePiano('quinquies', 54); expect(d.length).toBe(54); expect(d[0]).toBe('2026-07-31'); expect(d[2]).toBe('2026-11-30'); expect(d[3]).toBe('2027-01-31'); expect(d[50]).toBe('2034-11-30'); expect(d[53]).toBe('2035-05-31'); });
  it('enti: prime cinque nel 2027 dal 31/3, sesta 31/1/2028', () => { const d = M.datePiano('enti', 54); expect(d[0]).toBe('2027-03-31'); expect(d[4]).toBe('2027-11-30'); expect(d[5]).toBe('2028-01-31'); expect(d[53]).toBe('2036-01-31'); });
  it('unica soluzione', () => { expect(M.datePiano('quinquies', 1)).toEqual(['2026-07-31']); expect(M.datePiano('enti', 1)).toEqual(['2027-03-31']); });
  it('riammissione: 10 rate fino al 30/11/2027', () => { const d = M.datePiano('riammissione', 10); expect(d[1]).toBe('2025-11-30'); expect(d[9]).toBe('2027-11-30'); });
});

describe('piano stimato', () => {
  it('unica quinquies senza interessi', () => { const p = M.piano('quinquies', 5000, 1); expect(p.totale).toBe(5000); expect(p.rate[0].interessi).toBe(0); });
  it('rate di pari importo che chiudono il debito', () => {
    const p = M.piano('quinquies', 10000, 54);
    expect(p.nEffettive).toBe(54);
    expect(p.rate[0].interessi).toBe(0);
    const imp = p.rate.slice(0, 53).map((r) => r.importo);
    expect(Math.max(...imp) - Math.min(...imp)).toBeLessThan(0.01);
    expect(Math.abs(p.rate[53].importo - imp[0])).toBeLessThan(0.5);
    expect(p.rate[53].residuo).toBe(0);
    expect(p.interessi).toBeGreaterThan(0);
    expect(p.interessi).toBeLessThan(10000 * 0.03 * 9);
  });
  it('rata minima 100 €: 3.000 € in 54 rate scendono a meno rate', () => { const p = M.piano('quinquies', 3000, 54); expect(p.ridotto).toBe(true); expect(p.rate.every((r) => r.importo >= 100)).toBe(true); expect(p.nEffettive).toBeLessThan(54); });
  it('quater: prime due rate al 10 %', () => { const p = M.piano('quater', 10000, 18); expect(p.rate[0].importo).toBe(1000); expect(p.rate[1].importo).toBe(1000); expect(p.nEffettive).toBe(18); });
  it('riammissione unica: interessi del 2 % dal 1° novembre 2023 per 21 mesi', () => { const p = M.piano('riammissione', 10000, 1); expect(p.totale).toBe(10350); });
});

describe('decadenza', () => {
  it('quinquies: una rata saltata non fa decadere', () => expect(M.verificaDecadenza('quinquies', 10, ['ok', 'no', 'ok']).decaduto).toBe(false));
  it('quinquies: due rate anche non consecutive fanno decadere', () => expect(M.verificaDecadenza('quinquies', 10, ['no', 'ok', 'parziale']).motivo).toBe('due_rate'));
  it('quinquies FAQ 12: tre rate, salto la seconda e pago la terza → decaduto', () => expect(M.verificaDecadenza('quinquies', 3, ['ok', 'no', 'ok']).motivo).toBe('ultima'));
  it('quinquies: ritardo su una rata intermedia non conta', () => expect(M.verificaDecadenza('quinquies', 10, ['ok', 'tardi']).decaduto).toBe(false));
  it('quinquies: unica pagata oltre i 5 giorni → decaduto', () => expect(M.verificaDecadenza('quinquies', 1, ['tardi']).decaduto).toBe(true));
  it('quater: una sola rata oltre i 5 giorni basta', () => expect(M.verificaDecadenza('quater', 18, ['ok', 'tardi']).decaduto).toBe(true));
});

describe('risparmio e rateizzazione', () => {
  it('imposte: si pagano capitale e spese', () => { const r = M.risparmio('imposte', { capitale: 1000, sanzioni: 300, interessi: 100, mora: 50, aggio: 60, spese: 10 }); expect(r.dovuto).toBe(1010); expect(r.cancellato).toBe(510); });
  it('multa della prefettura: la sanzione resta', () => { const r = M.risparmio('multa_stato', { capitale: 0, sanzioni: 400, interessi: 240, mora: 30, aggio: 0, spese: 6 }); expect(r.dovuto).toBe(406); });
  it('rateizzazione: 84 rate a semplice richiesta nel 2026, 96 nel 2027, 108 dal 2029', () => { expect(M.maxRateSemplici('2026-10-26')).toBe(84); expect(M.maxRateSemplici('2027-02-01')).toBe(96); expect(M.maxRateSemplici('2029-01-01')).toBe(108); });
  it('decadenza rateizzazione: 8 rate per le richieste dal 16/7/2022', () => { expect(M.rateDecadenzaRateizzazione('2026-01-10')).toBe(8); expect(M.rateDecadenzaRateizzazione('2022-03-01')).toBe(5); });
  it('ammissibilità', () => { expect(M.ammissibilita(2020, 'ade_dichiarazione', 'nessuna').quinquies).toBe(true); expect(M.ammissibilita(2024, 'ade_dichiarazione', 'nessuna').quinquies).toBe(false); expect(M.ammissibilita(2019, 'ade_dichiarazione', 'quater_in_regola').quinquies).toBe(false); expect(M.ammissibilita(2023, 'ade_dichiarazione', 'quater_in_regola').quinquies).toBe(true); expect(M.ammissibilita(2015, 'comune_regione', 'nessuna').enti).toBe(true); });
});
