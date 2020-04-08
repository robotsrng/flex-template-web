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

import css from './WhatAreTheFees.css';

const WhatAreTheFees = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="What Are The Fees"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'What Are The Fees',
        description: 'What Are The Fees',
        name: 'What Are The Fees',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>What are the fees?</h1>


        
        <ResourceItem resourceNumber="1" resourceSubTitle="Creators pay 5 percent." resourceDescription="Creators pay a fee of 5% on their listing price. When a creator posts for a listing of $40, they receive $38 into their bank account."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Brands pay 5 percent." resourceDescription="Brands pay a fee of 5% on the listing price. When a brand buys a posts for $40, they pay a total of $42 for that post."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WhatAreTheFees;
