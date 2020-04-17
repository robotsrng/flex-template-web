import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.css';

const SectionImages = props => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
    isMobile,
  } = props;

  const hasImages = listing.images && listing.images.length > 0;
  const firstImage = hasImages ? listing.images[0] : null;
  const buttonText = '< Back';
  // Action bar is wrapped with a div that prevents the click events
  // to the parent that would otherwise open the image carousel
  let actionBar;
  if (listing.id) {
    actionBar = (
      <React.Fragment>
        <div onClick={e => e.stopPropagation()}>
          <div className={css.actionBarContainer}>
            <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
            {isMobile ? (
              <div className={css.backButton}>
                <a href="javascript:history.back()">{buttonText}</a>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    if (isMobile) {
      actionBar = (
        <div onClick={e => e.stopPropagation()}>
          <div className={css.backButton}>
            <a href="javascript:history.back()">{buttonText}</a>
          </div>
        </div>
      );
    }
  }

  const viewPhotosButton = hasImages ? (
    <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
      <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.images.length }}
      />
    </button>
  ) : null;

  return (
    <div className={css.sectionImages}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
          {actionBar}
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={[
              'landscape-crop',
              'landscape-crop2x',
              'landscape-crop4x',
              'landscape-crop6x',
            ]}
          />
          {viewPhotosButton}
        </div>
      </div>
      <Modal
        id="ListingPage.imageCarousel"
        scrollLayerClassName={css.carouselModalScrollLayer}
        containerClassName={css.carouselModalContainer}
        lightCloseButton
        isOpen={imageCarouselOpen}
        onClose={onImageCarouselClose}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <ImageCarousel images={listing.images} />
      </Modal>
    </div>
  );
};

export default SectionImages;
