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

import css from './HowDoICreateAListing.css';

const HowDoICreateAListing = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="How Does The Transaction Process Work"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'How Does The Transacation Process Work',
        description: 'How Does The Transacation Process Work',
        name: 'How Does The Transacation Process Work',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>How do I create a listing?</h1>
        <ResourceItem resourceNumber="1" resourceSubTitle="Public or private?" resourceDescription="Public listings get more exposure, and are typically used if you are listing your asset for rent in the general sense. Private listings can only be viewed by the brands you tag in the listing."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Choose your channel." resourceDescription="To create a listing you must first have connected at least one channel. This is the account where you will make the post on."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Tag brands." resourceDescription="Tag brands that you want to work with. They will see your listing on there feed."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Give your listing a title." resourceDescription="In three words or less describe your listing. Say something to get the brands attention."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="Give your listing a caption." resourceDescription="Think about your captions on your social media page."/>
        <ResourceItem resourceNumber="6" resourceSubTitle="Set your price." resourceDescription="This is the price for the post on your social account. If you need help, spend some time with our calculator. It’s fun!"/>
        <ResourceItem resourceNumber="7" resourceSubTitle="Add photos." resourceDescription="Add photos that represent your content well. If you are trying to target a specific brand, add photos that they would find valuable."/>
        
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoICreateAListing;
