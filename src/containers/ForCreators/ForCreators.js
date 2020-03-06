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

import css from './ForCreators.css';

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


        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ForCreators;
