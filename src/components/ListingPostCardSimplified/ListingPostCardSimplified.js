import React from 'react';
import { abbreviateString } from '../../util/data';
import css from './ListingPostCardSimplified.css';

const ListingPostCardSimplified = ({
  img,
  postTitle,
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
              <p className={css.postTitle}>{abbreviateString(postTitle)}</p>
              <p className={css.postContent}>{postSocialMedia}</p>
              <p className={css.postContent}>{postFollowerAmmount} followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className={css.valueContainer}>
        {postValue && (
          <div className={css.colValue}>
            <p>{postValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPostCardSimplified;
