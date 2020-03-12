import React from 'react';

import css from './ListingContactCard.css';

export const ListingContactCard = ({ icon, title }) => {
  return (
    <div className={css.root}>
      <img className={css.iconImage} src={icon} alt="" />
      <h3 className={css.title}>{title}</h3>
    </div>
  );
};
