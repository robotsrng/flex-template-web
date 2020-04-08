import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { ListingContactCard } from './ListingContactCard';

import css from './ContactPage.css';

import calendarImage from '../../assets/IconLibrary/Calendar-Icon.png';
import creditCardImage from '../../assets/IconLibrary/Credit-Card-Icon.png';
import accountImage from '../../assets/IconLibrary/Account-Icon.png';
import feedbackImg from '../../assets/IconLibrary/Glasses-Icon.png';

const ContactPage = () => {
  // const handleResponse = data => {
  //   console.log(data);
  // };

  // const handleError = error => {
  //   console.log(error);
  // };
  // prettier-ignore

  const heading = (
    <div className={css.heading}>
      <h1>What is this about?</h1>
      <p>We are here to help, and will get back to you withing 24 hours. Most likely a lot sooner than that.</p>
    </div>
  )

  const cards = (
    <div className={css.listingHolder}>
      <ListingContactCard icon={calendarImage}  title='Booking and disputes'/>
      <ListingContactCard icon={creditCardImage}  title='Payments and refunds'/>
      <ListingContactCard icon={accountImage}  title='My Sidesuite Account'/>
      <ListingContactCard icon={feedbackImg}  title='Ways we can improve'/>
    </div>
  );

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

        <LayoutWrapperMain className={css.staticPageWrapper}>
          {heading}
          {cards}
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactPage;
