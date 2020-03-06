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

const accountImage = require('./img/Account | Icon | Sidesuite.png');
const calendarImage = require('./img/Calendar Dark | Icon | Sidesuite.png');
const creditCardImage = require('./img/Credit Card | Icon | Sidesuite.png');
const feedbackImg = require('./img/Glasses Dark | Icon | Sidesuite.png');

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
      <h1>Select one below</h1>
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
