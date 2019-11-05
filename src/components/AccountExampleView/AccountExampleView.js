import React from 'react';
import css from './AccountExampleView.css';

const AccountExampleView = ({
  cssImg,
  img,
  postTitle,
  postUsername,
  postFollowerAmmount,
  postValue,
}) => {
  return (
    <div className={css.examples}>
      <div className={css.col}>
        <img src={img} className={cssImg ? css.roundImg : css.img}></img>
      </div>
      <div className={css.col}>
        <p className={css.postTitle}>{postTitle}</p>
        <p className={css.postContent}>{postUsername}</p>
        <p className={css.postContent}>{postFollowerAmmount}</p>
      </div>
      {postValue && (
        <div className={css.colValue}>
          <p>{postValue}</p>
        </div>
      )}
    </div>
  );
};

export default AccountExampleView;
