import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  FAQItem,
  NamedLink,
} from '../../components';

import css from './FAQPage.css';

import accountIcon from './img/Account-Icon.png';
import listingIcon from './img/Listing-Icon.png';
import creditCardIcon from './img/Credit-Card-Icon.png';

const FAQPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="For Brands"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ForBrands',
        description: 'For Brands',
        name: 'For Brands',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>


        <h1>Your questions answered</h1>
        <NamedLink name="HowDoIConnectMyChannels">
        <FAQItem img={accountIcon} title="How do I connect my channels?"/>
        </NamedLink>
        <NamedLink name="HowDoICreateAListing">
        <FAQItem img={listingIcon} title="How do I create a listing?"/>
        </NamedLink>
        <NamedLink name="HowDoesTheTransactionProcessWork">
        <FAQItem img={creditCardIcon} title="How does the transaction process work?"/>
        </NamedLink>


        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQPage;
