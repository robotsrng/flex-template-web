import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import { SelectMultipleFilter, PriceFilter, KeywordFilter } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
        minPrice: valuesFromParams[0],
        maxPrice: valuesFromParams[1],
      }
    : null;
};

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    postCategoriesFilter,
    priceFilter,
    socialMediasFilter,
    keywordFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl,
  } = props;
  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const amenitiesLabel = intl.formatMessage({
    id: 'SearchFilters.amenitiesLabel',
  });

  const keywordLabel = intl.formatMessage({
    id: 'SearchFilters.keywordLabel',
  });

  const socialMediasLabel = intl.formatMessage({
    id: 'SearchFilters.socialMediasLabel',
  });

  const initialPostCategories = postCategoriesFilter
    ? initialValues(urlQueryParams, postCategoriesFilter.paramName)
    : null;

  const initialSocialMedias = socialMediasFilter
    ? initialValues(urlQueryParams, socialMediasFilter.paramName)
    : null;

  // const initialCategory = categoryFilter
  //   ? initialValue(urlQueryParams, categoryFilter.paramName)
  //   : null;

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  // const initialDateRange = dateRangeFilter
  //   ? initialDateRangeValue(urlQueryParams, dateRangeFilter.paramName)
  //   : null;

  const initialKeyword = keywordFilter
    ? initialValue(urlQueryParams, keywordFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleKeyword = (urlParam, values) => {
    const queryParams = values
      ? { ...urlQueryParams, [urlParam]: values }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const socialMediasFilterElement = socialMediasFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.socialMediasFilter'}
      name="socialMedias"
      urlParam={socialMediasFilter.paramName}
      label={socialMediasLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={socialMediasFilter.options}
      initialValues={initialSocialMedias}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const postCategoriesFilterElement = postCategoriesFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.postCategoriesFilter'}
      name="postCategories"
      urlParam={postCategoriesFilter.paramName}
      label={amenitiesLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={postCategoriesFilter.options}
      initialValues={initialPostCategories}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const priceFilterElement = priceFilter ? (
    <PriceFilter
      id="SearchFilters.priceFilter"
      urlParam={priceFilter.paramName}
      onSubmit={handlePrice}
      showAsPopup
      {...priceFilter.config}
      initialValues={initialPriceRange}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const keywordFilterElement =
    keywordFilter && keywordFilter.config.active ? (
      <KeywordFilter
        id={'SearchFilters.keywordFilter'}
        name="keyword"
        urlParam={keywordFilter.paramName}
        label={keywordLabel}
        onSubmit={handleKeyword}
        showAsPopup
        initialValues={initialKeyword}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;
  return (
    <div className={classes}>
      <div className={css.filters}>
        {socialMediasFilterElement}
        {postCategoriesFilterElement}
        {priceFilterElement}
        {keywordFilterElement}
        {toggleSearchFiltersPanelButton}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categoryFilter: null,
  amenitiesFilter: null,
  priceFilter: null,
  dateRangeFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  categoriesFilter: propTypes.filterConfig,
  amenitiesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  dateRangeFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(
  withRouter,
  injectIntl
)(SearchFiltersComponent);

export default SearchFilters;
