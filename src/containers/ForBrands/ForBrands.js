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
} from '../../components';

import css from './ForBrands.css';

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


        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ForBrands;
