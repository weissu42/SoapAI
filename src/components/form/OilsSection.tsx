import React from 'react';
import { SoapOil } from '../../types/Recipe';
import OilSelector from './OilSelector';

interface OilsSectionProps {
  oils: SoapOil[];
  onChange: (index: number, field: keyof SoapOil, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const OilsSection: React.FC<OilsSectionProps> = ({ oils, onChange, onAdd, onRemove }) => {
  return (
    <div className="form-group">
      <label>Öle und Fette:</label>
      {oils.map((oil, index) => (
        <OilSelector
          key={index}
          oil={oil}
          index={index}
          onChange={onChange}
          onRemove={onRemove}
          disabled={oils.length === 1}
        />
      ))}
      <button type="button" onClick={onAdd} className="add-ingredient">
        Öl hinzufügen
      </button>
    </div>
  );
};

export default OilsSection;