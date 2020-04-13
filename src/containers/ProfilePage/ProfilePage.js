import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUserProfile } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  ListingCard,
  ListingReviews,
  ListingSocialMediaCard,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import { loadData, showMoreReviews, hideMoreReviews } from './ProfilePage.duck';
import config from '../../config';

import css from './ProfilePage.css';

const { UUID } = sdkTypes;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
      currentTab: 'brands',
    };

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  componentDidMount() {}

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  switchTab = tab => {
    this.setState({ currentTab: tab });
  };

  render() {
    const {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      reviewsMeta,
      intl,
      showMoreReviews,
      onShowMoreReviews,
    } = this.props;
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUserProfile(user);
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const username = profileUser.attributes.profile.publicData
      ? profileUser.attributes.profile.publicData.username
      : '';
    const location = profileUser.attributes.profile.publicData
      ? profileUser.attributes.profile.publicData.location
      : '';
    const totalReviews = reviewsMeta ? reviewsMeta.totalItems : 0;

    const userAudience =
      currentUser && currentUser.attributes.profile.publicData.audience
        ? currentUser.attributes.profile.publicData.audience
        : 0;
    const channelList =
      profileUser && profileUser.attributes.profile.publicData.offering
        ? profileUser.attributes.profile.publicData.offering
        : [];
    const editLinkMobile = isCurrentUser ? (
      <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
      </NamedLink>
    ) : null;
    const editLinkDesktop = isCurrentUser ? (
      <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
      </NamedLink>
    ) : null;

    const reviewTabs = (
      <ul className={css.tabs}>
        <li
          className={css.tab}
          onClick={e => {
            this.switchTab('brands');
          }}
        >
          <FormattedMessage id="ProfilePage.reviewsFromBrandsTab" values={{ count: 0 }} />
        </li>
        <li
          className={css.tab}
          onClick={e => {
            this.switchTab('creators');
          }}
        >
          <FormattedMessage id="ProfilePage.reviewsFromCreatorsTab" values={{ count: 0 }} />
        </li>
      </ul>
    );
    const asideContent = (
      <div className={css.asideContent}>
        {!showMoreReviews ? (
          <React.Fragment>
            <AvatarLarge className={css.avatar} user={user} disableProfileLink />
            <div>
              <h1 className={css.mobileHeading}>
                {username ? (
                  <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: username }} />
                ) : null}
              </h1>
              <p className={css.counter}>
                {userAudience} <span>audience</span>
              </p>
              <p className={css.counter}>
                5.0 <span>(105)</span>
              </p>
            </div>
            {editLinkMobile}
            {editLinkDesktop}
          </React.Fragment>
        ) : null}
      </div>
    );

    const listingsContainerClasses = classNames(css.listingsContainer, {
      [css.withBioMissingAbove]: !hasBio,
    });

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const allReviews = (
      <div className={listingsContainerClasses}>
        <h2 className={css.listingsTitle}>
          <FormattedMessage id="ProfilePage.reviewsTitle" values={{ count: totalReviews }} />
        </h2>

        <ListingReviews reviews={reviews} />

        {/* DISPLAY THIS ONLY IF THERE ARE MORE REVIEWS AVAILABLE */}
        {totalReviews > 3 && (
          <div
            className={css.showMoreReviews}
            onClick={() => {
              onShowMoreReviews();
            }}
          >
            <FormattedMessage id="ProfilePage.showMoreReviewsLabel" />
          </div>
        )}
      </div>
    );

    const renderReviewTab = () => {
      switch (this.state.currentTab) {
        case 'brands':
          return <ListingReviews reviews={reviewsOfProvider} />;
        case 'creators':
          return <ListingReviews reviews={reviewsOfCustomer} />;
        default:
          return null;
      }
    };

    const mainContent = (
      <div>
        {!showMoreReviews ? (
          <React.Fragment>
            <h1 className={css.desktopHeading}>
              <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
            </h1>
            <h1 className={css.displayName}>{displayName}</h1>
            {location ? <h2 className={css.location}>{location.search}</h2> : null}
            {hasBio ? <p className={css.bio}>{bio}</p> : null}
            {hasListings ? (
              <div className={listingsContainerClasses}>
                <h2 className={css.listingsTitle}>
                  <FormattedMessage
                    id="ProfilePage.listingsTitle"
                    values={{ count: listings.length }}
                  />
                </h2>
                <ul className={css.listings}>
                  {listings.map(l => {
                    if (l.attributes.publicData.listingType === 'post') {
                      return (
                        <li className={css.listing} key={l.id.uuid}>
                          <ListingCard listing={l} />
                        </li>
                      );
                    } else return null;
                  })}
                </ul>
              </div>
            ) : null}
            {/* DISPLAY REVIEWS */}
            {allReviews}
            {/* DISPLAY CHANNELS */}
            <div className={listingsContainerClasses}>
              <h2 className={css.listingsTitle}>
                <FormattedMessage
                  id="ProfilePage.channelsTitle"
                  values={{ count: channelList.length }}
                />
              </h2>
              <ul className={css.listings}>
                {channelList.map(channel => (
                  <li className={css.listing} key={channel.username}>
                    <ListingSocialMediaCard
                      img={channel.photo}
                      username={channel.username}
                      audience={channel.count}
                      platform={channel.platform}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>You have 105 reviews</h1>
            {reviewTabs}
            {renderReviewTab()}
          </React.Fragment>
        )}
      </div>
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError || queryListingsError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfilePage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
          <LayoutWrapperMain>{content}</LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSideNavigation>
      </Page>
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  reviewsMeta: null,
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    userId,
    userShowError,
    queryListingsError,
    userListingRefs,
    reviews,
    reviewsMeta,
    queryReviewsError,
    showMoreReviews,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);

  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    reviews,
    reviewsMeta,
    queryReviewsError,
    showMoreReviews,
  };
};

const mapDispatchToProps = dispatch => ({
  onShowMoreReviews: () => dispatch(showMoreReviews()),
  onHideMoreReviews: () => dispatch(hideMoreReviews()),
});

const ProfilePage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withViewport,
  injectIntl
)(ProfilePageComponent);

ProfilePage.loadData = params => {
  const id = new UUID(params.id);
  return loadData(id);
};

export default ProfilePage;
