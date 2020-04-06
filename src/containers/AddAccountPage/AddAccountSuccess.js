import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './AddAccountSuccess.css';

const AddAccountSuccessForm = props => {
  return (
    <h1>
      Your channel is <p className={css.greenText}>verified!</p>
    </h1>
  );
};

export default AddAccountSuccessForm;
