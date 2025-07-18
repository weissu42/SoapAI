import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeHeaderProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe, onDelete, onEdit }) => {
  return (
    <div className="recipe-header">
      <h3>{recipe.name}</h3>
      <div className="recipe-actions">
        <button
          onClick={() => onEdit(recipe)}
          className="edit-btn"
          title="Rezept bearbeiten"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="delete-btn"
          title="Rezept löschen"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default RecipeHeader;