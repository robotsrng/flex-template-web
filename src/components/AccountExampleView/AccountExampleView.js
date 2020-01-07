import React from 'react';
import css from './AccountExampleView.css';

const AccountExampleView = ({
  whiteLetters,
  cssImg,
  img,
  postTitle,
  postUsername,
  postFollowerAmmount,
  postValue,
  postValueMaybe,
  postSocialMedia,
}) => {
  return (
    <div className={css.examples}>
      <div className={css.colInfo}>
        <div>
          <img src={img} className={cssImg ? css.roundImg : css.img}></img>
        </div>
        <div className={css.col}>
          <div className={whiteLetters ? css.whiteLetters : undefined}>
            {postTitle && <p className={css.postTitle}>{postTitle}</p>}
            <p className={css.postContent}>{postUsername}</p>
            {postSocialMedia ? (
              <p className={css.postContent}>
                {postSocialMedia} | {postFollowerAmmount}
              </p>
            ) : (
              <p className={css.postContent}>{postFollowerAmmount}</p>
            )}
            {postValueMaybe && <p className={css.postContent}>{postValueMaybe}</p>}
          </div>
        </div>
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
