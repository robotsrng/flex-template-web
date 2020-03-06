import React from 'react';
import css from './VerificationCodeField.css';

const VerificationCodeField = ({ code }) => {
  const separatedCode = code.split('');
  return (
    <div className={css.container}>
      {separatedCode.map(c => (
        <div className={css.codeContainer}>
          <p className={css.code}>{c}</p>
        </div>
      ))}
    </div>
  );
};

export default VerificationCodeField;
