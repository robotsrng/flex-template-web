import React from 'react';
import css from './ListingUserCard.css';
import altImg from './img/altImg.png';
import { abbreviateNumber } from '../../util/data';

const ListingUserCard = ({ img, username, userAudience, reviews, mapCard }) => {
  const image = img ? img : altImg;
  return (
    <div className={css.container}>
      <div className={mapCard ? css.colInfo : css.colInfoMap}>
        <div>
          <img src={image} className={css.roundImg} alt=""></img>
        </div>
        <div className={css.col}>
          <p className={css.username}>{username}</p>
          <p className={css.userContent}>{abbreviateNumber(userAudience)} audience</p>
          <p className={css.userContent}>
            &#9733; {reviews.rating} ({reviews.ammount})
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingUserCard;
