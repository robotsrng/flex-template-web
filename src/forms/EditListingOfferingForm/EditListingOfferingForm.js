import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes, LISTING_STATE_DRAFT } from '../../util/types';
import { Button, Form, ListingLink, AccountExampleView } from '../../components';
import css from './EditListingOfferingForm.css';
import { ensureOwnListing } from '../../util/data';

import instagram from './img/Instagram.jpg';
import facebook from './img/Facebook.jpg';
import youtube from './img/Youtube.jpg';

export const EditListingOfferingFormComponent = props => {
  const instagramValue = 'instagram';
  const facebookValue = 'facebook';
  const youtubeValue = 'youtube';
  const handleOnClickAccount = (e, value) => {
    props.setOffering(value);
  };
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          listing,
          className,
          disabled,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
        } = fieldRenderProps;
        const currentListing = ensureOwnListing(listing);
        const isPublished =
          currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
        const panelTitle = isPublished ? (
          <FormattedMessage
            id="EditListingOfferingPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
        );

        const titleDescription = intl.formatMessage({
          id: 'EditListingOfferingPanel.titleDescription',
        });

        const classes = classNames(css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;
        const { updateListingError, showListingsError } = fetchErrors || {};

        return (
          <Form onSubmit={handleSubmit} className={classes}>
            {updateListingError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.updateFailed" />
              </p>
            ) : null}
            {showListingsError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.showListingFailed" />
              </p>
            ) : null}
            <h2 className={css.title}>{panelTitle}</h2>
            <p>{titleDescription}</p>
            <div className={css.accountContainer}>
              <button
                type="button"
                onClick={e => handleOnClickAccount(e, instagramValue)}
                className={
                  props.offering === 'instagram' ? css.accountButtonSelected : css.accountButton
                }
              >
                <div className={css.accountPosition}>
                  <AccountExampleView
                    whiteLetters={props.offering === 'instagram' && 'true'}
                    cssImg="img"
                    img={instagram}
                    postUsername="axelwhalen"
                    postFollowerAmmount="Instagram"
                    postValueMaybe="338 followers"
                  ></AccountExampleView>
                </div>
              </button>
              <button
                type="button"
                onClick={e => handleOnClickAccount(e, facebookValue)}
                className={
                  props.offering === 'facebook' ? css.accountButtonSelected : css.accountButton
                }
              >
                <div className={css.accountPosition}>
                  <AccountExampleView
                    whiteLetters={props.offering === 'facebook' && 'true'}
                    cssImg="img"
                    img={facebook}
                    postUsername="Axel Whalen"
                    postFollowerAmmount="Facebook"
                    postValueMaybe="705 friends"
                  ></AccountExampleView>
                </div>
              </button>
              <button
                type="button"
                onClick={e => handleOnClickAccount(e, youtubeValue)}
                className={
                  props.offering === 'youtube' ? css.accountButtonSelected : css.accountButton
                }
              >
                <div className={css.accountPosition}>
                  <AccountExampleView
                    whiteLetters={props.offering === 'youtube' && 'true'}
                    cssImg="img"
                    img={youtube}
                    postUsername="The Waylon Axle"
                    postFollowerAmmount="Youtube"
                    postValueMaybe="338 subscribers"
                  ></AccountExampleView>
                </div>
              </button>
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

EditListingOfferingFormComponent.defaultProps = { fetchErrors: null };

EditListingOfferingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingOfferingFormComponent);
