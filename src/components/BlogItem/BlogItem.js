import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './BlogItem.css';

const BlogItem = props => {
  const { rootClassName, className, img, title, created } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (

    <div className={classes}>

      <div className={css.blogItemContainer}>

        <div className={css.diamondOne}>
        <img className={css.diamondTwo} src={img} alt=""></img>
        </div>
        <div className={css.blogItemContent}>
        <h3>{title}</h3>
        <p>{created}</p>
        </div>
    

      </div>

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
