import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './SectionCalculator.css';
import { SocialMediaButtons } from '../../components';

const SectionCalculator = props => {
  const { rootClassName, className, title, description } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <h1>{title}</h1>
      </div>
      <div className={css.description}>
        <p>{description}</p>
      </div>
      <SocialMediaButtons />
      <div className={css.calculatorInput}>
        <p className={css.inputTitle}>Username</p>
        <input placeholder="username"></input>
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
