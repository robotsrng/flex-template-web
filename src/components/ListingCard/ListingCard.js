import React from 'react';
import { string, func } from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUserProfile } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ListingPostCard, ListingUserCard } from '../../components';

import css from './ListingCard.css';

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

export const ListingCardComponent = props => {
  const reviews = { rating: 5, ammount: 105 };
  const { className, rootClassName, intl, listing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUserProfile(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  const { priceTitle } = priceData(price, intl);
  const audience =
    author && author.attributes.profile.publicData.audience
      ? author.attributes.profile.publicData.audience
      : 0;
  /**
   * Edit when all users are deleted from console
   */
  let offering;
  let count;
  if (
    currentListing &&
    currentListing.attributes.publicData.offering &&
    currentListing.attributes.publicData.offering.count
  ) {
    count = currentListing.attributes.publicData.offering.count;
  } else {
    count = 0;
  }

  if (currentListing.attributes.publicData.offering) {
    if (currentListing.attributes.publicData.offering.platform) {
      offering = currentListing.attributes.publicData.offering.platform.replace(/^\w/, c =>
        c.toUpperCase()
      );
    } else {
      offering = currentListing.attributes.publicData.offering.replace(/^\w/, c => c.toUpperCase());
    }
  }

  return listing.attributes.publicData.listingType === 'post' ? (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div className={css.accountContainer}>
        <ListingPostCard
          img={firstImage && firstImage.attributes.variants['scaled-small'].url}
          postTitle={title}
          postUsername={authorName}
          postFollowerAmmount={count}
          postValue={priceTitle}
          postSocialMedia={offering}
        />
      </div>
    </NamedLink>
  ) : (
    <NamedLink className={css.link} name="ProfilePage" params={{ id: listing.author.id.uuid }}>
      <ListingUserCard
        img={firstImage && firstImage.attributes.variants['scaled-small'].url}
        username={title}
        userAudience={audience}
        reviews={reviews}
      />
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
