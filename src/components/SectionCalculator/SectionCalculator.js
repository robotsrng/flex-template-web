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
      <p>
        <FormattedMessage id="SectionCalculator.subTitle" />
      </p>
      <SocialMediaButtons />
      <p>Username</p>
      <input></input>
      <button className={css.button}>Calculate</button>
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
