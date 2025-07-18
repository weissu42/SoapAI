import React from 'react';
import { Recipe } from '../../types/Recipe';
import RecipeHeader from './RecipeHeader';
import RecipeOilsList from './RecipeOilsList';
import RecipeCalculations from './RecipeCalculations';
import RecipeProperties from './RecipeProperties';
import RecipeIngredients from './RecipeIngredients';
import RecipeNotes from './RecipeNotes';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete, onEdit }) => {
  return (
    <div className="recipe-card">
      <RecipeHeader recipe={recipe} onDelete={onDelete} onEdit={onEdit} />
      
      {recipe.description && (
        <p className="recipe-description">{recipe.description}</p>
      )}
      
      <RecipeOilsList oils={recipe.soapOils} />
      <RecipeCalculations calculations={recipe.calculations} />
      <RecipeProperties properties={recipe.calculations.properties} />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeNotes notes={recipe.notes} />
    </div>
  );
};

export default RecipeCard;