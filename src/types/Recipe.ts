export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface SoapOil {
  oilId: string;
  oilName: string;
  weight: number;
  percentage: number;
}

export interface SoapCalculations {
  totalOilWeight: number;
  naohWeight: number;
  waterWeight: number;
  superfatPercentage: number;
  citricAcidWeight: number;
  naohForCitricAcid: number;
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

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  soapOils: SoapOil[];
  calculations: SoapCalculations;
  notes: string;
  superfatPercentage: number;
  citricAcidPercentage?: number;
  waterPercentage: number;
}