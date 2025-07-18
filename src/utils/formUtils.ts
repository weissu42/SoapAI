import { Recipe, SoapOil, Ingredient } from '../types/Recipe';
import { DEFAULT_SUPERFAT_PERCENTAGE, DEFAULT_WATER_PERCENTAGE } from './soapCalculations';

export const createEmptyRecipe = (): Omit<Recipe, 'id'> => ({
  name: '',
  description: '',
  ingredients: [{ name: '', amount: '', unit: 'g' }],
  soapOils: [{ oilId: '', oilName: '', weight: 0, percentage: 0 }],
  calculations: {
    totalOilWeight: 0,
    naohWeight: 0,
    waterWeight: 0,
    superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
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
  },
  notes: '',
  superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
  citricAcidPercentage: 0,
  waterPercentage: DEFAULT_WATER_PERCENTAGE
});

export const calculateOilPercentages = (oils: SoapOil[]): SoapOil[] => {
  const totalWeight = oils.reduce((sum, oil) => sum + oil.weight, 0);
  if (totalWeight === 0) return oils;
  
  return oils.map(oil => ({
    ...oil,
    percentage: Math.round((oil.weight / totalWeight) * 100 * 100) / 100
  }));
};

export const addEmptyIngredient = (ingredients: Ingredient[]): Ingredient[] => {
  return [...ingredients, { name: '', amount: '', unit: 'g' }];
};

export const removeIngredient = (ingredients: Ingredient[], index: number): Ingredient[] => {
  if (ingredients.length <= 1) return ingredients;
  return ingredients.filter((_, i) => i !== index);
};

export const addEmptyOil = (oils: SoapOil[]): SoapOil[] => {
  return [...oils, { oilId: '', oilName: '', weight: 0, percentage: 0 }];
};

export const removeOil = (oils: SoapOil[], index: number): SoapOil[] => {
  if (oils.length <= 1) return oils;
  return oils.filter((_, i) => i !== index);
};

export const updateIngredient = (
  ingredients: Ingredient[],
  index: number,
  field: keyof Ingredient,
  value: string
): Ingredient[] => {
  const newIngredients = [...ingredients];
  newIngredients[index][field] = value;
  return newIngredients;
};