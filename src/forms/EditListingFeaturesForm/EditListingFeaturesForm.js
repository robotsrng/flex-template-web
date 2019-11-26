import React from 'react';
import dynamic from 'next/dynamic';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';

import { ensureListing } from '../../util/data';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldSelectBrands } from '../../components';
import { ListingLink } from '../../components';
import { LISTING_STATE_DRAFT } from '../../util/types';

import css from './EditListingFeaturesForm.css';

const Select = dynamic(() => import('react-select'), { ssr: false });

const EditListingFeaturesFormComponent = props => {
  const options = [
    { value: 'sidesuite', label: 'Sidesuite' },
    { value: 'tinyLifeSupply', label: 'Tiny Life Supply' },
  ];
  const handleBrandSelect = e => {
    const exist = props.brandList && props.brandList.includes(e.label);
    if (!exist) {
      props.setBrandList([...props.brandList, e.label]);
    }
  };
  const handleOnClickBrand = e => {
    e.preventDefault();
    props.setBrandList(props.brandList.filter(brand => brand !== e.target.value));
  };
  const handleOnClickPostCategories = e => {
    e.preventDefault();
    const exist = props.postCategoriesList && props.postCategoriesList.includes(e.target.value);
    if (!exist) {
      props.setPostCategoriesList([...props.postCategoriesList, e.target.value]);
    } else {
      props.setPostCategoriesList(
        props.postCategoriesList.filter(postCategories => postCategories !== e.target.value)
      );
    }
  };
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={fieldRenderProps => {
        const {
          listing,
          disabled,
          rootClassName,
          className,
          brandsName,
          handleSubmit,
          intl,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
        } = fieldRenderProps;
        const currentListing = ensureListing(listing);
        const isPublished =
          currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
        const panelTitle = isPublished ? (
          <FormattedMessage
            id="EditListingFeaturesPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingFeaturesPanel.createListingTitle" />
        );
        const panelSecondTitle = isPublished ? (
          <FormattedMessage
            id="EditListingFeaturesPanel.subtitle"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingFeaturesPanel.createListingSubtitle" />
        );
        const selectBrandPlaceholder = intl.formatMessage({
          id: 'EditListingFeaturesPanel.inputBrandPlaceholder',
        });
        const titleDescription = intl.formatMessage({
          id: 'EditListingFeaturesPanel.titleDescription',
        });
        const classes = classNames(rootClassName || css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = disabled || submitInProgress;

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
          </p>
        ) : null;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessage}
            {errorMessageShowListing}
            <h2 className={css.title}>{panelTitle}</h2>
            <p>{titleDescription}</p>
            <Select
              className={css.brands}
              placeholder={selectBrandPlaceholder}
              maxMenuHeight={150}
              onChange={handleBrandSelect}
              options={options}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#4a4a4a',
                  secondary: '#4a4a4a',
                  dangerLight: '#4a4a4a',
                  primary25: '#b2b2b2',
                },
              })}
            ></Select>
            <div className={css.linkAccountContainer}>
              {props.brandList &&
                props.brandList.map(c => (
                  <div className={css.colButtons}>
                    <button value={c} onClick={handleOnClickBrand}>
                      {c + ` x`}
                    </button>
                  </div>
                ))}
            </div>
            <h2 className={css.title}>{panelSecondTitle}</h2>
            <div className={css.linkAccountContainer}>
              {config.custom.postCategories.map(postCategories =>
                props.postCategoriesList.includes(postCategories.label) ? (
                  <div className={css.colButtonsSelected}>
                    <button value={postCategories.label} onClick={handleOnClickPostCategories}>
                      {postCategories.label}
                    </button>
                  </div>
                ) : (
                  <div className={css.colButtons}>
                    <button value={postCategories.label} onClick={handleOnClickPostCategories}>
                      {postCategories.label}
                    </button>
                  </div>
                )
              )}
            </div>

            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </Form>
        );
      }}
    />
  );
};

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default compose(injectIntl)(EditListingFeaturesForm);
