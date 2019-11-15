import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';

import css from './AboutPage.css';
import firstImg from './img/FirstImg.jpg';
import secondImg from './img/SecondImg.jpg';
import thirdImg from './img/ThirdImg.jpg';

const AboutPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Sidesuite',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About us</h1>

          <div className={css.contentWrapper}>

            <div className={css.contentMain}>
              <h2 className={css.subtitle}>What is Sidesuite?</h2>
              <div className={css.contentContainer}>
                <div className={css.col}>
                  <img src={firstImg} className={css.roundImg}></img>
                </div>
                <p>The marketplace for social media content. Where you can rent out the content of your social media posts. Where brands connect with people to tell their story. We’re here for introductions. Brands meet creators. Creators meet brands.</p>
              </div>
            </div>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>Why do brands want to pay for your online content?</h2>
              <div className={css.contentContainer}>
                <div className={css.col}>
                  <img src={secondImg} className={css.squareImg}></img>
                </div>
                <p>Because it gives them an engaged audience that currently they do not have. Think about it, what’s more effective, telling a story about yourself, or letting someone else tell it for you? Their brand image is no different, they’re looking for someone else to tell their story.</p>
              </div>
            </div>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>What do we believe?</h2>
              <div className={css.contentContainer}>
                <div className={css.col}>
                  <img src={thirdImg} className={css.roundImg}></img>
                </div>
                <p>In being our own customer. Our business is Sidesuite, we have to market it. We believe that Sidesuite provides the avenue for the most effective form of marketing in 2019, and we’re going to do one hundred percent of our marketing on our platform.</p>
              </div>
            </div>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>Established</h2>
              <p>January 2020</p>
            </div>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>Creators</h2>
              <p>1</p>
            </div>
            <div className={css.contentMain}>
              <h2 className={css.subtitle}>Brands</h2>
              <p>1</p>
            </div>
            <div className={css.createListingLink}>
              <NamedLink name='HowItWorks' className={css.signupButton}>
                How it works
              </NamedLink>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
