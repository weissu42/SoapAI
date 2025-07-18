import React from 'react';
import { SoapCalculations } from '../../types/Recipe';
import RecipeCalculations from '../RecipeCalculations';
import RecipeProperties from '../RecipeProperties';

interface FormCalculationsDisplayProps {
  calculations: SoapCalculations;
  show: boolean;
}

const FormCalculationsDisplay: React.FC<FormCalculationsDisplayProps> = ({ calculations, show }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <RecipeCalculations calculations={calculations} />
      <RecipeProperties properties={calculations.properties} />
    </>
  );
};

export default FormCalculationsDisplay;