import React, { Component } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { formatMoneyInteger } from '../../util/currency';
import { ensureListing, abbreviateString } from '../../util/data';
import { ListingPostCardSimplified, ListingUserCard } from '../../components';

import css from './SearchMapInfoCard.css';

// ListingCard is the listing info without overlayview or carousel controls
const ListingCard = props => {
  const { className, clickHandler, intl, isInCarousel, listing, urlToListing } = props;
  const { title, price, publicData } = listing.attributes;
  const formattedPrice =
    price && price.currency === config.currency ? formatMoneyInteger(intl, price) : price.currency;
  const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : null;
  const img = firstImage ? firstImage.attributes.variants['scaled-small'].url : null;
  // listing card anchor needs sometimes inherited border radius.
  const classes = classNames(
    css.anchor,
    css.borderRadiusInheritTop,
    { [css.borderRadiusInheritBottom]: !isInCarousel },
    className
  );
  return (
    <a
      alt={title}
      className={classes}
      href={urlToListing}
      onClick={e => {
        e.preventDefault();
        // Use clickHandler from props to call internal router
        clickHandler(listing);
      }}
    >
      <div
        className={classNames(css.card, css.borderRadiusInheritTop, {
          [css.borderRadiusInheritBottom]: !isInCarousel,
        })}
      >
        <ListingPostCardSimplified
          img={img}
          postTitle={title}
          postFollowerAmmount={publicData.offering.count}
          postValue={formattedPrice}
          postSocialMedia={publicData.offering.platform}
        />
      </div>
    </a>
  );
};

ListingCard.defaultProps = {
  className: null,
};

ListingCard.propTypes = {
  className: string,
  listing: propTypes.listing.isRequired,
  clickHandler: func.isRequired,
  intl: intlShape.isRequired,
  isInCarousel: bool.isRequired,
};
// ListingCardForUser is the listing info without overlayview or carousel controls
const ListingCardForUser = props => {
  const { className, clickHandler, isInCarousel, listing, urlToListing } = props;
  const { title } = listing.attributes;
  const { author } = listing;
  console.log(listing);
  const audience = author.attributes.profile.publicData.audience
    ? author.attributes.profile.publicData.audience
    : 0;
  const reviews = author.attributes.profile.publicData.reviews
    ? author.attributes.profile.publicData.reviews
    : { rating: 0, ammount: 0 };
  const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : null;
  const img = firstImage ? firstImage.attributes.variants['scaled-small'].url : null;
  // listing card anchor needs sometimes inherited border radius.
  const classes = classNames(
    css.anchor,
    css.borderRadiusInheritTop,
    { [css.borderRadiusInheritBottom]: !isInCarousel },
    className
  );
  return (
    <a
      alt={title}
      className={classes}
      href={urlToListing}
      onClick={e => {
        e.preventDefault();
        // Use clickHandler from props to call internal router
        clickHandler(listing);
      }}
    >
      <div
        className={classNames(css.cardUser, css.borderRadiusInheritTop, {
          [css.borderRadiusInheritBottom]: !isInCarousel,
        })}
      >
        <ListingUserCard
          img={img}
          username={abbreviateString(title)}
          userAudience={audience}
          reviews={reviews}
        />
      </div>
    </a>
  );
};

ListingCardForUser.defaultProps = {
  className: null,
};

ListingCardForUser.propTypes = {
  className: string,
  listing: propTypes.listing.isRequired,
  clickHandler: func.isRequired,
  intl: intlShape.isRequired,
  isInCarousel: bool.isRequired,
};

class SearchMapInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { currentListingIndex: 0 };
  }

  render() {
    const {
      className,
      rootClassName,
      intl,
      listings,
      createURLToListing,
      createURLToProfilePage,
      onListingInfoCardClicked,
    } = this.props;
    const currentListing = ensureListing(listings[this.state.currentListingIndex]);
    const isPost = currentListing.attributes.publicData.listingType === 'post';
    const hasCarousel = listings.length > 1;
    const pagination = hasCarousel ? (
      <div className={classNames(css.paginationInfo, css.borderRadiusInheritBottom)}>
        <button
          className={css.paginationPrev}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.setState(prevState => ({
              currentListingIndex:
                (prevState.currentListingIndex + listings.length - 1) % listings.length,
            }));
          }}
        />
        <div className={css.paginationPage}>
          {`${this.state.currentListingIndex + 1}/${listings.length}`}
        </div>
        <button
          className={css.paginationNext}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.setState(prevState => ({
              currentListingIndex:
                (prevState.currentListingIndex + listings.length + 1) % listings.length,
            }));
          }}
        />
      </div>
    ) : null;

    const classes = classNames(rootClassName || css.root, className);
    const caretClass = classNames(css.caret, { [css.caretWithCarousel]: hasCarousel });

    return (
      <div className={classes}>
        <div className={css.caretShadow} />
        {isPost ? (
          <ListingCard
            clickHandler={onListingInfoCardClicked}
            urlToListing={createURLToListing(currentListing)}
            listing={currentListing}
            intl={intl}
            isInCarousel={hasCarousel}
          />
        ) : (
          <ListingCardForUser
            clickHandler={onListingInfoCardClicked}
            urlToListing={createURLToProfilePage(currentListing)}
            listing={currentListing}
            intl={intl}
            isInCarousel={hasCarousel}
          />
        )}
        {pagination}
        <div className={caretClass} />
      </div>
    );
  }
}

SearchMapInfoCard.defaultProps = {
  className: null,
  rootClassName: null,
};

SearchMapInfoCard.propTypes = {
  className: string,
  rootClassName: string,
  listings: arrayOf(propTypes.listing).isRequired,
  onListingInfoCardClicked: func.isRequired,
  createURLToListing: func.isRequired,
  createURLToProfilePage: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(injectIntl)(SearchMapInfoCard);
