import React, { useState, useEffect } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes, LISTING_STATE_DRAFT } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  Button,
  Form,
  FieldCurrencyInput,
  ListingLink,
  ListingCalculatorResultCard,
} from '../../components';
import css from './EditListingPricingForm.css';
import { ensureOwnListing } from '../../util/data';

import axios from 'axios';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => {
  const [calculatedData, setCalculatedData] = useState();
  const [calculatedUserInfo, setCalculatedUserInfo] = useState();
  const listingCurrent = ensureOwnListing(props.listing);
  useEffect(() => {
    const { publicData } = listingCurrent.attributes;
    if (publicData && publicData.offering) {
      const data = {
        service: publicData.offering.platform,
        username: publicData.offering.username,
      };
      axios
        .post('/api/calculate', data)
        .then(res => {
          console.log('entro');
          console.log(res);
          setCalculatedData(res.data.calculations);
          axios
            .post('/api/getInfo', data)
            .then(response => {
              console.log('entroa');
              console.log(response);
              setCalculatedUserInfo(response.data);
            })
            .catch(error => console.log(error));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [listingCurrent]);
  let calculatorResult;
  if (listingCurrent.attributes.publicData) {
    if (calculatedData && calculatedUserInfo) {
      if (calculatedData.error) {
        calculatorResult = (
          <p className={css.alert}>
            There was a problem loading your information, please verify your username and be sure
            the account is public
          </p>
        );
      } else {
        console.log(calculatedUserInfo);
        console.log(listingCurrent);
        calculatorResult = (
          <ListingCalculatorResultCard
            img={calculatedUserInfo.photo}
            username={listingCurrent.attributes.publicData.offering.username}
            audience={calculatedUserInfo.count}
            platform={listingCurrent.attributes.publicData.offering.platform}
            engagementRate={calculatedData.engagementRate}
            estimatedLowPrice={calculatedData.lowerPrice}
            estimatedHighPrice={calculatedData.price}
          />
        );
      }
    }
  }
  return (
    <FinalForm
      {...props}
      render={formRenderProps => {
        const {
          listing,
          className,
          disabled,
          ready,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
        } = formRenderProps;
        const currentListing = ensureOwnListing(listing);
        const isPublished =
          currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
        const panelTitle = isPublished ? (
          <FormattedMessage
            id="EditListingPricingPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
        );
        const unitType = config.bookingUnitType;
        const isNightly = unitType === LINE_ITEM_NIGHT;
        const isDaily = unitType === LINE_ITEM_DAY;

        const translationKey = isNightly
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
          ? 'EditListingPricingForm.pricePerDay'
          : 'EditListingPricingForm.pricePerUnit';

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        });
        const secondTitle = intl.formatMessage({
          id: 'EditListingPricingForm.secondTitle',
        });
        const secondTitleDescription = intl.formatMessage({
          id: 'EditListingPricingForm.secondTitleDescription',
        });

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPricingForm.priceInputPlaceholder',
        });

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPricingForm.priceRequired',
          })
        );
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPricingForm.priceTooLow',
            },
            {
              minPrice: formatMoney(intl, minPrice),
            }
          ),
          config.listingMinimumPriceSubUnits
        );
        const priceValidators = config.listingMinimumPriceSubUnits
          ? validators.composeValidators(priceRequired, minPriceRequired)
          : priceRequired;

        const classes = classNames(css.root, className);
        const submitReady = (updated && pristine) || ready;
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
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />

            <h2>{secondTitle}</h2>
            <p>{secondTitleDescription}</p>
            <div className={css.calculator}>{calculatorResult}</div>
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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPricingFormComponent);
