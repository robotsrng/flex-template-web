import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUserProfile } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};
export class ProfileSettingsPageComponent extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }
  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const handleSubmit = values => {
      const { firstName, lastName, businessName, location, username, bio: rawBio } = values;
      // Ensure that the optional bio is a string
      const bio = rawBio || '';
      const address = location || '';
      const business = businessName || '';
      let profile;
      currentUser.attributes.profile.publicData.accountType === 'personal'
        ? (profile = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            bio,
            publicData: {
              username: username.trim(),
              location: address,
            },
          })
        : (profile = {
            bio,
            displayName: business.trim(),
            publicData: {
              username: username.trim(),
              location: address,
            },
          });
      const uploadedImage = this.props.image;
      const uploadedImageToListing = this.props.imageToListing;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? {
              ...profile,
              profileImageId: uploadedImage.imageId,
              listingImageId: uploadedImageToListing.imageId,
            }
          : profile;
      onUpdateProfile(updatedValues);
    };

    const user = ensureCurrentUserProfile(currentUser);
    const { firstName, lastName, bio, displayName, publicData } = user.attributes.profile;
    const { location, username } = publicData;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };
    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{
          firstName,
          lastName,
          bio,
          location,
          username,
          businessName: displayName,
          profileImage: user.profileImage,
        }}
        setToggle={this.updateToggle}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
      />
    ) : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
  imageToListing: null,
};

const { bool, func, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  imageToListing: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    imageToListing,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    imageToListing,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
