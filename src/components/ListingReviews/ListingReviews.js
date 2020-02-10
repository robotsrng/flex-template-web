import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { arrayOf, string } from 'prop-types';
import classNames from 'classnames';
import { AvatarReview } from '../../components';
import { propTypes } from '../../util/types';

import css from './ListingReviews.css';

const ListingReviewCard = props => {
  const { review, intl } = props;

  const date = review.attributes.createdAt;
  const dateString = intl.formatDate(date, { month: 'long', year: 'numeric' });
  const username = review.author.attributes.profile.publicData.username;

  return (
    <div className={css.review}>
      <AvatarReview className={css.avatar} user={review.author} />
      <div>

        <div className={css.reviewInfo}>
          <p className={css.username}>{username}</p>
          <p className={css.date}>{dateString}</p>
          <p className={css.rating}>&#9733; <span>{review.attributes.rating}</span></p>
        </div>
      </div>
    </div>
  );
};

ListingReviewCard.propTypes = {
  review: propTypes.review.isRequired,
  intl: intlShape.isRequired,
};

const ListingReviewsComponent = props => {
  const { className, rootClassName, reviews, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <ul className={classes}>
      {reviews.map(r => {
        return (
          <li key={`Review_${r.id.uuid}`} className={css.reviewItem}>
            <ListingReviewCard review={r} intl={intl} />
          </li>
        );
      })}
    </ul>
  );
};

ListingReviewsComponent.defaultProps = {
  className: null,
  rootClassName: null,
  reviews: [],
};

ListingReviewsComponent.propTypes = {
  className: string,
  rootCalssName: string,
  reviews: arrayOf(propTypes.review),

  // from injectIntl
  intl: intlShape.isRequired,
};

const ListingReviews = injectIntl(ListingReviewsComponent);

export default ListingReviews;
