import React, { useState, useEffect } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { ensureOwnListing } from '../../util/data';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.css';

const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
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
  const currentListing = ensureOwnListing(listing);
  let { title } = currentListing.attributes;
  const { publicData } = currentListing.attributes;
  const { author } = currentListing;
  const [postCategoriesList, setPostCategoriesList] = useState([]);
  title === 'defaultUltimateTitleSidesuite' && (title = '');

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
      <EditListingDescriptionForm
        listing={listing}
        className={css.form}
        initialValues={{ title }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title } = values;
          const updateValues = {
            title: title.trim(),
            publicData: { postCategoriesList },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={config.custom.categories}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
  className: string,
  rootClassName: string,

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

export default EditListingDescriptionPanel;
