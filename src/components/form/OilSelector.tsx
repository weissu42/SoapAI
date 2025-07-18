import React from 'react';
import { SoapOil } from '../../types/Recipe';
import { OILS_DATABASE } from '../../data/oils';

interface OilSelectorProps {
  oil: SoapOil;
  index: number;
  onChange: (index: number, field: keyof SoapOil, value: string | number) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
}

const OilSelector: React.FC<OilSelectorProps> = ({ oil, index, onChange, onRemove, disabled }) => {
  return (
    <div className="oil-row">
      <select
        value={oil.oilId}
        onChange={(e) => onChange(index, 'oilId', e.target.value)}
        required
      >
        <option value="">Öl auswählen</option>
        {OILS_DATABASE
          .sort((a, b) => a.nameDE.localeCompare(b.nameDE))
          .map(oilData => (
            <option key={oilData.id} value={oilData.id}>
              {oilData.nameDE}
            </option>
          ))}
      </select>
      <input
        type="number"
        placeholder="Gewicht (g)"
        value={oil.weight || ''}
        onChange={(e) => onChange(index, 'weight', e.target.value)}
        min="0"
        step="0.1"
      />
      <span className="percentage">{oil.percentage.toFixed(1)}%</span>
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

export default OilSelector;