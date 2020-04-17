import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UserCard, Modal, NamedLink } from '../../components';
import { EnquiryForm } from '../../forms';

import css from './ListingPage.css';

const SectionHostMaybe = props => {
  const {
    title,
    listing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    onManageDisableScrolling,
  } = props;

  if (!listing.author) {
    return null;
  }

  return (
    <div id="host" className={css.sectionHost}>
      <NamedLink className={css.link} name="ProfilePage" params={{ id: listing.author.id.uuid }}>
        <UserCard user={listing.author} currentUser={currentUser} onContactUser={onContactUser} />
      </NamedLink>
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <EnquiryForm
          className={css.enquiryForm}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
          listingTitle={title}
          authorDisplayName={authorDisplayName}
          sendEnquiryError={sendEnquiryError}
          onSubmit={onSubmitEnquiry}
          inProgress={sendEnquiryInProgress}
        />
      </Modal>
    </div>
  );
};

export default SectionHostMaybe;
