import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import firstImg from './img/FirstImg.jpg';
import secondImg from './img/SecondImg.jpg';
import thirdImg from './img/ThirdImg.jpg';
import companyFirstImg from './img/FourthImg.png';
import companySecondImg from './img/FifthImg.png';
import linkAccountImg from './img/LinkAccountImg.jpg';

import { NamedLink, ListingPostCard, ListingUserCard } from '../../components';

import css from './SectionHowItWorks.css';
import { SocialMediaButtons } from '../../components';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  const reviews = { rating: 5, ammount: 105 };
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.title" />
      </div>
      <hr />
      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle1" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text1" />
          </p>
          <div className={css.linkAccountContainer}>
            <div className={css.col}>
              <img src={linkAccountImg} className={css.linkAccountImg} alt="" />
            </div>
            <div className={css.colButtons}>
              <SocialMediaButtons />
            </div>
          </div>
        </div>
        <hr />
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle2" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text2" />
          </p>
          <div className={css.accountContainer}>
            <ListingPostCard
              img={firstImg}
              postTitle={<FormattedMessage id="ListingPostCard.postTitle" />}
              postUsername={<FormattedMessage id="ListingPostCard.postUsername" />}
              postFollowerAmmount={<FormattedMessage id="ListingPostCard.postFollowerAmmount" />}
              postValue={<FormattedMessage id="ListingPostCard.postValue" />}
            />
          </div>
          <div className={css.accountContainer}>
            <ListingPostCard
              img={secondImg}
              postTitle={<FormattedMessage id="ListingPostCard.postTitle" />}
              postUsername={<FormattedMessage id="ListingPostCard.postUsername" />}
              postFollowerAmmount={<FormattedMessage id="ListingPostCard.postFollowerAmmount" />}
              postValue={<FormattedMessage id="ListingPostCard.postValue" />}
            />
          </div>
          <div className={css.accountContainer}>
            <ListingPostCard
              img={thirdImg}
              postTitle={<FormattedMessage id="ListingPostCard.postTitle" />}
              postUsername={<FormattedMessage id="ListingPostCard.postUsername" />}
              postFollowerAmmount={<FormattedMessage id="ListingPostCard.postFollowerAmmount" />}
              postValue={<FormattedMessage id="ListingPostCard.postValue" />}
            />
          </div>
        </div>
        <hr />
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle3" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text3" />
          </p>
          <ListingUserCard
            img={companyFirstImg}
            username="tinylifesupply"
            userAudience="500"
            reviews={reviews}
          />
          <ListingUserCard
            img={companySecondImg}
            username="sidesuite"
            userAudience="500"
            reviews={reviews}
          />
        </div>
      </div>
      <hr />
      <div className={css.signUpLink}>
        <NamedLink name="SignupPage" className={css.signupButton}>
          <FormattedMessage id="SectionHowItWorks.signUpLink" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
