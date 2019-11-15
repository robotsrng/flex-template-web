import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: August 10, 2019</p>

      <p>
      These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with <a href="https://sidesuite.com/">https://sidesuite.com/</a> website (the "Service") operated by Sidesuite Markets Inc. ("us", "we", or "our").
      <br></br><br></br>
Please read these Terms and Conditions carefully before using the Service.
<br></br><br></br>
Your access to and use of the Service is based on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
<br></br><br></br>
By accessing or using the Service you agree to be bound by these Terms and accept all legal consequences. If you do not agree to these terms and conditions, in whole or in part, please do not use the Service.
      </p>

      <h2>Purchases</h2>
      <p>
      If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
      <br></br><br></br>
You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
<br></br><br></br>
By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.
<br></br><br></br>
We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
<br></br><br></br>
We reserve the right to refuse or cancel your order if fraud or an unauthorised or illegal transaction is suspected. We will not be held responsible or liable for any failure for the Purchase to complete, or any resulting loss or damages to you.
      </p>

      <h2>Availability, Errors and Inaccuracies</h2>
      <p>
      In order to provide exceptional service, and accuracy, we regularly update the products and services on the Service.
      <br></br><br></br>
We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
<br></br><br></br>
Despite our best efforts, the products or services available on our Service may have an error regarding the price, be inaccurately described, or be unavailable.
<br></br><br></br>
We may experience delays in updating information on the Service and in our advertising on other websites.
      </p>

      <h2>Content</h2>
      <p>
      Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
      <br></br><br></br>
By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
<br></br><br></br>
You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
<br></br><br></br>
We reserve all rights to block or remove communications or materials that we determine to be: (a) abusive, defamatory, or obscene; (b) fraudulent, deceptive, or misleading; (c) in violation of a copyright, trademark or, other intellectual property right of another or; (d) offensive or otherwise unacceptable to us in our sole discretion.
<br></br><br></br>
You acknowledge that, by providing you with the ability to view and distribute user-generated content on the Service, we are merely acting as a passive conduit for such distribution and is not undertaking any obligation or liability relating to any contents or activities on the Service.
      </p>
      <h2>Accounts</h2>
      <p>
      When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
      <br></br><br></br>
You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
<br></br><br></br>
You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
<br></br><br></br>
You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trade mark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
</p>
      <h2>Intellectual Property</h2>
      <p>
      The Service and all contents, including but not limited to text, images, graphics or code are the property of Sidesuite Markets Inc. and are protected by copyright, trademarks, database and other intellectual property rights. You may display and copy, download or print portions of the material from the different areas of the Service only for your own non-commercial use, or to place an order with Sidesuite Markets Inc.. Any other use is strictly prohibited and may violate copyright, trademark and other laws. These Terms do not grant you a license to use any trademark of Sidesuite Markets Inc. or its affiliates. You further agree not to use, change or delete any proprietary notices from materials downloaded from the Service.</p>
      <h2>Links To Other Web Sites</h2>
      <p>
      The Service may contain links to third-party web sites or services that are not owned or controlled by Sidesuite Markets Inc..
      <br></br><br></br>
Sidesuite Markets Inc. has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Sidesuite Markets Inc. shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.
<br></br><br></br>
We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
</p>
      <h2>Termination</h2>
      <p>
      We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
      <br></br><br></br>
All provisions of the Terms shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
<br></br><br></br>
Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
      <h2>Governing Law</h2>
      <p>
      These Terms shall be governed by, and interpreted and enforced in accordance with, the laws in the Province of British Columbia and the laws of Canada, as applicable.
      <br></br><br></br>
If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, then any remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements, oral or otherwise, regarding the Service.</p>
      <h2>Changes</h2>
      <p>
      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      <br></br><br></br>
By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
      <h2>Contact Us</h2>
      <p>
      If you have any questions about these Terms, please contact us.</p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
