import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import pickBy from 'lodash/pickBy';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { withViewport } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { propTypes } from '../../util/types';
import {
  Button,
  Logo,
  Modal,
  ModalMissingInformation,
  NamedLink,
  TopbarDesktop,
  TopbarMobileMenu,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import css from './Topbar.css';

const MAX_MOBILE_SCREEN_WIDTH = 768;

const redirectToURLWithModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const searchString = `?${stringify({ [modalStateParam]: 'open', ...parse(search) })}`;
  history.push(`${pathname}${searchString}`, state);
};

const redirectToURLWithoutModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const queryParams = pickBy(parse(search), (v, k) => {
    return k !== modalStateParam;
  });
  const stringified = stringify(queryParams);
  const searchString = stringified ? `?${stringified}` : '';
  history.push(`${pathname}${searchString}`, state);
};

const GenericError = props => {
  const { show } = props;
  const classes = classNames(css.genericError, {
    [css.genericErrorVisible]: show,
  });
  return (
    <div className={classes}>
      <div className={css.genericErrorContent}>
        <p className={css.genericErrorText}>
          <FormattedMessage id="Topbar.genericError" />
        </p>
      </div>
    </div>
  );
};

const { bool } = PropTypes;

GenericError.propTypes = {
  show: bool.isRequired,
};

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'keywords',
    };
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSubmitKeywords = this.handleSubmitKeywords.bind(this);
    this.initialValue = this.initialValue.bind(this);
    this.handleToggleButton = this.handleToggleButton.bind(this);
  }
  componentDidMount() {
    if (process.browser) {
      this.setState({ checked: sessionStorage ? sessionStorage.getItem('checked') : 'keywords' });
    }
  }
  componentWillUnmount() {
    const sessionData = sessionStorage.getItem('filterState');
    if (sessionData) {
      sessionStorage.removeItem('filterState');
      sessionStorage.removeItem('checked');
    }
  }
  handleToggleButton(e) {
    this.setState({
      checked: e.target.value,
    });
    sessionStorage.setItem('checked', e.target.value);
    if (e.target.value === 'keywords') {
      sessionStorage.setItem('filterState', 'post');
    } else if (e.target.value === 'creators') {
      sessionStorage.setItem('filterState', 'personal');
    } else if (e.target.value === 'brands') {
      sessionStorage.setItem('filterState', 'business');
    }
  }

  handleMobileMenuOpen() {
    redirectToURLWithModalState(this.props, 'mobilemenu');
  }

  handleMobileMenuClose() {
    redirectToURLWithoutModalState(this.props, 'mobilemenu');
  }

  handleMobileSearchOpen() {
    redirectToURLWithModalState(this.props, 'mobilesearch');
  }

  handleMobileSearchClose() {
    redirectToURLWithoutModalState(this.props, 'mobilesearch');
  }

  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const pub_listingType = sessionStorage.getItem('filterState')
      ? sessionStorage.getItem('filterState')
      : 'post';
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      pub_listingType,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  handleSubmitKeywords(values) {
    const { currentSearchParams } = this.props;
    const keywords = values.keywords;
    const { history } = this.props;
    let searchParams;
    const pub_listingType = sessionStorage.getItem('filterState')
      ? sessionStorage.getItem('filterState')
      : 'post';
    searchParams = {
      ...currentSearchParams,
      keywords,
      pub_listingType,
    };

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }
  handleLogout() {
    const { onLogout, history } = this.props;
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  }
  initialValue(paramName) {
    if (this.props.currentSearchParams) {
      return this.props.currentSearchParams[paramName];
    } else return '';
  }

  render() {
    const {
      className,
      rootClassName,
      desktopClassName,
      mobileRootClassName,
      mobileClassName,
      isAuthenticated,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      currentPage,
      notificationCount,
      viewport,
      intl,
      location,
      onManageDisableScrolling,
      onResendVerificationEmail,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      showGenericError,
    } = this.props;
    const initialKeyword = this.initialValue('keywords');

    const { mobilemenu, mobilesearch, address, origin, bounds } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    const isMobileMenuOpen = isMobileLayout && mobilemenu === 'open';
    const isMobileSearchOpen = isMobileLayout && mobilesearch === 'open';

    const mobileMenu = (
      <TopbarMobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        currentUser={currentUser}
        onLogout={this.handleLogout}
        notificationCount={notificationCount}
        currentPage={currentPage}
      />
    );

    // Only render current search if full place object is available in the URL params
    const locationFieldsPresent = config.sortSearchByDistance
      ? address && origin && bounds
      : address && bounds;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          <Button
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
          >
            <MenuIcon className={css.menuIcon} />
            {notificationDot}
          </Button>
          <NamedLink
            className={css.home}
            name="LandingPage"
            title={intl.formatMessage({ id: 'Topbar.logoIcon' })}
          >
            <Logo format="mobile" />
          </NamedLink>
          <Button
            rootClassName={css.searchMenu}
            onClick={this.handleMobileSearchOpen}
            title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
          >
            <SearchIcon className={css.searchMenuIcon} />
          </Button>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            className={desktopClassName}
            currentUserHasListings={currentUserHasListings}
            currentUser={currentUser}
            currentPage={currentPage}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          id="TopbarMobileSearch"
          containerClassName={css.modalContainer}
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.searchContainer}>
            <ul className={css.buttons}>
              <li className={css.col}>
                <input
                  id="r1"
                  type="radio"
                  name="search"
                  value="keywords"
                  checked={this.state.checked === 'keywords'}
                  onChange={this.handleToggleButton}
                ></input>
                <label htmlFor="r1">Keywords</label>
              </li>
              <li className={css.col}>
                <input
                  id="r2"
                  type="radio"
                  name="search"
                  value="location"
                  checked={this.state.checked === 'location'}
                  onChange={this.handleToggleButton}
                ></input>
                <label htmlFor="r2">Location</label>
              </li>
              <li className={css.col}>
                <input
                  id="r3"
                  type="radio"
                  name="search"
                  value="creators"
                  checked={this.state.checked === 'creators'}
                  onChange={this.handleToggleButton}
                ></input>
                <label htmlFor="r3">Creators</label>
              </li>
              <li className={css.col}>
                <input
                  id="r4"
                  type="radio"
                  name="search"
                  value="brands"
                  checked={this.state.checked === 'brands'}
                  onChange={this.handleToggleButton}
                ></input>
                <label htmlFor="r4">Brands</label>
              </li>
            </ul>
            <TopbarSearchForm
              onSubmit={
                this.state.checked === 'location' ? this.handleSubmit : this.handleSubmitKeywords
              }
              initialValues={initialSearchFormValues}
              isMobile
              initialKeyword={initialKeyword}
              stateFilter={this.state.checked}
              handleSubmitKeywords={this.handleSubmitKeywords}
            />
          </div>
        </Modal>
        <ModalMissingInformation
          id="MissingInformationReminder"
          containerClassName={css.missingInformationModal}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          location={location}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
        />

        <GenericError show={showGenericError} />
      </div>
    );
  }
}

TopbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  desktopClassName: null,
  mobileRootClassName: null,
  mobileClassName: null,
  notificationCount: 0,
  currentUser: null,
  currentUserHasOrders: null,
  currentPage: null,
  sendVerificationEmailError: null,
  keywordFilter: null,
};

const { func, number, shape, string /*,object*/ } = PropTypes;

TopbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  desktopClassName: string,
  mobileRootClassName: string,
  mobileClassName: string,
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onResendVerificationEmail: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  showGenericError: bool.isRequired,
  keywordFilter: propTypes.filterConfig,

  // These are passed from Page to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Topbar = compose(
  withViewport,
  injectIntl
)(TopbarComponent);

Topbar.displayName = 'Topbar';

export default Topbar;
