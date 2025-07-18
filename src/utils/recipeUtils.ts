import { SoapOil } from '../types/Recipe';

export const sortOilsByWeight = (oils: SoapOil[]): SoapOil[] => {
  return [...oils].sort((a, b) => b.weight - a.weight);
};