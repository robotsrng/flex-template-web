import React from 'react';
import dynamic from 'next/dynamic';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';

import { ensureListing } from '../../util/data';
import { propTypes, LISTING_STATE_DRAFT } from '../../util/types';
import { Button, Form, ListingLink } from '../../components';

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
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          listing,
          disabled,
          ready,
          rootClassName,
          className,
          handleSubmit,
          intl,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
        } = formRenderProps;
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

        const selectBrandPlaceholder = intl.formatMessage({
          id: 'EditListingFeaturesPanel.inputBrandPlaceholder',
        });
        const titleDescription = intl.formatMessage({
          id: 'EditListingFeaturesPanel.titleDescription',
        });
        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
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
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default compose(injectIntl)(EditListingFeaturesForm);
