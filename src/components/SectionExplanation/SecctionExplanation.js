import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ListingPostCard } from '../../components';

import firstImg from './img/Mountain-Inversion-Influencer-Marketing.jpeg';
import secondImg from './img/Mountain-View-Influencer-Marketing.jpg';
import thirdImg from './img/Man-Walk-Influencer-Marketing.jpg';

import css from './SectionExplanation.css';

const SectionExplanation = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  const exampleList = [firstImg, secondImg, thirdImg];
  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.title}>
          Sidesuite is the <br></br> marketplace for social <br></br> media content.
        </div>
        <p className={css.subtitle}>
          <FormattedMessage id="SectionExplanation.subTitle" />
        </p>
        {exampleList.map(example => {
          return (
            <div className={css.accountContainer}>
              <ListingPostCard
                img={example}
                postTitle={<FormattedMessage id="ListingPostCard.postTitle" />}
                postUsername={<FormattedMessage id="ListingPostCard.postUsername" />}
                postSocialMedia="Instagram"
                postFollowerAmmount="338"
                postValue={<FormattedMessage id="ListingPostCard.postValue" />}
              />
            </div>
          );
        })}
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
