import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import css from './SectionRulesMaybe.css';

const SectionOfferingMaybe = props => {
  const { className, rootClassName, publicData } = props;
  const classes = classNames(rootClassName || css.root, className);
  return publicData && publicData.offering ? (
    <div className={classes}>
      <p>OFFERING</p>
    </div>
  ) : null;
};

SectionOfferingMaybe.defaultProps = { className: null, rootClassName: null };

SectionOfferingMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    offering: string,
  }),
};

export default SectionOfferingMaybe;
