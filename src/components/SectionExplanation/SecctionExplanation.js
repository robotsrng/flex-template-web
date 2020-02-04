import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ListingPostCard } from '../../components';

import firstImg from './img/FirstImg.jpg';
import secondImg from './img/SecondImg.jpg';
import thirdImg from './img/ThirdImg.jpg';

import css from './SectionExplanation.css';

const SectionExplanation = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.title}>
          Sidesuite is the <br></br> marketplace for social <br></br> media content.
        </div>
        <p className={css.subtitle}>
          <FormattedMessage id="SectionExplanation.subTitle" />
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
