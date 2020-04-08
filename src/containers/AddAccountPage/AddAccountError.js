import React from 'react';

import css from './AddAccountSuccess.css';

const AddAccountErrorForm = props => {
  return (
    <React.Fragment>
      <div className={css.container}>
        <h1>
          Your channel<span className={css.redText}> failed </span>to verify
        </h1>
      </div>
      <button className={css.submitButton} onClick={props.clearAll}>
        Back
      </button>
    </React.Fragment>
  );
};

export default AddAccountErrorForm;
