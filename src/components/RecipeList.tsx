import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onDelete, onEdit }) => {
  if (recipes.length === 0) {
    return (
      <div className="recipe-list">
        <h2>Meine Seifenrezepte</h2>
        <p className="no-recipes">Noch keine Rezepte vorhanden. Erstelle dein erstes Rezept!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>Meine Seifenrezepte ({recipes.length})</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <h3>{recipe.name}</h3>
              <div className="recipe-actions">
                <button 
                  onClick={() => onEdit(recipe)}
                  className="edit-btn"
                  title="Rezept bearbeiten"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(recipe.id)}
                  className="delete-btn"
                  title="Rezept löschen"
                >
                  ×
                </button>
              </div>
            </div>
            
            {recipe.description && (
              <p className="recipe-description">{recipe.description}</p>
            )}
            
            <div className="recipe-soap-oils">
              <h4>Öle und Fette:</h4>
              <ul>
                {recipe.soapOils.map((oil, index) => (
                  <li key={index}>
                    {oil.oilName} - {oil.weight}g ({oil.percentage}%)
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-calculations">
              <h4>NaOH-Berechnungen:</h4>
              <div className="calculation-summary">
                <div><strong>Gesamtölgewicht:</strong> {recipe.calculations.totalOilWeight}g</div>
                <div><strong>NaOH benötigt:</strong> {recipe.calculations.naohWeight}g</div>
                <div><strong>Wasser benötigt:</strong> {recipe.calculations.waterWeight}g</div>
                <div><strong>Überfettung:</strong> {recipe.calculations.superfatPercentage}%</div>
                {recipe.calculations.citricAcidWeight && (
                  <div><strong>Zitronensäure:</strong> {recipe.calculations.citricAcidWeight}g</div>
                )}
                {recipe.calculations.additionalNaohForCitricAcid && (
                  <div><strong>Zusätzliche NaOH:</strong> {recipe.calculations.additionalNaohForCitricAcid}g</div>
                )}
              </div>
            </div>

            <div className="recipe-properties">
              <h4>Seifeneigenschaften:</h4>
              <div className="properties-summary">
                <span>Härte: {recipe.calculations.properties.hardness}</span>
                <span>Pflege: {recipe.calculations.properties.conditioning}</span>
                <span>Schaum: {recipe.calculations.properties.bubbly}</span>
                <span>Reinigung: {recipe.calculations.properties.cleansing}</span>
              </div>
            </div>

            {recipe.ingredients.some(ing => ing.name.trim()) && (
              <div className="recipe-ingredients">
                <h4>Zusätzliche Zutaten:</h4>
                <ul>
                  {recipe.ingredients.filter(ing => ing.name.trim()).map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name}
                      {ingredient.amount && ` - ${ingredient.amount} ${ingredient.unit}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recipe.instructions && (
              <div className="recipe-instructions">
                <h4>Anleitung:</h4>
                <p>{recipe.instructions}</p>
              </div>
            )}
            
            {recipe.notes && (
              <div className="recipe-notes">
                <h4>Notizen:</h4>
                <p>{recipe.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;