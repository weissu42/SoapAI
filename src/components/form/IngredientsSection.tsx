import React from 'react';
import { Ingredient } from '../../types/Recipe';
import IngredientRow from './IngredientRow';

interface IngredientsSectionProps {
  ingredients: Ingredient[];
  onChange: (index: number, field: keyof Ingredient, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ ingredients, onChange, onAdd, onRemove }) => {
  return (
    <div className="form-group">
      <label>Zusätzliche Zutaten:</label>
      {ingredients.map((ingredient, index) => (
        <IngredientRow
          key={index}
          ingredient={ingredient}
          index={index}
          onChange={onChange}
          onRemove={onRemove}
          disabled={ingredients.length === 1}
        />
      ))}
      <button type="button" onClick={onAdd} className="add-ingredient">
        Zutat hinzufügen
      </button>
    </div>
  );
};

export default IngredientsSection;