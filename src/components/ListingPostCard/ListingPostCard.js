import React from 'react';
import css from './ListingPostCard.css';

const ListingPostCard = ({
  img,
  postTitle,
  postUsername,
  postFollowerAmmount,
  postValue,
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
              {postUsername ? (
                <React.Fragment>
                  <p className={css.postContent}>{postUsername}</p>
                  <p className={css.postContent}>
                    {postSocialMedia} | {postFollowerAmmount}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className={css.postContent}>{postSocialMedia}</p>
                  <p className={css.postContent}>{postFollowerAmmount} followers</p>
                </React.Fragment>
              )}
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
