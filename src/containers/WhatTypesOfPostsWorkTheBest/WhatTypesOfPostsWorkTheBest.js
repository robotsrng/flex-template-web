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

import css from './WhatTypesOfPostsWorkTheBest.css';

const WhatTypesOfPostsWorkTheBest = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="What types of posts work the best"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'What types of posts work the best',
        description: 'What types of posts work the best',
        name: 'What types of posts work the best',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        <h1>What types of posts work the best?</h1>
        <p>There are no limits when creating content for posts. We’ll outline the best methods to promote your mission, and the different ways to post on social media.</p>

        
        <ResourceItem resourceNumber="1" resourceSubTitle="Product review" resourceDescription="When someone loves your product, there’s a good chance their friend group might love it too. Typically people interact with others with similar interests. Hire a creator to show their audience how much they love your product."/>
        <ResourceItem resourceNumber="2" resourceSubTitle="Brand mention" resourceDescription="The same goes for a brand mention. If you’re trying to spread awareness about your brand or cause, there’s no better way than letting someone else tell your story; it’s more believeable."/>
        <ResourceItem resourceNumber="3" resourceSubTitle="Event promotion" resourceDescription="Have you ever been on social media, and see your friend recommending an event? First, if you weren’t aware of the event, now you are. Second, you are more likely to go knowing that you’ll have someone you know at the event."/>
        <ResourceItem resourceNumber="4" resourceSubTitle="Unboxing" resourceDescription="Now that most sales happen through e-commerce, buyers like to know how people react to the product the first time they see it. It’s a great way to spread awareness of your product, and let potential customers know exactly what they’re getting when they order from you."/>
        <ResourceItem resourceNumber="5" resourceSubTitle="Tutorial" resourceDescription="If your product requires some learning, you might consider hiring a creator to run a tutorial for your product. This will spread awareness, and provide a learning platform for potential customers."/>
        <ResourceItem resourceNumber="6" resourceSubTitle="Your content" resourceDescription="If you already have content created, and want to get it out there, consider hiring a creator to add your content to their social channels."/>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WhatTypesOfPostsWorkTheBest;
