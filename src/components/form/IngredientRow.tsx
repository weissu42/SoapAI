import React from 'react';
import { Ingredient } from '../../types/Recipe';

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  onChange: (index: number, field: keyof Ingredient, value: string) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
}

const IngredientRow: React.FC<IngredientRowProps> = ({ ingredient, index, onChange, onRemove, disabled }) => {
  return (
    <div className="ingredient-row">
      <input
        type="text"
        placeholder="Zutat"
        value={ingredient.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
      />
      <input
        type="number"
        placeholder="Menge"
        value={ingredient.amount}
        onChange={(e) => onChange(index, 'amount', e.target.value)}
        step="0.1"
      />
      <select
        value={ingredient.unit}
        onChange={(e) => onChange(index, 'unit', e.target.value)}
      >
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="EL">EL</option>
        <option value="TL">TL</option>
        <option value="Tropfen">Tropfen</option>
      </select>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="remove-ingredient"
        disabled={disabled}
      >
        Entfernen
      </button>
    </div>
  );
};

export default IngredientRow;