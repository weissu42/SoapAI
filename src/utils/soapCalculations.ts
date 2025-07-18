import {findOilById} from '../data/oils';
import {SoapCalculations} from "../types/Recipe";

export const DEFAULT_SUPERFAT_PERCENTAGE = 10;
export const DEFAULT_WATER_PERCENTAGE = 30;

export interface SoapIngredient {
  oilId: string;
  weight: number; // in grams
}

/**
 * Calculates the required NaOH amount for a soap recipe
 * @param ingredients Array of oil ingredients with weight
 * @param superfatPercentage Superfat percentage (default 10%)
 * @param citricAcidPercentage Citric acid percentage
 * @param waterPercentage Water percentage
 * @returns Calculation result with NaOH amount and properties
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

  // Calculate total weight and weighted properties
  ingredients.forEach(ingredient => {
    const oil = findOilById(ingredient.oilId);
    if (oil) {
      totalOilWeight += ingredient.weight;
      totalSapValue += (oil.sapValue * ingredient.weight);

      // Calculate weighted properties
      Object.keys(weightedProperties).forEach(key => {
        weightedProperties[key as keyof typeof weightedProperties] +=
          oil.properties[key as keyof typeof oil.properties] * ingredient.weight;
      });
    }
  });

  // Normalize properties (divide by total weight)
  Object.keys(weightedProperties).forEach(key => {
    weightedProperties[key as keyof typeof weightedProperties] =
      Math.round((weightedProperties[key as keyof typeof weightedProperties] / totalOilWeight) * 100) / 100;
  });

  // Calculate NaOH amount
  // Formula: (Total saponification value * Oil weight / 1000) * (1 - Superfat/100)
  const naohWeight = Math.round(
    (totalSapValue / 1000) * (1 - superfatPercentage / 100) * 100
  ) / 100;

  // Citric acid calculations
  let citricAcidWeight: number = 0;
  let naohForCitricAcid: number = 0;
  let totalNaohWeight = naohWeight;

  if (citricAcidPercentage && citricAcidPercentage > 0) {
    // Calculate citric acid amount (% of oil weight)
    citricAcidWeight = Math.round((totalOilWeight * citricAcidPercentage / 100) * 100) / 100;

    // Additional NaOH amount for citric acid neutralization
    // 1g citric acid neutralizes 0.624g NaOH
    naohForCitricAcid = Math.round((citricAcidWeight * 0.624) * 100) / 100;
    totalNaohWeight = Math.round((naohWeight + naohForCitricAcid) * 100) / 100;
  }

  // Calculate water amount (default 30% of oil weight)
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
 * Calculates the properties of a soap recipe
 * @param ingredients Array of oil ingredients
 * @returns Object with calculated properties
 */
export const calculateSoapProperties = (ingredients: SoapIngredient[]) => {
  const result = calculateSoapFormula(ingredients);
  return result.properties;
};

/**
 * Validates a soap recipe for reasonable values
 * @param ingredients Array of oil ingredients
 * @returns Array of warnings or empty array
 */
export const validateSoapRecipe = (ingredients: SoapIngredient[]): string[] => {
  const warnings: string[] = [];
  const properties = calculateSoapProperties(ingredients);

  if (properties.hardness < 29) {
    warnings.push('The soap might become too soft (Hardness < 29)');
  }
  if (properties.hardness > 54) {
    warnings.push('The soap might become too hard (Hardness > 54)');
  }
  if (properties.cleansing > 22) {
    warnings.push('The soap might cleanse too aggressively (Cleansing > 22)');
  }
  if (properties.conditioning < 44) {
    warnings.push('The soap might be too little conditioning (Conditioning < 44)');
  }
  if (properties.conditioning > 69) {
    warnings.push('The soap might be too conditioning and soft (Conditioning > 69)');
  }
  if (properties.bubbly < 14) {
    warnings.push('The soap might have too little lather (Bubbly < 14)');
  }
  if (properties.bubbly > 46) {
    warnings.push('The soap might have too much lather (Bubbly > 46)');
  }

  return warnings;
};