import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes, LISTING_STATE_DRAFT } from '../../util/types';
import {
  Button,
  Form,
  ListingLink,
  ListingSocialMediaCard,
  AddAccountNamedLink,
} from '../../components';
import css from './EditListingOfferingForm.css';
import { ensureOwnListing } from '../../util/data';

export const EditListingOfferingFormComponent = props => {
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
          channelList,
          handleSubmit,
          intl,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          offering,
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
          <FormattedMessage id="EditListingOfferingPanel.title" />
        );

        const titleDescription = intl.formatMessage({
          id: 'EditListingOfferingPanel.titleDescription',
        });

        const classes = classNames(css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = !offering || submitInProgress;
        if (channelList) {
          return (
            <Form onSubmit={handleSubmit} className={classes}>
              <h2 className={css.title}>{panelTitle}</h2>
              <p>{titleDescription}</p>
              <div className={css.accountContainer}>
                {channelList.map(o => {
                  return (
                    <React.Fragment>
                      <button
                        type="button"
                        onClick={e => handleOnClickAccount(e, o)}
                        className={
                          offering &&
                          offering.username === o.username &&
                          offering.platform === o.platform
                            ? css.accountButtonSelected
                            : css.accountButton
                        }
                      >
                        <div className={css.accountPosition}>
                          <ListingSocialMediaCard
                            whiteLetters={
                              offering &&
                              offering.username === o.username &&
                              offering.platform === o.platform
                            }
                            img={o.photo}
                            username={o.username}
                            platform={o.platform}
                            audience={o.count}
                          />
                        </div>
                      </button>
                    </React.Fragment>
                  );
                })}
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
        } else {
          return (
            <React.Fragment>
              <h2 className={css.title}>You have no verified accounts</h2>
              <p>Add an account to create a post</p>
              <AddAccountNamedLink
                name="AddAccountPage"
                className={css.accountPlaceholder}
                tab="channel"
              >
                <div className={css.accountPlaceholderText}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
                </div>
                <div className={css.accountPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </AddAccountNamedLink>
            </React.Fragment>
          );
        }
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
