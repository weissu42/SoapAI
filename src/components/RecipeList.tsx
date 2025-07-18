import React from 'react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './list/RecipeCard';
import EmptyRecipeList from './EmptyRecipeList';

interface RecipeListProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onDelete, onEdit }) => {
  if (recipes.length === 0) {
    return <EmptyRecipeList />;
  }

  return (
    <div className="recipe-list">
      <h2>Meine Seifenrezepte ({recipes.length})</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;