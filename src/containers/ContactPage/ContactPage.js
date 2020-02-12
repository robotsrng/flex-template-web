import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
const ContactPage = () => {
  // const handleResponse = data => {
  //   console.log(data);
  // };

  // const handleError = error => {
  //   console.log(error);
  // };
  // prettier-ignore
  return (
    <StaticPage
      title="Contact"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ContactPage',
        description: 'About Sidesuite',
        name: 'Contact Page',
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

export default ContactPage;
