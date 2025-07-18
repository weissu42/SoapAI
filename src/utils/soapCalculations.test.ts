import {calculateSoapFormula, SoapIngredient} from './soapCalculations';

describe('Soap Calculations', () => {
  test('Test recipe with citric acid', () => {
    // Test soap recipe
    const ingredients: SoapIngredient[] = [
      {oilId: 'coconut', weight: 250},     // Coconut: SAP 183
      {oilId: 'castor', weight: 80},       // Castor: SAP 128
      {oilId: 'sunflower', weight: 120},   // Sunflower: SAP 134
      {oilId: 'shea', weight: 100},        // Shea: SAP 128
      {oilId: 'safflower', weight: 450}    // Safflower: SAP 136
    ];

    const superfatPercentage = 10; // Default
    const citricAcidPercentage = 5;

    const result = calculateSoapFormula(ingredients, superfatPercentage, citricAcidPercentage);

    // Manual calculation for verification:
    // Total oil weight: 250 + 80 + 120 + 100 + 450 = 1000g
    expect(result.totalOilWeight).toBe(1000);

    // Total saponification value:
    // 250*183 + 80*128 + 120*134 + 100*128 + 450*136 = 45750 + 10240 + 16080 + 12800 + 61200 = 146070
    const expectedTotalSapValue = 250 * 183 + 80 * 128 + 120 * 134 + 100 * 128 + 450 * 136;
    expect(expectedTotalSapValue).toBe(146070);

    // NaOH for oils (with 10% superfat): 146070 / 1000 * 0.9 = 131.463g
    const expectedNaohForOils = Math.round((146070 / 1000) * (1 - 10 / 100) * 100) / 100;
    expect(expectedNaohForOils).toBe(131.46);

    // Citric acid amount: 1000g * 5% = 50g
    expect(result.citricAcidWeight).toBe(50);

    // Additional NaOH for citric acid: 50g * 0.624 = 31.2g
    expect(result.naohForCitricAcid).toBe(31.2);

    // Total NaOH: 131.46 + 31.2 = 162.66g
    expect(result.naohWeight).toBe(162.66);

    // Water weight: 1000g * 0.30 = 300g
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

    // Without citric acid, only oil-NaOH should be calculated
    expect(result.totalOilWeight).toBe(1000);
    expect(result.naohWeight).toBe(131.46); // Only NaOH for oils
    expect(result.citricAcidWeight).toBe(0);
    expect(result.naohForCitricAcid).toBe(0);
    expect(result.waterWeight).toBe(300);
  });
});