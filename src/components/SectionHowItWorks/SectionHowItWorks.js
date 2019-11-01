import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import firstImg from './img/FirstImg.jpg';
import secondImg from './img/SecondImg.jpg';
import thirdImg from './img/ThirdImg.jpg';
import companyFirstImg from './img/ThirdImg.jpg';
import companySecondImg from './img/ThirdImg.jpg';
import linkAccountImg from './img/LinkAccountImg.jpg';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';
import AccountExampleView from '../AccountExampleView/AccountExampleView';
import SocialMediaButtons from '../SocialMediaButtons/SocialMediaButtons';

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
          <AccountExampleView
            img={firstImg}
            postTitle={<FormattedMessage id="AccountExampleViewInfluencer.postTitle" />}
            postUsername={<FormattedMessage id="AccountExampleViewInfluencer.postUsername" />}
            postFollowerAmmount={
              <FormattedMessage id="AccountExampleViewInfluencer.postFollowerAmmount" />
            }
            postValue={<FormattedMessage id="AccountExampleViewInfluencer.postValue" />}
          />
          <AccountExampleView
            img={secondImg}
            postTitle={<FormattedMessage id="AccountExampleViewInfluencer.postTitle" />}
            postUsername={<FormattedMessage id="AccountExampleViewInfluencer.postUsername" />}
            postFollowerAmmount={
              <FormattedMessage id="AccountExampleViewInfluencer.postFollowerAmmount" />
            }
            postValue={<FormattedMessage id="AccountExampleViewInfluencer.postValue" />}
          />
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
        <hr />
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle3" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text3" />
          </p>
          <AccountExampleView
            img={companySecondImg}
            postTitle={<p>tinylifesupply</p>}
            postUsername={<p>Marketing Team</p>}
            postFollowerAmmount={<p>338 followers</p>}
          />
          <AccountExampleView
            img={companyFirstImg}
            postTitle={<p>sidesuite</p>}
            postUsername={<p>Vancouver, CA</p>}
            postFollowerAmmount={<p>338 followers</p>}
          />
        </div>
      </div>
      <hr />
      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage" className={css.signupButton}>
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
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
