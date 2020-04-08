import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionCalculator,
  SectionHowItWorks,
  NamedLink,
  FAQItem,
} from '../../components';

import css from './ForCreators.css';

import listingIcon from '../../assets/IconLibrary/Listing-Icon.png';
import glassesIcon from '../../assets/IconLibrary/Glasses-Icon.png';
import governmentIcon from '../../assets/IconLibrary/Government-Icon.png';
import handshakeIcon from '../../assets/IconLibrary/Handshake-Icon.png';
import shieldIcon from '../../assets/IconLibrary/Shield-Icon.png';
import socialPlatformIcon from '../../assets/IconLibrary/Social-Platform-Icon.png';
import scaleIcon from '../../assets/IconLibrary/Scale-Icon.png';


const ForCreators = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="For Creators"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ForCreators',
        description: 'For Creators',
        name: 'For Creators',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>



        <SectionCalculator title="Earn money as a Sidesuite creator." description="Use our calculator by clicking on a social platorm and entering your username to find an estimated value for your next social post."/>

        <SectionHowItWorks/>

<br></br>
<div><hr></hr></div>
<div className={css.FAQTitle}>
        <h1>Your questions answered</h1>
        </div>
        <div className={css.FAQItemsContainer}>
        <div className={css.FAQList}>

        <NamedLink name="HowDoIConnectMyChannels" className={css.link}>
        <FAQItem img={socialPlatformIcon} title="How do I connect my channels?"/>
        </NamedLink>
        <NamedLink name="HowDoICreateAListing" className={css.link}>
        <FAQItem img={listingIcon} title="How do I create a listing?"/>
        </NamedLink>

        <NamedLink name="Calculator" className={css.link}>
        <FAQItem img={scaleIcon} title="How do I value a post?"/>
        </NamedLink>
        <NamedLink name="HowDoesTheTransactionProcessWork" className={css.link}>
        <FAQItem img={handshakeIcon} title="How does the transaction process work?"/>
        </NamedLink>
        </div>
        <div className={css.FAQList}>
        <NamedLink name="WhatDoINeedToDiscloseWhenPosting" className={css.link}>
        <FAQItem img={glassesIcon} title="What do I need to disclose when posting?"/>
        </NamedLink>

        <NamedLink name="HowDoTaxesWorkForCreators" className={css.link}>
        <FAQItem img={governmentIcon} title="How do taxes work for creators?"/>
        </NamedLink>
        <NamedLink name="HowDoesSidesuiteProtectUsers" className={css.link}>
        <FAQItem img={shieldIcon} title="How does Sidesuite protect users?"/>
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

export default ForCreators;
