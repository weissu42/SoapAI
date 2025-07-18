import {calculateSoapFormula, SoapIngredient} from './soapCalculations';

describe('Soap Calculations', () => {
  test('Test recipe with citric acid', () => {
    // Testseife-Rezept
    const ingredients: SoapIngredient[] = [
      {oilId: 'coconut', weight: 250},     // Kokos: SAP 183
      {oilId: 'castor', weight: 80},       // Rizinus: SAP 128
      {oilId: 'sunflower', weight: 120},   // Sonnenblume: SAP 134
      {oilId: 'shea', weight: 100},        // Shea: SAP 128
      {oilId: 'safflower', weight: 450}    // Distel: SAP 136
    ];

    const superfatPercentage = 10; // Default
    const citricAcidPercentage = 5;

    const result = calculateSoapFormula(ingredients, superfatPercentage, citricAcidPercentage);

    // Manuelle Berechnung zur Verifikation:
    // Gesamtölgewicht: 250 + 80 + 120 + 100 + 450 = 1000g
    expect(result.totalOilWeight).toBe(1000);

    // Gesamte Verseifungszahl:
    // 250*183 + 80*128 + 120*134 + 100*128 + 450*136 = 45750 + 10240 + 16080 + 12800 + 61200 = 146070
    const expectedTotalSapValue = 250 * 183 + 80 * 128 + 120 * 134 + 100 * 128 + 450 * 136;
    expect(expectedTotalSapValue).toBe(146070);

    // NaOH für Öle (mit 10% Überfettung): 146070 / 1000 * 0.9 = 131.463g
    const expectedNaohForOils = Math.round((146070 / 1000) * (1 - 10 / 100) * 100) / 100;
    expect(expectedNaohForOils).toBe(131.46);

    // Zitronensäure-Menge: 1000g * 5% = 50g
    expect(result.citricAcidWeight).toBe(50);

    // Zusätzliche NaOH für Zitronensäure: 50g * 0.624 = 31.2g
    expect(result.naohForCitricAcid).toBe(31.2);

    // Gesamt-NaOH: 131.46 + 31.2 = 162.66g
    expect(result.naohWeight).toBe(162.66);

    // Wassermenge: 1000g * 0.30 = 300g
    expect(result.waterWeight).toBe(300);
  });

  test('Test recipe without citric acid for comparison', () => {
    const ingredients: SoapIngredient[] = [
      {oilId: 'coconut', weight: 250},
      {oilId: 'castor', weight: 80},
      {oilId: 'sunflower', weight: 120},
      {oilId: 'shea', weight: 100},
      {oilId: 'safflower', weight: 450}
    ];

    const result = calculateSoapFormula(ingredients, 10); // 10% superfat, no citric acid

    // Ohne Zitronensäure sollte nur die Öl-NaOH berechnet werden
    expect(result.totalOilWeight).toBe(1000);
    expect(result.naohWeight).toBe(131.46); // Nur NaOH für Öle
    expect(result.citricAcidWeight).toBe(0);
    expect(result.naohForCitricAcid).toBe(0);
    expect(result.waterWeight).toBe(300);
  });
});