import React from 'react';

import css from './ListingContactCard.css';

export const ListingContactCard = ({ icon, title }) => {
  return (
    <div className={css.root}>
      <img className={css.iconImage} src={icon} alt="" />
      <h2 className={css.title}>{title}</h2>
    </div>
  );
};
