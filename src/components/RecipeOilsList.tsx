import React from 'react';
import { SoapOil } from '../types/Recipe';
import { sortOilsByWeight } from '../utils/recipeUtils';

interface RecipeOilsListProps {
  oils: SoapOil[];
}

const RecipeOilsList: React.FC<RecipeOilsListProps> = ({ oils }) => {
  return (
    <div className="recipe-soap-oils">
      <h4>Öle und Fette:</h4>
      <ul>
        {sortOilsByWeight(oils).map((oil, index) => (
          <li key={index}>
            {oil.oilName} - {oil.weight}g ({oil.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeOilsList;