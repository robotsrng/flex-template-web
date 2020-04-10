import React from 'react';
import css from './ListingSocialMediaCard.css';
import { abbreviateNumber } from '../../util/abbreviateNumber.js';

const ListingSocialMediaCard = ({ img, username, audience, platform, whiteLetters }) => {
  return (
    <div className={css.container}>
      <div className={css.imgContainer}>
        <img src={img} className={css.roundImg} alt=""></img>
      </div>
      <div className={css.col}>
        <div className={whiteLetters ? css.whiteLetters : ''}>
          <p className={css.userContent}>{username}</p>
          <p className={css.userContent}>{platform}</p>
          <p className={css.userContent}>{abbreviateNumber(audience, 0)} followers</p>
        </div>
      </div>
    </div>
  );
};

export default ListingSocialMediaCard;
