import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './BlogItem.css';

const BlogItem = props => {
  const { rootClassName, className, img, title, created, description } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}></div>
    </div>
  );
};

BlogItem.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

BlogItem.propTypes = {
  rootClassName: string,
  className: string,
};

export default BlogItem;
