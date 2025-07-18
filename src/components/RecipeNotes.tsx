import React from 'react';

interface RecipeNotesProps {
  notes: string;
}

const RecipeNotes: React.FC<RecipeNotesProps> = ({ notes }) => {
  if (!notes) {
    return null;
  }

  return (
    <div className="recipe-notes">
      <h4>Notizen:</h4>
      <p>{notes}</p>
    </div>
  );
};

export default RecipeNotes;