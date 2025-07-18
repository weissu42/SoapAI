import React from 'react';

interface RecipePropertiesProps {
  properties: {
    hardness: number;
    cleansing: number;
    conditioning: number;
    bubbly: number;
    creamy: number;
    iodine: number;
    ins: number;
  };
}

const RecipeProperties: React.FC<RecipePropertiesProps> = ({ properties }) => {
  return (
    <div className="recipe-properties">
      <h4>Seifeneigenschaften:</h4>
      <div className="properties-summary">
        <span>Härte: {properties.hardness}</span>
        <span>Pflege: {properties.conditioning}</span>
        <span>Schaum: {properties.bubbly}</span>
        <span>Reinigung: {properties.cleansing}</span>
      </div>
    </div>
  );
};

export default RecipeProperties;