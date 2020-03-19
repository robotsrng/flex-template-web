import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import backpack from './img/Backpack-Influencer-Marketing.jpg';
import addCircle from './img/AddCircle.png';
import waterView from './img/Water-View-Influencer-Marketing.jpg';
import road from './img/Road-Influencer-Marketing.jpg';
import mountainWalk from './img/Moutain-Walk-Influencer-Marketing.jpg';
import tinyLifeSupply from './img/TinyLifeSupply.png';
import bugwoodBean from './img/BugwoodBean.png';
import smithersBrewing from './img/SmithersBrewingCo.png';
import localSupplyCo from './img/LocalSupplyCo.png';
import novoBrand from './img/NovoBrand.png';
import hudsonBayMountain from './img/HudsonBayMountain.png';
import bulkleyValleyBrewery from './img/BulkleyValleyBrewery.png';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';
import { SocialMediaButtons } from '../../components';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.title" />
      </div>


      {/* Main Container */}
      <div className={css.steps}>



        {/* Container 1 */}
        <div className={css.stepContainer}>
          <hr></hr>
          <div className={css.stepContent}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle1" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text1" />
          </p>
          <div className={css.linkAccountContainer}>
            <div className={css.col}>
              <img src={backpack} className={css.linkAccountImg} alt="" />
            </div>
            <div className={css.colButtons}>
              <SocialMediaButtons />
            </div>
          </div>
          </div>
        </div>




        {/* Container 2 */}
        <div className={css.stepContainer}>
        <hr></hr>
        <div className={css.stepContent}>

          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle2" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text2" />
          </p>
          <div>
            <div className={css.addcircle}>
              <img src={addCircle} className={css.roundSmallImg} alt=""></img>
            </div>
            <div className={css.smallListing}>
              <img src={waterView} className={css.smallListingImg} alt=""></img>
            </div>
            <div className={css.smallListing}>
              <img src={road} className={css.smallListingImg} alt=""></img>
            </div>
            <div className={css.smallListing}>
              <img src={mountainWalk} className={css.smallListingImg} alt=""></img>
            </div>
          </div>
        </div>
        </div>

        {/* Container 3 */}
        <div className={css.stepContainer}>
        <hr></hr>
        <div className={css.stepContent}>

          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.subtitle3" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.text3" />
          </p>
          <div>
            <div className={css.brandsHowItWorks}>
              <img src={tinyLifeSupply} className={css.roundImg} alt=""></img>
            </div>
            <div className={css.brandsHowItWorks}>
              <img src={bugwoodBean} className={css.roundImg} alt=""></img>
            </div>
            <div className={css.brandsHowItWorks}>
              <img src={smithersBrewing} className={css.roundImg} alt=""></img>
            </div>
            <div className={css.brandsHowItWorks}>
              <img src={localSupplyCo} className={css.roundImg} alt=""></img>
            </div>
          </div>


          <div>
            <div className={css.brandsHowItWorks}>
              <img src={novoBrand} className={css.roundImgTwo} alt=""></img>
            </div>
            <div className={css.brandsHowItWorks}>
              <img src={hudsonBayMountain} className={css.roundImgTwo} alt=""></img>
            </div>
            <div className={css.brandsHowItWorks}>
              <img src={bulkleyValleyBrewery} className={css.roundImgTwo} alt=""></img>
            </div>
          </div>
          {/* axels code end*/}
        </div>
        </div>
      </div>

<div className={css.signUpLinkContainer}>
      <hr></hr>
      <div className={css.signUpLink}>

        <NamedLink name="SignupPage" className={css.signupButton}>
          <FormattedMessage id="SectionHowItWorks.signUpLink" />
        </NamedLink>
</div>
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
