import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  BlogItem,
} from '../../components';

import css from './Blog.css';

const heading = (
  <div className={css.heading}>
    <h1>Sidenotes</h1>
    <p>Here's our story.</p>
  </div>
)

const Blog = () => {
  const marketingPlanImg = require('./img/Hudson Bay.jpg');
  const marketingPlanTitle = 'Our Marketing Plan';
  const marketingPlanCreated = 'August 12, 2019';
  const marketingPlanDescription =
    'Once I had Sidesuite built, I thought about how I was going to market it. In the end it was a no brainer, but it didn’t come easy to me.';
  // prettier-ignore
  return (
    <StaticPage
      title="Blog"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Blog',
        description: 'Blog',
        name: 'Blog',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>

        {heading}
          <div className={css.contentWrapper}>
            <BlogItem img={marketingPlanImg} title={marketingPlanTitle} created={marketingPlanCreated} description={marketingPlanDescription}/>
            <BlogItem img={marketingPlanImg} title={marketingPlanTitle} created={marketingPlanCreated} description={marketingPlanDescription}/>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default Blog;
