import React from 'react';
import css from './ListingUserCard.css';

const ListingUserCard = ({ img, username, userAudience, reviews }) => {
  return (
    <div className={css.container}>
      <div className={css.colInfo}>
        <div>
          <img src={img} className={css.roundImg} alt=""></img>
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
