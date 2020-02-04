import React from 'react';
import css from './ListingSocialMediaCard.css';

const ListingSocialMediaCard = ({ img, username, audience, platform, whiteLetters }) => {
  return (
    <div className={css.container}>
      <img src={img} className={css.roundImg} alt=""></img>
      <div className={css.col}>
        <div className={whiteLetters ? css.whiteLetters : ''}>
          <p className={css.userContent}>{username}</p>
          <p className={css.userContent}>{platform}</p>
          <p className={css.userContent}>{audience}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingSocialMediaCard;
