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
  const roundEngagement = num => {
    return Math.round(num * 1000) / 10;
  };
  const round = num => {
    return Math.round(num * 10) / 10;
  };
  const upperCaseFirst = word => {
    return word.replace(/^\w/, c => c.toUpperCase());
  };
  return (
    <div className={css.container}>
      <div className={css.imgContainer}>
        <img src={img} className={css.roundImg} alt=""></img>
      </div>
      <div className={css.col}>
        <p className={css.userContent}>{username}</p>
        <p className={css.userContent}>
          {upperCaseFirst(platform)} | {audience} Followers
        </p>
        <p className={css.userContent}>{roundEngagement(engagementRate)}% Engagement</p>
        <p className={css.userContent}>
          ${round(estimatedLowPrice)}-${round(estimatedHighPrice)} per Post
        </p>
      </div>
    </div>
  );
};

export default ListingCalculatorResultCard;
