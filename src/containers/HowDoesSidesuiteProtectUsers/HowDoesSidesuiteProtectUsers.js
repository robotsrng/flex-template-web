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

import css from './HowDoesSidesuiteProtectUsers.css';

const HowDoesSidesuiteProtectUsers = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="How Does Sidesuite Protect Users"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'How Does Sidesuite Protect Users',
        description: 'How Does Sidesuite Protect Users',
        name: 'How Does Sidesuite Protect Users',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>How Does Sidesuite Protect Users?</h1>




        <ResourceItem resourceNumber="1" resourceSubTitle="We will never sell your data." resourceDescription="Your data is your property. It is your right. Our purpose is to provide you with a platform for you to sell your data. We’re not going to do it for you, that’s our promise."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="All channels are verified." resourceDescription="When you’re doing a transaction through Sidesuite, you can be sure you’re doing business with the actual owner of that social channel. There are no imposters here, because we built security measures into the verification process."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Secure transaction process." resourceDescription="When you’re doing a transaction through Sidesuite, you can be sure you’re doing business with the actual owner of that social channel. There are no imposters here, because we built security measures into the verification process."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Both parties review." resourceDescription="After each transaction, both the creator and brand have an oppurtunity to review each other. This provides trust when looking for someone to work with. You can be sure you’re working with someone who provides value based on their review profile."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="We’re here for support." resourceDescription="As always, we’re here to help. Reach out if you need to change any details with a booking or a transaction. Reach out if you need any help at all."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoesSidesuiteProtectUsers;
 