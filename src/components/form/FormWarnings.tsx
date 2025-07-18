import React from 'react';

interface FormWarningsProps {
  warnings: string[];
}

const FormWarnings: React.FC<FormWarningsProps> = ({ warnings }) => {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="warnings">
      <h4>Warnungen:</h4>
      <ul>
        {warnings.map((warning, index) => (
          <li key={index}>{warning}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormWarnings;