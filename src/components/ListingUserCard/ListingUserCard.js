import React from 'react';
import css from './ListingUserCard.css';
import altImg from './img/altImg.png';

const ListingUserCard = ({ img, username, userAudience, reviews }) => {
  const image = img ? img : altImg;
  return (
    <div className={css.container}>
      <div className={css.colInfo}>
        <div>
          <img src={image} className={css.roundImg} alt=""></img>
        </div>
        <div className={css.col}>
          <p className={css.username}>{username}</p>
          <p className={css.userContent}>{userAudience} audience</p>
          <p className={css.userContent}>
            &#9733; {reviews.rating} ({reviews.ammount})
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingUserCard;
