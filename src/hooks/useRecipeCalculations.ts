import { useEffect, useState } from 'react';
import { SoapOil, SoapCalculations } from '../types/Recipe';
import { calculateSoapFormula, validateSoapRecipe, SoapIngredient } from '../utils/soapCalculations';

export const useRecipeCalculations = (
  soapOils: SoapOil[],
  superfatPercentage: number,
  citricAcidPercentage: number,
  waterPercentage: number
) => {
  const [calculations, setCalculations] = useState<SoapCalculations>({
    totalOilWeight: 0,
    naohWeight: 0,
    waterWeight: 0,
    superfatPercentage: 0,
    citricAcidWeight: 0,
    naohForCitricAcid: 0,
    properties: {
      hardness: 0,
      cleansing: 0,
      conditioning: 0,
      bubbly: 0,
      creamy: 0,
      iodine: 0,
      ins: 0
    }
  });
  
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const validOils = soapOils.filter(oil => oil.oilId && oil.weight > 0);
    
    if (validOils.length > 0) {
      const soapIngredients: SoapIngredient[] = validOils.map(oil => ({
        oilId: oil.oilId,
        weight: oil.weight
      }));

      const newCalculations = calculateSoapFormula(
        soapIngredients,
        superfatPercentage,
        citricAcidPercentage,
        waterPercentage
      );
      
      const recipeWarnings = validateSoapRecipe(soapIngredients);

      setCalculations(newCalculations);
      setWarnings(recipeWarnings);
    } else {
      setWarnings([]);
    }
  }, [soapOils, superfatPercentage, citricAcidPercentage, waterPercentage]);

  return { calculations, warnings };
};