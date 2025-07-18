import React from 'react';
import { Recipe } from '../../types/Recipe';

interface RecipeBasicInfoProps {
  recipe: Omit<Recipe, 'id'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const RecipeBasicInfo: React.FC<RecipeBasicInfoProps> = ({ recipe, onChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">Rezeptname:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Beschreibung:</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={onChange}
          rows={3}
        />
      </div>
    </>
  );
};

export default RecipeBasicInfo;