import React from 'react';
import { shape, object, string } from 'prop-types';
import classNames from 'classnames';
import { ListingSocialMediaCard } from '../../components';

import css from './ListingPage.css';

const SectionOfferingMaybe = props => {
  const { className, rootClassName, publicData } = props;
  const classes = classNames(rootClassName || css.root, className);
  const channel = publicData && publicData.offering ? publicData.offering : null;
  return publicData && publicData.offering ? (
    <div className={classes}>
      <div className={css.sectionOfferingMaybe}>
        <ListingSocialMediaCard
          img={channel.photo}
          username={channel.username}
          audience={channel.count}
          platform={channel.platform}
        />
      </div>
    </div>
  ) : null;
};

SectionOfferingMaybe.defaultProps = { className: null, rootClassName: null };

SectionOfferingMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    offering: object,
  }),
};

export default SectionOfferingMaybe;
