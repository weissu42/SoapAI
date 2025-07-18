import {findOilById} from '../data/oils';
import {SoapCalculations} from "../types/Recipe";

export const DEFAULT_SUPERFAT_PERCENTAGE = 10;
export const DEFAULT_WATER_PERCENTAGE = 30;

export interface SoapIngredient {
  oilId: string;
  weight: number; // in grams
}

export interface SoapCalculationResult {
  totalOilWeight: number;
  naohWeight: number;
  waterWeight: number;
  superfatPercentage: number;
  citricAcidWeight: number;
  additionalNaohForCitricAcid: number;
  properties: {
    hardness: number;
    cleansing: number;
    conditioning: number;
    bubbly: number;
    creamy: number;
    iodine: number;
    ins: number;
  };
}

/**
 * Berechnet die benötigte NaOH-Menge für eine Seifenrezeptur
 * @param ingredients Array von Öl-Zutaten mit Gewicht
 * @param superfatPercentage Überfettungsgrad (standardmäßig 10%)
 * @param citricAcidPercentage Anteil Zitronensäure
 * @param waterPercentage Anteil Wasser
 * @returns Berechnungsergebnis mit NaOH-Menge und Eigenschaften
 */
export const calculateSoapFormula = (
  ingredients: SoapIngredient[],
  superfatPercentage: number = DEFAULT_SUPERFAT_PERCENTAGE,
  citricAcidPercentage: number = 0,
  waterPercentage: number = DEFAULT_WATER_PERCENTAGE
): SoapCalculations => {
  let totalOilWeight = 0;
  let totalSapValue = 0;
  let weightedProperties = {
    hardness: 0,
    cleansing: 0,
    conditioning: 0,
    bubbly: 0,
    creamy: 0,
    iodine: 0,
    ins: 0
  };

  // Berechne Gesamtgewicht und gewichtete Eigenschaften
  ingredients.forEach(ingredient => {
    const oil = findOilById(ingredient.oilId);
    if (oil) {
      totalOilWeight += ingredient.weight;
      totalSapValue += (oil.sapValue * ingredient.weight);

      // Gewichtete Eigenschaften berechnen
      Object.keys(weightedProperties).forEach(key => {
        weightedProperties[key as keyof typeof weightedProperties] +=
          oil.properties[key as keyof typeof oil.properties] * ingredient.weight;
      });
    }
  });

  // Eigenschaften normalisieren (durch Gesamtgewicht teilen)
  Object.keys(weightedProperties).forEach(key => {
    weightedProperties[key as keyof typeof weightedProperties] =
      Math.round((weightedProperties[key as keyof typeof weightedProperties] / totalOilWeight) * 100) / 100;
  });

  // NaOH-Menge berechnen
  // Formel: (Gesamte Verseifungszahl * Ölgewicht / 1000) * (1 - Überfettung/100)
  const naohWeight = Math.round(
    (totalSapValue / 1000) * (1 - superfatPercentage / 100) * 100
  ) / 100;

  // Zitronensäure-Berechnungen
  let citricAcidWeight: number = 0;
  let naohForCitricAcid: number = 0;
  let totalNaohWeight = naohWeight;

  if (citricAcidPercentage && citricAcidPercentage > 0) {
    // Zitronensäure-Menge berechnen (% des Ölgewichts)
    citricAcidWeight = Math.round((totalOilWeight * citricAcidPercentage / 100) * 100) / 100;

    // Zusätzliche NaOH-Menge für Zitronensäure-Neutralisation
    // 1g Zitronensäure neutralisiert 0.624g NaOH
    naohForCitricAcid = Math.round((citricAcidWeight * 0.624) * 100) / 100;
    totalNaohWeight = Math.round((naohWeight + naohForCitricAcid) * 100) / 100;
  }

  // Wassermenge berechnen (Standard 30% des Ölgewichts)
  const waterWeight = Math.round((totalOilWeight * waterPercentage / 100) * 100) / 100;

  return {
    totalOilWeight: Math.round(totalOilWeight * 100) / 100,
    naohWeight: totalNaohWeight,
    waterWeight,
    superfatPercentage,
    citricAcidWeight,
    naohForCitricAcid,
    properties: weightedProperties
  };
};

/**
 * Berechnet die Eigenschaften einer Seifenrezeptur
 * @param ingredients Array von Öl-Zutaten
 * @returns Objekt mit berechneten Eigenschaften
 */
export const calculateSoapProperties = (ingredients: SoapIngredient[]) => {
  const result = calculateSoapFormula(ingredients);
  return result.properties;
};

/**
 * Validiert eine Seifenrezeptur auf sinnvolle Werte
 * @param ingredients Array von Öl-Zutaten
 * @returns Array von Warnungen oder leeres Array
 */
export const validateSoapRecipe = (ingredients: SoapIngredient[]): string[] => {
  const warnings: string[] = [];
  const properties = calculateSoapProperties(ingredients);

  if (properties.hardness < 29) {
    warnings.push('Die Seife könnte zu weich werden (Härte < 29)');
  }
  if (properties.hardness > 54) {
    warnings.push('Die Seife könnte zu hart werden (Härte > 54)');
  }
  if (properties.cleansing > 22) {
    warnings.push('Die Seife könnte zu aggressiv reinigen (Reinigung > 22)');
  }
  if (properties.conditioning < 44) {
    warnings.push('Die Seife könnte zu wenig pflegend sein (Pflege < 44)');
  }
  if (properties.conditioning > 69) {
    warnings.push('Die Seife könnte zu pflegend und weich werden (Pflege > 69)');
  }
  if (properties.bubbly < 14) {
    warnings.push('Die Seife könnte zu wenig schäumen (Schaum < 14)');
  }
  if (properties.bubbly > 46) {
    warnings.push('Die Seife könnte zu stark schäumen (Schaum > 46)');
  }

  return warnings;
};