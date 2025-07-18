import React, { useState } from 'react';
import './App.css';
import SoapRecipeForm from './components/SoapRecipeForm';
import RecipeList from './components/RecipeList';
import { Recipe } from './types/Recipe';

type ViewType = 'list' | 'create' | 'edit';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
    setCurrentView('list');
  };

  const updateRecipe = (recipe: Omit<Recipe, 'id'>) => {
    if (editingRecipe) {
      setRecipes(recipes.map(r => 
        r.id === editingRecipe.id ? { ...recipe, id: editingRecipe.id } : r
      ));
      setEditingRecipe(null);
      setCurrentView('list');
    }
  };

  const startEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setCurrentView('edit');
  };

  const cancelEdit = () => {
    setEditingRecipe(null);
    setCurrentView('list');
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Seifenrezept-App</h1>
        <nav>
          <button 
            className={currentView === 'list' ? 'active' : ''}
            onClick={() => setCurrentView('list')}
          >
            Rezepte anzeigen
          </button>
          <button 
            className={currentView === 'create' ? 'active' : ''}
            onClick={() => setCurrentView('create')}
          >
            Neues Rezept
          </button>
        </nav>
      </header>
      
      <main>
        {currentView === 'list' ? (
          <RecipeList recipes={recipes} onDelete={deleteRecipe} onEdit={startEdit} />
        ) : currentView === 'edit' ? (
          <SoapRecipeForm 
            onSubmit={updateRecipe} 
            initialRecipe={editingRecipe} 
            onCancel={cancelEdit}
            isEditing={true}
          />
        ) : (
          <SoapRecipeForm onSubmit={addRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;