import React from 'react';
import { SoapCalculations } from '../types/Recipe';

interface RecipeCalculationsProps {
  calculations: SoapCalculations;
}

const RecipeCalculations: React.FC<RecipeCalculationsProps> = ({ calculations }) => {
  return (
    <div className="recipe-calculations">
      <h4>NaOH-Berechnungen:</h4>
      <div className="calculation-summary">
        <div><strong>Gesamtölgewicht:</strong> {calculations.totalOilWeight}g</div>
        <div><strong>NaOH benötigt:</strong> {calculations.naohWeight}g</div>
        <div><strong>Wasser benötigt:</strong> {calculations.waterWeight}g</div>
        <div><strong>Überfettung:</strong> {calculations.superfatPercentage}%</div>
        {calculations.citricAcidWeight > 0 && (
          <div><strong>Zitronensäure:</strong> {calculations.citricAcidWeight}g</div>
        )}
        {calculations.naohForCitricAcid > 0 && (
          <div><strong>Zusätzliche NaOH:</strong> {calculations.naohForCitricAcid}g</div>
        )}
      </div>
    </div>
  );
};

export default RecipeCalculations;