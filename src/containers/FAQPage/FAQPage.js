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

import shieldIcon from '../../assets/IconLibrary/Shield-Icon.png';
import handshakeIcon from '../../assets/IconLibrary/Handshake-Icon.png';
import selectIcon from '../../assets/IconLibrary/Select-Icon.png';
import scaleIcon from '../../assets/IconLibrary/Scale-Icon.png';
import creditCardIcon from '../../assets/IconLibrary/Credit-Card-Icon.png';
import socialPlatformIcon from '../../assets/IconLibrary/Social-Platform-Icon.png';
import listingIcon from '../../assets/IconLibrary/Listing-Icon.png';
import glassesIcon from '../../assets/IconLibrary/Glasses-Icon.png';
import governmentIcon from '../../assets/IconLibrary/Government-Icon.png';
import fireIcon from '../../assets/IconLibrary/Fire-Icon.png';
import searchIcon from '../../assets/IconLibrary/Search-Icon.png';

const FAQPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="FAQ"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQ',
        description: 'FAQ',
        name: 'FAQ',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>


        <h1>Your questions answered</h1>



<div className={css.FAQItemsContainer}>

<div className={css.FAQList}>
        <div><hr></hr></div>
        <div className={css.FAQTitle}>
        <h2>General questions</h2>
        </div>
        <NamedLink name="HowDoesSidesuiteProtectUsers" className={css.link}>
        <FAQItem img={shieldIcon} title="How does Sidesuite protect users?"/>
        </NamedLink>
        <NamedLink name="HowDoesTheTransactionProcessWork" className={css.link}>
        <FAQItem img={handshakeIcon} title="How does the transaction process work?"/>
        </NamedLink>
        <NamedLink name="WhatTypesOfPostsWorkTheBest" className={css.link}>
        <FAQItem img={selectIcon} title="What types of posts work the best?"/>
        </NamedLink>
        <NamedLink name="Calculator" className={css.link}>
        <FAQItem img={scaleIcon} title="How do I value a post?"/>
        </NamedLink>
        <NamedLink name="WhatAreTheFees" className={css.link}>
        <FAQItem img={creditCardIcon} title="What are the fees?"/>
        </NamedLink>
</div>

<div className={css.FAQList}>
        <div><hr></hr></div>
        <div className={css.FAQTitle}>
        <h2>Questions for creators</h2>
        </div>
        <NamedLink name="HowDoIConnectMyChannels" className={css.link}>
        <FAQItem img={socialPlatformIcon} title="How do I connect my channels?"/>
        </NamedLink>
        <NamedLink name="HowDoICreateAListing" className={css.link}>
        <FAQItem img={listingIcon} title="How do I create a listing?"/>
        </NamedLink>
        <NamedLink name="WhatDoINeedToDiscloseWhenPosting" className={css.link}>
        <FAQItem img={glassesIcon} title="What do I need to disclose when posting?"/>
        </NamedLink>
        <NamedLink name="HowDoTaxesWorkForCreators" className={css.link}>
        <FAQItem img={governmentIcon} title="How do taxes work for creators?"/>
        </NamedLink>
        </div>



        <div className={css.FAQList}>
        <div><hr></hr></div>
        <div className={css.FAQTitle}>
        <h2>Questions for brands</h2>
        </div>

        <NamedLink name="WhyIsMarketingWithSidesuiteBetter" className={css.link}>
        <FAQItem img={fireIcon} title="Why is marketing with Sidesuite better?"/>
        </NamedLink>
        <NamedLink name="HowDoIChooseTheRightCreator" className={css.link}>
        <FAQItem img={searchIcon} title="How do I choose the right creator?"/>
        </NamedLink>

        </div>
</div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQPage;
