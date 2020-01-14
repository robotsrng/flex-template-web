import React from 'react';
import { bool } from 'prop-types';
import FollowerFilterPlain from './FollowerFilterPlain';
import FollowerFilterPopup from './FollowerFilterPopup';

const FollowerFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <FollowerFilterPopup {...rest} /> : <FollowerFilterPlain {...rest} />;
};

FollowerFilter.defaultProps = {
  showAsPopup: false,
};

FollowerFilter.propTypes = {
  showAsPopup: bool,
};

export default FollowerFilter;
