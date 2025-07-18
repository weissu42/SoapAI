import React from 'react';
import { Recipe } from '../types/Recipe';
import { useRecipeForm } from '../hooks/useRecipeForm';
import RecipeBasicInfo from './form/RecipeBasicInfo';
import RecipeParameters from './form/RecipeParameters';
import OilsSection from './form/OilsSection';
import IngredientsSection from './form/IngredientsSection';
import FormCalculationsDisplay from './form/FormCalculationsDisplay';
import FormWarnings from './form/FormWarnings';
import FormActions from './form/FormActions';
import RecipeNotes from './form/RecipeNotes';

interface SoapRecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  initialRecipe?: Recipe | null;
  onCancel?: () => void;
  isEditing?: boolean;
}

const SoapRecipeForm: React.FC<SoapRecipeFormProps> = ({onSubmit, initialRecipe, onCancel, isEditing = false}) => {
  const {
    recipe,
    warnings,
    canSubmit,
    handlers
  } = useRecipeForm(initialRecipe, isEditing);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit(recipe);
      if (!isEditing) {
        handlers.resetForm();
      }
    }
  };

  return (
    <div className="recipe-form">
      <h2>{isEditing ? 'Seifenrezept bearbeiten' : 'Neues Seifenrezept erstellen'}</h2>
      <form onSubmit={handleSubmit}>
        <RecipeBasicInfo
          recipe={recipe}
          onChange={handlers.handleBasicInfoChange}
        />
        
        <RecipeParameters
          recipe={recipe}
          onChange={handlers.handleParameterChange}
        />
        
        <OilsSection
          oils={recipe.soapOils}
          onChange={handlers.handleOilChange}
          onAdd={handlers.handleAddOil}
          onRemove={handlers.handleRemoveOil}
        />
        
        <FormCalculationsDisplay
          calculations={recipe.calculations}
          show={recipe.calculations.totalOilWeight > 0}
        />
        
        <FormWarnings warnings={warnings} />
        
        <IngredientsSection
          ingredients={recipe.ingredients}
          onChange={handlers.handleIngredientChange}
          onAdd={handlers.handleAddIngredient}
          onRemove={handlers.handleRemoveIngredient}
        />
        
        <RecipeNotes
          notes={recipe.notes}
          onChange={handlers.handleBasicInfoChange}
        />
        
        <FormActions
          isEditing={isEditing}
          onCancel={onCancel}
          canSubmit={!!canSubmit}
        />
      </form>
    </div>
  );
};

export default SoapRecipeForm;