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

import css from './HowDoIChooseTheRightCreator.css';

const HowDoIChooseTheRightCreator = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="How Do I Choose The Right Creator"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'How Do I Choose The Right Creator',
        description: 'How Do I Choose The Right Creator',
        name: 'How Do I Choose The Right Creator',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>How Do I Choose The Right Creator?</h1>




        <ResourceItem resourceNumber="1" resourceSubTitle="Start with your tags." resourceDescription="When you sign up for an account with Sidesuite, creators are able to tag your brand in their listings. If they tag you that means they love your product, and want to work with you. Chances are if they want to work with you, their audience might also like your product."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Think about reach and value." resourceDescription="With each marketing campaign, the amount of eyes on your content is important. Filter creators by audience, and use our calculator to see if their offering represents good value for your brand."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Search for creators in your location." resourceDescription="If you are a local business, marketing with creators in your area is going to be very effective. Search your hometown to find all the local offerings."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Search for creators by keywords or using filters." resourceDescription="Use our search and filter functions to narrow down your options even more. You can search by keyword, location, and filter results by social platform, interests, audience, and price."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="Look at their reviews." resourceDescription="After each campaign, brands are able to review creators. Look at their review profile to see if they’ve provided value in the past. If they have, chances are they will be able to provide your brand value if your interests line up."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoIChooseTheRightCreator;
 