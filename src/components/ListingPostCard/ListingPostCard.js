import React from 'react';
import css from './ListingPostCard.css';

const ListingPostCard = ({
  img,
  postTitle,
  postUsername,
  postFollowerAmmount,
  postValue,
  postValueMaybe,
  postSocialMedia,
}) => {
  return (
    <div className={css.container}>
      <div className={css['col-9']}>
        <div className={css.colInfo}>
          {/* <div>
          <img src={img} className={css.img} alt=""></img>
        </div> */}
          <div className={css['col-3']}>
            <div style={{ backgroundImage: `url(${img})` }} className={css.imageWrapper}>
              {/* <img src={img} className={css.img} alt=""></img> */}
            </div>
          </div>
          <div className={css['col-9']}>
            <div className={css.col}>
              {postTitle && <p className={css.postTitle}>{postTitle}</p>}
              <p className={css.postContent}>{postUsername}</p>
              {postSocialMedia ? (
                <p className={css.postContent}>
                  {postSocialMedia} | {postFollowerAmmount}
                </p>
              ) : (
                  <p className={css.postContent}>{postFollowerAmmount}</p>
                )}
              <p className={css.postContent}>{postValueMaybe}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={css['col-3']}>
        {postValue && (
          <div className={css.colValue}>
            <p>{postValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPostCard;
