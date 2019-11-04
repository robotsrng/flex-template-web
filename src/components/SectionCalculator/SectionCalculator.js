import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SectionCalculator.css';
import SocialMediaButtons from '../SocialMediaButtons/SocialMediaButtons';

const SectionCalculator = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionCalculator.title" />
      </div>
      <div className={css.description}>
        <p>
          <FormattedMessage id="SectionCalculator.subTitle" />
        </p>
      </div>
      <SocialMediaButtons />
      <div className={css.calculatorInput}>
        <p>Username</p>
        <input></input>
        <a className={css.button}>Calculate</a>
      </div>
    </div>
  );
};

SectionCalculator.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionCalculator.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionCalculator;
