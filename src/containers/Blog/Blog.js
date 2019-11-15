import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  BlogItem,
} from '../../components';

import css from './Blog.css';

const Blog = () => {
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


          <div className={css.contentWrapper}>
            <BlogItem/>
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
