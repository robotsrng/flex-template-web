import React from 'react';
import css from './AccountExampleView.css';

const AccountExampleView = ({ img, postTitle, postUsername, postFollowerAmmount, postValue }) => {
  return (
    <div className={css.examples}>
      <div className={css.col}>
        <img src={img} className={css.img}></img>
      </div>
      <div className={css.col}>
        <p>{postTitle}</p>
        <p>{postUsername}</p>
        <p>{postFollowerAmmount}</p>
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
