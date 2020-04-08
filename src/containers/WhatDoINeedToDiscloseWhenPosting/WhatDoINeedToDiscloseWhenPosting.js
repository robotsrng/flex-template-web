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

import css from './WhatDoINeedToDiscloseWhenPosting.css';

const WhatDoINeedToDiscloseWhenPosting = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="What Do I Need To Disclose When Posting"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'What Do I Need To Disclose When Posting',
        description: 'What Do I Need To Disclose When Posting',
        name: 'What Do I Need To Disclose When Posting',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>What Do I Need To Disclose When Posting?</h1>
        <p>When you get paid to represent a brand or product on social media, you need to disclose that information to your audience. We’ll let you know exactly how to disclose depending on your post.</p>
        <h3>#ad</h3>
        <h3>#sponsored</h3>
        <h3>#advertisement</h3>


        
        <ResourceItem resourceNumber="1" resourceSubTitle="Social posts" resourceDescription="Add #ad, #advertisement, or #sponsored to your post caption. The disclosure should placed so it is easy to see, and not mixed in between hashtags."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Snapchat or Instagram Stories" resourceDescription="You need to superimpose #ad, #advertisement, or #sponsored over the image in a place where the viewer can easily see it."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Video and livestream" resourceDescription="When doing a video ad you must diclose your partnership in the video itself. If youre video is a livestream ad, you must regulary disclose your partnership for new viewers that join the livestream."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WhatDoINeedToDiscloseWhenPosting;
