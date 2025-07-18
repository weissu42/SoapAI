import React from 'react';
import { Ingredient } from '../types/Recipe';

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
  const validIngredients = ingredients.filter(ing => ing.name.trim());
  
  if (validIngredients.length === 0) {
    return null;
  }

  return (
    <div className="recipe-ingredients">
      <h4>Zusätzliche Zutaten:</h4>
      <ul>
        {validIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}
            {ingredient.amount && ` - ${ingredient.amount} ${ingredient.unit}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;