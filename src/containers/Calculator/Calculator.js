import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionCalculator,
} from '../../components';

import css from './Calculator.css';

const Calculator = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Calculator"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Calculator',
        description: 'Calculator',
        name: 'Calculator',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <SectionCalculator title="What are your account details?" description="Your accounts must be public for the calculator to work."/>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default Calculator;
