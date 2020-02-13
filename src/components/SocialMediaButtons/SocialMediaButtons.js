import React, { useState } from 'react';
import css from './SocialMediaButtons.css';
import config from '../../config';

const SocialMediaButtons = props => {
  const { handleOnClick } = props;
  const [socialMediasPlatform] = useState(config.custom.socialMedias);
  return (
    <div className={css.linkAccountContainer}>
      {socialMediasPlatform.map(o => (
        <div className={css.colButtons} key={o.key}>
          <button onClick={handleOnClick} value={o.key}>
            {o.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaButtons;
