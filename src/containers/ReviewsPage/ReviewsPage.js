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
  Reviews,
  ButtonTabNavHorizontal,
  ListingSocialMediaCard,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import { loadData } from './ReviewsPage.duck';
import config from '../../config';

import css from './ReviewsPage.css';

const { UUID } = sdkTypes;
const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ReviewsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
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
    } = this.props;

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: 'Reviews',
        siteTitle: config.siteTitle,
      }
    );

    const reviewCounter = (
      <div>
        <h1>You have 105 reviews</h1>
      </div>
    )

    const tabs = (
      <div>

      </div>
    )

    const mainContent = (
      <React.Fragment>
        <Reviews reviews={[
          {
            id: {
              uuid: 1
            },
            author: {
              // ...profileUser
              attributes: {
                profile: {
                  publicData: {
                    username: 'Frederick Calderon'
                  }
                }
              }
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
              // ...profileUser
              attributes: {
                profile: {
                  publicData: {
                    username: 'Frederick Calderon'
                  }
                }
              }
            },
            attributes: {
              createdAt: '01/14/2020',
              rating: 4.5,
              content: 'Another cool review'
            }
          }
        ]} />
      </React.Fragment>
    )

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
          <LayoutWrapperSideNav className={css.aside}>{reviewCounter}</LayoutWrapperSideNav>
          <LayoutWrapperMain>{mainContent}</LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSideNavigation>
      </Page>
    );
  }
}

ReviewsPageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ReviewsPageComponent.propTypes = {
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
  // const { currentUser } = state.user;
  // const {
  //   userId,
  //   reviews,
  //   queryReviewsError,
  // } = state.ReviewsPage;
  // return {
  //   scrollingDisabled: isScrollingDisabled(state),
  //   reviews,
  //   queryReviewsError,
  // };
};

const ReviewsPage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ReviewsPageComponent);

// ReviewsPage.loadData = params => {
//   const id = new UUID(params.id);
//   return loadData(id);
// };

export default ReviewsPage;
