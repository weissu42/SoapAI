import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient, SoapOil } from '../types/Recipe';
import { OILS_DATABASE } from '../data/oils';
import { calculateSoapFormula, validateSoapRecipe, SoapIngredient, DEFAULT_SUPERFAT_PERCENTAGE, DEFAULT_WATER_PERCENTAGE } from '../utils/soapCalculations';

interface SoapRecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  initialRecipe?: Recipe | null;
  onCancel?: () => void;
  isEditing?: boolean;
}

const SoapRecipeForm: React.FC<SoapRecipeFormProps> = ({ onSubmit, initialRecipe, onCancel, isEditing = false }) => {
  const [recipe, setRecipe] = useState<Omit<Recipe, 'id'>>({
    name: '',
    description: '',
    ingredients: [{ name: '', amount: '', unit: 'g' }],
    soapOils: [{ oilId: '', oilName: '', weight: 0, percentage: 0 }],
    calculations: {
      totalOilWeight: 0,
      naohWeight: 0,
      waterWeight: 0,
      superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
      properties: {
        hardness: 0,
        cleansing: 0,
        conditioning: 0,
        bubbly: 0,
        creamy: 0,
        iodine: 0,
        ins: 0
      }
    },
    notes: '',
    superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
    citricAcidPercentage: 0,
    waterPercentage: DEFAULT_WATER_PERCENTAGE
  });

  const [warnings, setWarnings] = useState<string[]>([]);

  // Initialisiere Formular mit existierendem Rezept beim Bearbeiten
  useEffect(() => {
    if (isEditing && initialRecipe) {
      const { id, ...recipeData } = initialRecipe;
      setRecipe(recipeData);
    }
  }, [isEditing, initialRecipe]);

  // Berechnung der Seifeneigenschaften bei Änderungen
  useEffect(() => {
    const validOils = recipe.soapOils.filter(oil => oil.oilId && oil.weight > 0);
    if (validOils.length > 0) {
      const soapIngredients: SoapIngredient[] = validOils.map(oil => ({
        oilId: oil.oilId,
        weight: oil.weight
      }));

      const calculations = calculateSoapFormula(soapIngredients, recipe.superfatPercentage, recipe.citricAcidPercentage, recipe.waterPercentage);
      const recipeWarnings = validateSoapRecipe(soapIngredients);

      setRecipe(prev => ({
        ...prev,
        calculations
      }));
      setWarnings(recipeWarnings);
    } else {
      setWarnings([]);
    }
  }, [recipe.soapOils, recipe.superfatPercentage, recipe.citricAcidPercentage, recipe.waterPercentage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'superfatPercentage') {
      setRecipe(prev => ({
        ...prev,
        [name]: parseFloat(value) || DEFAULT_SUPERFAT_PERCENTAGE
      }));
    } else if (name === 'citricAcidPercentage') {
      setRecipe(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else if (name === 'waterPercentage') {
      setRecipe(prev => ({
        ...prev,
        [name]: parseFloat(value) || DEFAULT_WATER_PERCENTAGE
      }));
    } else {
      setRecipe(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
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

    // Berechne Prozentsätze neu
    const totalWeight = newOils.reduce((sum, oil) => sum + oil.weight, 0);
    if (totalWeight > 0) {
      newOils.forEach(oil => {
        oil.percentage = Math.round((oil.weight / totalWeight) * 100 * 100) / 100;
      });
    }

    setRecipe(prev => ({
      ...prev,
      soapOils: newOils
    }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: 'g' }]
    }));
  };

  const removeIngredient = (index: number) => {
    if (recipe.ingredients.length > 1) {
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const addOil = () => {
    setRecipe(prev => ({
      ...prev,
      soapOils: [...prev.soapOils, { oilId: '', oilName: '', weight: 0, percentage: 0 }]
    }));
  };

  const removeOil = (index: number) => {
    if (recipe.soapOils.length > 1) {
      const newOils = recipe.soapOils.filter((_, i) => i !== index);
      setRecipe(prev => ({
        ...prev,
        soapOils: newOils
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe.name.trim() && recipe.soapOils.some(oil => oil.oilId && oil.weight > 0)) {
      onSubmit(recipe);
      if (!isEditing) {
        setRecipe({
          name: '',
          description: '',
          ingredients: [{ name: '', amount: '', unit: 'g' }],
          soapOils: [{ oilId: '', oilName: '', weight: 0, percentage: 0 }],
          calculations: {
            totalOilWeight: 0,
            naohWeight: 0,
            waterWeight: 0,
            superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
            properties: {
              hardness: 0,
              cleansing: 0,
              conditioning: 0,
              bubbly: 0,
              creamy: 0,
              iodine: 0,
              ins: 0
            }
          },
                notes: '',
          superfatPercentage: DEFAULT_SUPERFAT_PERCENTAGE,
          citricAcidPercentage: 0,
          waterPercentage: DEFAULT_WATER_PERCENTAGE
        });
        setWarnings([]);
      }
    }
  };

  return (
    <div className="recipe-form">
      <h2>{isEditing ? 'Seifenrezept bearbeiten' : 'Neues Seifenrezept erstellen'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Rezeptname:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Beschreibung:</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="superfatPercentage">Überfettung (%):</label>
          <input
            type="number"
            id="superfatPercentage"
            name="superfatPercentage"
            value={recipe.superfatPercentage}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            min="25"
            max="50"
            step="1"
            placeholder="30% Standard"
          />
        </div>

        <div className="form-group">
          <label>Öle und Fette:</label>
          {recipe.soapOils.map((oil, index) => (
            <div key={index} className="oil-row">
              <select
                value={oil.oilId}
                onChange={(e) => handleOilChange(index, 'oilId', e.target.value)}
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
                onChange={(e) => handleOilChange(index, 'weight', e.target.value)}
                min="0"
                step="0.1"
              />
              <span className="percentage">{oil.percentage.toFixed(1)}%</span>
              <button
                type="button"
                onClick={() => removeOil(index)}
                className="remove-ingredient"
                disabled={recipe.soapOils.length === 1}
              >
                Entfernen
              </button>
            </div>
          ))}
          <button type="button" onClick={addOil} className="add-ingredient">
            Öl hinzufügen
          </button>
        </div>

        {recipe.calculations.totalOilWeight > 0 && (
          <div className="calculations">
            <h3>Berechnungen:</h3>
            <div className="calculation-grid">
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
            
            <h4>Seifeneigenschaften:</h4>
            <div className="properties-grid">
              <div>Härte: {recipe.calculations.properties.hardness}</div>
              <div>Reinigung: {recipe.calculations.properties.cleansing}</div>
              <div>Pflege: {recipe.calculations.properties.conditioning}</div>
              <div>Schaum: {recipe.calculations.properties.bubbly}</div>
              <div>Cremigkeit: {recipe.calculations.properties.creamy}</div>
              <div>Jodzahl: {recipe.calculations.properties.iodine}</div>
            </div>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="warnings">
            <h4>Warnungen:</h4>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
          <label>Zusätzliche Zutaten:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Zutat"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Menge"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                step="0.1"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="EL">EL</option>
                <option value="TL">TL</option>
                <option value="Tropfen">Tropfen</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-ingredient"
                disabled={recipe.ingredients.length === 1}
              >
                Entfernen
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-ingredient">
            Zutat hinzufügen
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notizen:</label>
          <textarea
            id="notes"
            name="notes"
            value={recipe.notes}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Änderungen speichern' : 'Rezept speichern'}
          </button>
          {isEditing && onCancel && (
            <button type="button" onClick={onCancel} className="cancel-btn">
              Abbrechen
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SoapRecipeForm;