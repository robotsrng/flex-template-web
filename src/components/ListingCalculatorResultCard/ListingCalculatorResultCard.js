import React from 'react';
import css from './ListingCalculatorResultCard.css';

const ListingCalculatorResultCard = ({
  img,
  username,
  audience,
  platform,
  engagementRate,
  estimatedLowPrice,
  estimatedHighPrice,
}) => {
  return (
    <div className={css.container}>
      <div className={css.imgContainer}>
        <img src={img} className={css.roundImg} alt=""></img>
      </div>
      <div className={css.col}>
        <p className={css.userContent}>{username}</p>
        <p className={css.userContent}>
          {platform.replace(/^\w/, c => c.toUpperCase())}|{audience}
        </p>
        <p className={css.userContent}>{Math.round(engagementRate)}% Engagement</p>
        <p className={css.userContent}>
          ${Math.round(estimatedLowPrice)}-${Math.round(estimatedHighPrice)} per Post
        </p>
      </div>
    </div>
  );
};

export default ListingCalculatorResultCard;
