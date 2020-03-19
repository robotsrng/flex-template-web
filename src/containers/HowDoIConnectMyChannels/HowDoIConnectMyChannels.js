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

import css from './HowDoIConnectMyChannels.css';

const HowDoIConnectMyChannels = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="HowDoIConnectMyChannels"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HowDoIConnectMyChannels',
        description: 'How Do I Connect My Channels',
        name: 'How Do I Connect My Channels',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>How Do I Connect My Channels?</h1>
        <ResourceItem resourceNumber="1" resourceSubTitle="Select the platform." resourceDescription="Select the platform which you would like to connect."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Enter your username." resourceDescription="Enter your username. Different platforms have different structures. Hover over a platform to get more details."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Add your core audience location." resourceDescription="Enter a location that makes most sense for the density of your audience. For example, if most of your followers are from your hometown, enter your city. If you have a bigger audience, enter your state, or nation."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Add your interests." resourceDescription="Add interests that represent your channel the best."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="Paste the code into your account bio." resourceDescription="This is how we verify that you own the channel you are connecting. Don’t worry, you can delete the code right after you’re finished."/>
        <ResourceItem resourceNumber="6" resourceSubTitle="Verify your account." resourceDescription="Click verify, our software will go to your account, and make sure that you are the owner."/>
        
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoIConnectMyChannels;
