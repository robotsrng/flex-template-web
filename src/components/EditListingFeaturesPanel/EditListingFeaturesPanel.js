import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ensureListing } from '../../util/data';
import { EditListingFeaturesForm } from '../../forms';

import css from './EditListingFeaturesPanel.css';

const BRANDS_NAME = 'brands';

const EditListingFeaturesPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;
  const { author } = currentListing;

  const [brandList, setBrandList] = useState([]);
  const [postCategoriesList, setPostCategoriesList] = useState([]);
  useEffect(() => {
    if (publicData.brandList) {
      setBrandList(publicData.brandList);
    }
  }, [publicData.brandList]);
  useEffect(() => {
    if (author) {
      const channelList = author.attributes.profile.publicData.offering;
      const selectedChannel = publicData.offering;
      for (let i = 0; i < channelList.length; i++) {
        if (
          channelList[i].username === selectedChannel.username &&
          channelList[i].platform === selectedChannel.platform
        ) {
          setPostCategoriesList(channelList[i].features);
        }
      }
    }
  }, [publicData.postCategoriesList]);
  return (
    <div className={classes}>
      <EditListingFeaturesForm
        listing={listing}
        className={css.form}
        brandsName={BRANDS_NAME}
        brandList={brandList}
        setBrandList={setBrandList}
        onSubmit={_ => {
          const updatedValues = {
            publicData: { brandList, postCategoriesList },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingFeaturesPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingFeaturesPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingFeaturesPanel;
