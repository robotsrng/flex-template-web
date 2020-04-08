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

import css from './WhyIsMarketingWithSidesuiteBetter.css';

const WhyIsMarketingWithSidesuiteBetter = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Why Is Marketing With Sidesuite Better"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Why Is Marketing With Sidesuite Better',
        description: 'Why Is Marketing With Sidesuite Better',
        name: 'Why Is Marketing With Sidesuite Better',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>Why Is Marketing With Sidesuite Better?</h1>



        <ResourceItem resourceNumber="1" resourceSubTitle="Paid ads are getting less effective." resourceDescription="We all do it, once we see the word sponsored we just scroll by as if it wasn’t even there. They’re like commercials on TV, viewers have begun to tune out. The algorithim used is handy to target users that you think will like your product, but the missing part of the formula is actual engagement and trust."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Marketing with creators is reaches an engaged audience." resourceDescription="When you market with creators, the viewers that see your content choose to see it. They’ve made a choice to follow that account because they trust them. The product of engagement and trust is one advertisers haven’t had the oppurtunity to tap into until now."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Let someone else tell your story." resourceDescription="Think about it, what’s more effective, telling a story about yourself, or letting someone else tell it for you? Your brand image is no different, let someone else tell your story."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WhyIsMarketingWithSidesuiteBetter;
