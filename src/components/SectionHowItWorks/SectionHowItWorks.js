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

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';
import AccountExampleView from '../AccountExampleView/AccountExampleView';
import { SocialMediaButtons } from '../../components';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
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
              <img src={linkAccountImg} className={css.linkAccountImg} />
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
            <AccountExampleView
              img={firstImg}
              postTitle={<FormattedMessage id="AccountExampleViewInfluencer.postTitle" />}
              postUsername={<FormattedMessage id="AccountExampleViewInfluencer.postUsername" />}
              postFollowerAmmount={
                <FormattedMessage id="AccountExampleViewInfluencer.postFollowerAmmount" />
              }
              postValue={<FormattedMessage id="AccountExampleViewInfluencer.postValue" />}
            />
          </div>
          <div className={css.accountContainer}>
            <AccountExampleView
              img={secondImg}
              postTitle={<FormattedMessage id="AccountExampleViewInfluencer.postTitle" />}
              postUsername={<FormattedMessage id="AccountExampleViewInfluencer.postUsername" />}
              postFollowerAmmount={
                <FormattedMessage id="AccountExampleViewInfluencer.postFollowerAmmount" />
              }
              postValue={<FormattedMessage id="AccountExampleViewInfluencer.postValue" />}
            />
          </div>
          <div className={css.accountContainer}>
            <AccountExampleView
              img={thirdImg}
              postTitle={<FormattedMessage id="AccountExampleViewInfluencer.postTitle" />}
              postUsername={<FormattedMessage id="AccountExampleViewInfluencer.postUsername" />}
              postFollowerAmmount={
                <FormattedMessage id="AccountExampleViewInfluencer.postFollowerAmmount" />
              }
              postValue={<FormattedMessage id="AccountExampleViewInfluencer.postValue" />}
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
          <AccountExampleView
            cssImg={companyFirstImg}
            img={companyFirstImg}
            postTitle="tinylifesupply"
            postUsername="Marketing Team"
            postFollowerAmmount="338 followers"
          />
          <AccountExampleView
            cssImg={companySecondImg}
            img={companySecondImg}
            postTitle="sidesuite"
            postUsername="Vancouver, CA"
            postFollowerAmmount="338 followers"
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
