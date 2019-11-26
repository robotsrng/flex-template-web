import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditListingOfferingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';

import css from './EditListingOfferingPanel.css';

const EditListingOfferingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  const [offering, setOffering] = useState('');
  useEffect(
    _ => {
      if (publicData.offering) {
        setOffering(publicData.offering);
      }
    },
    [publicData.offering]
  );
  console.log(currentListing);
  const title = 'defaultUltimateTitleSidesuite';
  const form = (
    <EditListingOfferingForm
      listing={listing}
      offering={offering}
      setOffering={setOffering}
      className={css.form}
      onSubmit={_ => {
        var updatedValues = {
          publicData: { offering },
        };
        !currentListing.attributes.title && (updatedValues = { title: title, ...updatedValues });
        onSubmit(updatedValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
    />
  );

  return <div className={classes}>{form}</div>;
};

const { func, object, string, bool } = PropTypes;

EditListingOfferingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingOfferingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingOfferingPanel;
