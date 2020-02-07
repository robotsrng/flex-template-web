import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { arrayOf, string } from 'prop-types';
import classNames from 'classnames';
import { Avatar, AvatarReview, ReviewRating, UserDisplayName } from '../../components';
import { propTypes } from '../../util/types';

import css from './Reviews.css';

const Review = props => {
  const { review, intl } = props;

  const date = review.attributes.createdAt;
  const dateString = intl.formatDate(date, { month: 'long', year: 'numeric' });
  const username = review.author.attributes.profile.publicData.username;

  return (
    <div className={css.review}>
      <AvatarReview className={css.avatar} user={review.author} />
      <div>

        {/* <p className={css.reviewContent}>{review.attributes.content}</p> */}
        <p className={css.reviewInfo}>
          {/* <UserDisplayName user={review.author} intl={intl} /> */}
          {/* <p>{review.author.attributes.profile.profileData.username}</p> */}
          {/* <span className={css.separator}>•</span> */}
          <p className={css.username}>{username}</p>
          <p className={css.date}>{dateString}</p>
          <p className={css.rating}>&#9733; <span>{review.attributes.rating}</span></p>
          {/* <ReviewRating
            rating={review.attributes.rating}
            className={css.mobileReviewRating}
            reviewStarClassName={css.reviewRatingStar}
          /> */}
          {/* <span className={css.desktopSeparator}>•</span> */}
          {/* <span className={css.desktopReviewRatingWrapper}>
            <ReviewRating
              rating={review.attributes.rating}
              className={css.desktopReviewRating}
              reviewStarClassName={css.reviewRatingStar}
            />
          </span> */}
        </p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: propTypes.review.isRequired,
  intl: intlShape.isRequired,
};

const ReviewsComponent = props => {
  const { className, rootClassName, reviews, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <ul className={classes}>
      {reviews.map(r => {
        return (
          <li key={`Review_${r.id.uuid}`} className={css.reviewItem}>
            <Review review={r} intl={intl} />
          </li>
        );
      })}
    </ul>
  );
};

ReviewsComponent.defaultProps = {
  className: null,
  rootClassName: null,
  reviews: [],
};

ReviewsComponent.propTypes = {
  className: string,
  rootCalssName: string,
  reviews: arrayOf(propTypes.review),

  // from injectIntl
  intl: intlShape.isRequired,
};

const Reviews = injectIntl(ReviewsComponent);

export default Reviews;
