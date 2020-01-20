import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import firstImg from './img/FirstImg.jpg';
import secondImg from './img/SecondImg.jpg';
import thirdImg from './img/ThirdImg.jpg';

import css from './SectionExplanation.css';
import AccountExampleView from '../AccountExampleView/AccountExampleView';

const SectionExplanation = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.title}>
          Sidesuite is the <br></br> marketplace for your social <br></br> media content.
        </div>
        <p className={css.subtitle}>
          <FormattedMessage id="SectionExplanation.subTitle" />
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
    </div>
  );
};

SectionExplanation.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionExplanation.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionExplanation;