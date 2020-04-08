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

import css from './ForBrands.css';

import searchIcon from '../../assets/IconLibrary/Search-Icon.png';
import scaleIcon from '../../assets/IconLibrary/Scale-Icon.png';
import handshakeIcon from '../../assets/IconLibrary/Handshake-Icon.png';
import fireIcon from '../../assets/IconLibrary/Fire-Icon.png';
import shieldIcon from '../../assets/IconLibrary/Shield-Icon.png';

const ForBrands = () => {
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


        <SectionCalculator title="How valuable is your audience?" description="Use our calculator by clicking on a social platorm and entering your username to find an estimated value for your next social post."/>
        <SectionHowItWorks/>


        <br></br>
<div><hr></hr></div>
<div className={css.FAQTitle}>
        <h1>Your questions answered</h1>
        </div>
        <div className={css.FAQItemsContainer}>
        <div className={css.FAQList}>

        <NamedLink name="HowDoIChooseTheRightCreator" className={css.link}>
        <FAQItem img={searchIcon} title="How do I choose the right creator?"/>
        </NamedLink>
        <NamedLink name="Calculator" className={css.link}>
        <FAQItem img={scaleIcon} title="How do I value a post?"/>
        </NamedLink>

        <NamedLink name="HowDoesTheTransactionProcessWork" className={css.link}>
        <FAQItem img={handshakeIcon} title="How does the transaction process work?"/>
        </NamedLink>
        </div>
        <div className={css.FAQList}>
        <NamedLink name="WhyIsMarketingWithSidesuiteBetter" className={css.link}>
        <FAQItem img={fireIcon} title="Why is marketing with Sidesuite better?"/>
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

export default ForBrands;
