import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ResourceItem,
} from '../../components';

import css from './HowDoTaxesWorkForCreators.css';

const HowDoTaxesWorkForCreators = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="How Do Taxes Work For Creators?"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'How Do Taxes Work For Creators?',
        description: 'How Do Taxes Work For Creators?',
        name: 'How Do Taxes Work For Creators?',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>How Do Taxes Work For Creators?</h1>



        
        <ResourceItem resourceNumber="1" resourceSubTitle="Sales tax" resourceDescription="Sidesuite does not collect or remit sales tax, so it is up to the creator to include sales taxes in the price if they are required to collect and remit in their location. Luckily most of us aren’t required. We’ll go through the requirements below."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Income tax" resourceDescription="Yes, when you work as a creator with Sidesuite you will have to pay income tax on your earnings. You are considered an independant contractor, and are required to report all income to the CRA. "/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Write offs" resourceDescription="If you are declaring income tax from your earnings through Sidesuite, you may be able to write certain expenses off. Anything used in the process of creating content or posting for brands could be a possible write off. We will provide a list of possible write offs, but we recommend you speak with an accountant for exact details on what you’re able to write off."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoTaxesWorkForCreators;
