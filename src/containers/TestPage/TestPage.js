import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
const TestPage = () => {
  const handleResponse = data => {
    console.log(data);
  };

  const handleError = error => {
    console.log(error);
  };
  // prettier-ignore
  return (
    <StaticPage
      title="Test"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'TestPage',
        description: 'About Sidesuite',
        name: 'Test Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default TestPage;
