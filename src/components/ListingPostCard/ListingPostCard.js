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
  <div>
  {/* axels code */}
     <div><hr></hr>
       <div className={css.container}>
        {/* listing image */}
          <div style={{ backgroundImage: `url(${img})` }} className={css.imageWrapperBrilliant}>
               </div>

          <div className={css.width60}>
          {/* listing image */}
            <div>{postTitle && <p className={css.postTitleBrilliant}>{postTitle}</p>}
            </div>
          {/* post buttons */}
            <div className={css.postButtonsBrilliant}><h6>Photo Text</h6></div>

            <div>
          {/* social media account image */}
            <div className={css.width40}>
              <div className={css.postSocialImg}></div>
            </div>

          {/* social media username */}
               <div className={css.width60}>
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
            <div>

          {/* post value */}
            <div className={css.width30}>
            {postValue && (
          <div className={css.postContentBrilliant}>
            <p>{postValue}</p>
          </div>
        )}</div>

          {/* button */}
               <div className={css.width70}>
                 <button className={css.buttonBrilliant}><h5>view listing</h5></button>
               </div>
            </div>

          </div>
        </div>
      </div>
  </div>
  );
};

export default ListingPostCard;
