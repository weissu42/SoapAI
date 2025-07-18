import React from 'react';

interface RecipeNotesProps {
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RecipeNotes: React.FC<RecipeNotesProps> = ({ notes, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="notes">Notizen:</label>
      <textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={onChange}
        rows={3}
      />
    </div>
  );
};

export default RecipeNotes;