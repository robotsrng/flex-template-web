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
        <img className={css.img} src={img} alt=""></img>
        <div className={css.blogItemContent}>
        <div className={css.blogTitle}>{title}</div>
        <div className={css.blogDate}>{created}</div>
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
