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
  ButtonTabNavHorizontal,
  ListingSocialMediaCard,
  TabNav
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import {
  loadData,
  showMoreReviews,
  hideMoreReviews
} from './ProfilePage.duck';
import config from '../../config';

import css from './ProfilePage.css';

import instagram from './img/Instagram.jpg';

const { UUID } = sdkTypes;
const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
      currentTab: 'brands'
    };

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  componentDidMount() {
    // console.log(this.props)
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  switchTab = (tab) => {
    this.setState({ currentTab: tab })
  }

  render() {
    const {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      queryReviewsError,
      viewport,
      intl,
      showMoreReviews,
      onShowMoreReviews,
      onHideMoreReviews
    } = this.props;
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUserProfile(user);
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const username = profileUser.attributes.profile.publicData.username;
    const location = profileUser.attributes.profile.publicData.location;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

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
        <li className={css.tab} onClick={e => { this.switchTab('brands') }}>From brands (102)</li>
        <li className={css.tab} onClick={e => { this.switchTab('creators') }}>From creators (3)</li>
      </ul>
    )

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
              <a className={css.counter}>10.7k <span>audience</span></a>
              <a className={css.counter}>5.0 <span>(105)</span></a>
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

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    // const mobileReviews = (
    //   <div className={css.mobileReviews}>
    //     <h2 className={css.mobileReviewsTitle}>
    //       <FormattedMessage
    //         id="ProfilePage.reviewsOfProviderTitle"
    //         values={{ count: reviewsOfProvider.length }}
    //       />
    //     </h2>
    //     {queryReviewsError ? reviewsError : null}
    //     <Reviews reviews={reviewsOfProvider} />
    //     <h2 className={css.mobileReviewsTitle}>
    //       <FormattedMessage
    //         id="ProfilePage.reviewsOfCustomerTitle"
    //         values={{ count: reviewsOfCustomer.length }}
    //       />
    //     </h2>
    //     {queryReviewsError ? reviewsError : null}
    //     <Reviews reviews={reviewsOfCustomer} />
    //   </div>
    // );

    // const desktopReviewTabs = [
    //   {
    //     text: (
    //       <h3 className={css.desktopReviewsTitle}>
    //         <FormattedMessage
    //           id="ProfilePage.reviewsOfProviderTitle"
    //           values={{ count: reviewsOfProvider.length }}
    //         />
    //       </h3>
    //     ),
    //     selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
    //     onClick: this.showOfProviderReviews,
    //   },
    //   {
    //     text: (
    //       <h3 className={css.desktopReviewsTitle}>
    //         <FormattedMessage
    //           id="ProfilePage.reviewsOfCustomerTitle"
    //           values={{ count: reviewsOfCustomer.length }}
    //         />
    //       </h3>
    //     ),
    //     selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
    //     onClick: this.showOfCustomerReviews,
    //   },
    // ];

    // const desktopReviews = (
    //   <div className={css.desktopReviews}>
    //     <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

    //     {queryReviewsError ? reviewsError : null}

    //     {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
    //       <Reviews reviews={reviewsOfProvider} />
    //     ) : (
    //         <Reviews reviews={reviewsOfCustomer} />
    //       )}
    //   </div>
    // );

    const allReviews = (
      <div className={listingsContainerClasses}>
        <h2 className={css.listingsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsTitle"
            values={{ count: reviews.length }}
          />
        </h2>
        {/* <Reviews reviews={reviews} /> */}

        <ListingReviews reviews={[
          {
            id: {
              uuid: 1
            },
            author: {
              ...profileUser
            },
            attributes: {
              createdAt: '02/07/2020',
              rating: 5,
              content: 'Awesome product'
            }
          },
          {
            id: {
              uuid: 2
            },
            author: {
              ...profileUser
            },
            attributes: {
              createdAt: '01/14/2020',
              rating: 4.5,
              content: 'Another cool review'
            }
          }
        ]} />

        {/* DISPLAY THIS ONLY IF THERE ARE MORE REVIEWS AVAILABLE */}
        <div className={css.showMoreReviews} onClick={() => { onShowMoreReviews() }}>
          <span>+ Show more reviews</span>
        </div>

      </div>
    )

    const renderReviewTab = () => {
      switch (this.state.currentTab) {
        case 'brands':
          return <ListingReviews reviews={[
            {
              id: {
                uuid: 2
              },
              author: {
                ...profileUser
              },
              attributes: {
                createdAt: '01/14/2020',
                rating: 4.5,
                content: 'Another cool review'
              }
            }
          ]} />
        case 'creators':
          return <ListingReviews reviews={[
            {
              id: {
                uuid: 1
              },
              author: {
                ...profileUser
              },
              attributes: {
                createdAt: '02/07/2020',
                rating: 5,
                content: 'Awesome product'
              }
            }
          ]} />
        default: return null;
      }
    }

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
                  {listings.map(l => (
                    <li className={css.listing} key={l.id.uuid}>
                      <ListingCard listing={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {/* {isMobileLayout ? mobileReviews : desktopReviews} */}
            {/* DISPLAY REVIEWS */}
            {allReviews}
            {/* DISPLAY CHANNELS */}
            <div className={listingsContainerClasses}>
              <h2 className={css.listingsTitle}>
                <FormattedMessage
                  id="ProfilePage.channelsTitle"
                  values={{ count: listings.length }}
                />
              </h2>
              <ul className={css.listings}>
                {listings.map(l => (
                  <li className={css.listing} key={l.id.uuid}>
                    <ListingSocialMediaCard img={instagram} username="frederickcalderon" audience="700k followers" platform="Instagram" />
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
    queryReviewsError,
    showMoreReviews
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  // console.log(currentUser ? currentUser.attributes.profile.publicData.username : 'none')
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    reviews,
    queryReviewsError,
    showMoreReviews
  };
};

const mapDispatchToProps = dispatch => ({
  onShowMoreReviews: () => dispatch(showMoreReviews()),
  onHideMoreReviews: () => dispatch(hideMoreReviews())
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
