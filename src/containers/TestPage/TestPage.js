import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { FacebookProvider, Login } from 'react-facebook';
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

        <FacebookProvider appId="2644611702444575">
              <Login scope="email" onCompleted={handleResponse} onError={handleError}>
                <span>Login via Facebook</span>
              </Login>
            </FacebookProvider>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default TestPage;
