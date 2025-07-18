import React from 'react';
import { Recipe } from '../../types/Recipe';

interface RecipeParametersProps {
  recipe: Omit<Recipe, 'id'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecipeParameters: React.FC<RecipeParametersProps> = ({ recipe, onChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="superfatPercentage">Überfettung (%):</label>
        <input
          type="number"
          id="superfatPercentage"
          name="superfatPercentage"
          value={recipe.superfatPercentage}
          onChange={onChange}
          min="0"
          max="20"
          step="0.5"
        />
      </div>

      <div className="form-group">
        <label htmlFor="citricAcidPercentage">Zitronensäure (% des Ölgewichts):</label>
        <input
          type="number"
          id="citricAcidPercentage"
          name="citricAcidPercentage"
          value={recipe.citricAcidPercentage || ''}
          onChange={onChange}
          min="0"
          max="10"
          step="0.1"
          placeholder="0-5% typisch"
        />
      </div>

      <div className="form-group">
        <label htmlFor="waterPercentage">Wassermenge (% des Ölgewichts):</label>
        <input
          type="number"
          id="waterPercentage"
          name="waterPercentage"
          value={recipe.waterPercentage}
          onChange={onChange}
          min="25"
          max="50"
          step="1"
          placeholder="30% Standard"
        />
      </div>
    </>
  );
};

export default RecipeParameters;