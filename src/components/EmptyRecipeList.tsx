import React from 'react';

const EmptyRecipeList: React.FC = () => {
  return (
    <div className="recipe-list">
      <h2>Meine Seifenrezepte</h2>
      <p className="no-recipes">Noch keine Rezepte vorhanden. Erstelle dein erstes Rezept!</p>
    </div>
  );
};

export default EmptyRecipeList;