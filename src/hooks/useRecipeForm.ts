import { useState, useEffect } from 'react';
import { Recipe, Ingredient, SoapOil } from '../types/Recipe';
import { OILS_DATABASE } from '../data/oils';
import { DEFAULT_SUPERFAT_PERCENTAGE, DEFAULT_WATER_PERCENTAGE } from '../utils/soapCalculations';
import { useRecipeCalculations } from './useRecipeCalculations';
import { 
  createEmptyRecipe, 
  calculateOilPercentages, 
  addEmptyIngredient, 
  removeIngredient, 
  addEmptyOil, 
  removeOil, 
  updateIngredient 
} from '../utils/formUtils';

export const useRecipeForm = (
  initialRecipe?: Recipe | null,
  isEditing: boolean = false
) => {
  const [recipe, setRecipe] = useState<Omit<Recipe, 'id'>>(createEmptyRecipe());
  
  const { calculations, warnings } = useRecipeCalculations(
    recipe.soapOils,
    recipe.superfatPercentage,
    recipe.citricAcidPercentage || 0,
    recipe.waterPercentage
  );

  // Initialize form with existing recipe when editing
  useEffect(() => {
    if (isEditing && initialRecipe) {
      const { id, ...recipeData } = initialRecipe;
      setRecipe(recipeData);
    }
  }, [isEditing, initialRecipe]);

  // Update calculations when they change
  useEffect(() => {
    setRecipe(prev => ({
      ...prev,
      calculations
    }));
  }, [calculations]);

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: number;
    
    if (name === 'superfatPercentage') {
      parsedValue = parseFloat(value) || DEFAULT_SUPERFAT_PERCENTAGE;
    } else if (name === 'citricAcidPercentage') {
      parsedValue = parseFloat(value) || 0;
    } else if (name === 'waterPercentage') {
      parsedValue = parseFloat(value) || DEFAULT_WATER_PERCENTAGE;
    } else {
      parsedValue = parseFloat(value) || 0;
    }
    
    setRecipe(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = updateIngredient(recipe.ingredients, index, field, value);
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleOilChange = (index: number, field: keyof SoapOil, value: string | number) => {
    const newOils = [...recipe.soapOils];
    
    if (field === 'oilId') {
      const oil = OILS_DATABASE.find(o => o.id === value);
      newOils[index] = {
        ...newOils[index],
        oilId: value as string,
        oilName: oil?.nameDE || ''
      };
    } else if (field === 'weight') {
      const weight = parseFloat(value as string) || 0;
      newOils[index] = {
        ...newOils[index],
        weight
      };
    }

    const updatedOils = calculateOilPercentages(newOils);
    setRecipe(prev => ({
      ...prev,
      soapOils: updatedOils
    }));
  };

  const handleAddIngredient = () => {
    const newIngredients = addEmptyIngredient(recipe.ingredients);
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = removeIngredient(recipe.ingredients, index);
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleAddOil = () => {
    const newOils = addEmptyOil(recipe.soapOils);
    setRecipe(prev => ({
      ...prev,
      soapOils: newOils
    }));
  };

  const handleRemoveOil = (index: number) => {
    const newOils = removeOil(recipe.soapOils, index);
    const updatedOils = calculateOilPercentages(newOils);
    setRecipe(prev => ({
      ...prev,
      soapOils: updatedOils
    }));
  };

  const resetForm = () => {
    setRecipe(createEmptyRecipe());
  };

  const canSubmit = recipe.name.trim() && recipe.soapOils.some(oil => oil.oilId && oil.weight > 0);

  return {
    recipe,
    warnings,
    canSubmit,
    handlers: {
      handleBasicInfoChange,
      handleParameterChange,
      handleIngredientChange,
      handleOilChange,
      handleAddIngredient,
      handleRemoveIngredient,
      handleAddOil,
      handleRemoveOil,
      resetForm
    }
  };
};