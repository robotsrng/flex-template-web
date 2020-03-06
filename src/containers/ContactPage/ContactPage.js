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

const AccountImage = require('./images/Account White _ Sidesuite copy 3.png');
const CalendarImage = require('./images/Calendar White _ Bookings _ Sidesuite copy 3.png');
const CreditCardImage = require('./images/Credit Card White _ Payment Method _ Sidesuite copy 3.png');

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
      <h1>Select one bellow</h1>
      <p>We are here to help, and will get back to you withing 24 hours. Most likely a lot sooner than that.</p>
    </div>
  )

  const cards = (
    <div className={css.listingHolder}>
      <ListingContactCard icon={CalendarImage} title="Booking and Disputes" />
      <ListingContactCard icon={CreditCardImage} title="Payments and Refunds" />
      <ListingContactCard icon={AccountImage} title="My sidesuite Account" />
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

        <LayoutWrapperMain>
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
