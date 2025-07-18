import React from 'react';

interface FormActionsProps {
  isEditing: boolean;
  onCancel?: () => void;
  canSubmit: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel, canSubmit }) => {
  return (
    <div className="form-actions">
      <button type="submit" className="submit-btn" disabled={!canSubmit}>
        {isEditing ? 'Änderungen speichern' : 'Rezept speichern'}
      </button>
      {isEditing && onCancel && (
        <button type="button" onClick={onCancel} className="cancel-btn">
          Abbrechen
        </button>
      )}
    </div>
  );
};

export default FormActions;