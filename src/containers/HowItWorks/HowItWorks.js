import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionHowItWorks,
} from '../../components';

import css from './HowItWorks.css';

const HowItWorks = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="How It Works"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HowItWorks',
        description: 'How It Works',
        name: 'How it works',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <SectionHowItWorks/>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowItWorks;
