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

import css from './HowDoesTheTransactionProcessWork.css';

const HowDoesTheTransactionProcessWork = () => {
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

        <h1>How does the transaction process work?</h1>



        <div>
          <ResourceItem resourceNumber="1" resourceSubTitle="Brands Request Post." resourceDescription="Brands request a post from a creator they admire. Posts should meet brand’s marketing objectives and target audience."/>
          <div>

           {/* Image */}
            <div>


              </div>


           {/* Info */}
            <div>

              </div>





            </div>

        </div>
        <ResourceItem resourceNumber="2" resourceSubTitle="Brand and creator discuss post details." resourceDescription="Communicate freely to discuss the exact contents of the post."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Creator accepts or declines." resourceDescription="Creators have the right to accept or decline the booking depending on if they want to work with the brand or not."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Funds are pre authorized." resourceDescription="The charge for the post is pre authorized from the brands credit card. No funds move yet."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="Creator uploads content for the post." resourceDescription="Creator creates content for the post, and uploads it to Sidesuite to show it to the brand."/>
        <ResourceItem resourceNumber="6" resourceSubTitle="Brand accepts or declines post content." resourceDescription="The brand has the right to approve the content for the post. If the brand declines, the creator can to create more content or cancel the booking."/>
        <ResourceItem resourceNumber="7" resourceSubTitle="Creator posts to social media." resourceDescription="Creator posts content to their social media channel agreed upon in post details."/>
        <ResourceItem resourceNumber="8" resourceSubTitle="Creator uploads the link to the post." resourceDescription="Creator uploads the link to the post to notify the brand. We save the post details for the creator and display them in your portfolio to help market future bookings."/>
        <ResourceItem resourceNumber="9" resourceSubTitle="Funds are transferred from brand to creator." resourceDescription="Creator gets paid for post."/>
        <ResourceItem resourceNumber="10" resourceSubTitle="Both parties review." resourceDescription="Brands review creators on content. Creators review brands on trust."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowDoesTheTransactionProcessWork;
