import React from 'react';
import css from './SocialMediaButtons.css';

const SocialMediaButtons = _ => {
  return (
    <div className={css.linkAccountContainer}>
      <div className={css.colButtons}>
        <button>Instagram</button>
      </div>
      <div className={css.colButtons}>
        <button>Facebook</button>
      </div>
      <div className={css.colButtons}>
        <button>Vsco</button>
      </div>
      <div className={css.colButtons}>
        <button>Pinterest</button>
      </div>
      <div className={css.colButtons}>
        <button>LinkedIn</button>
      </div>
      <div className={css.colButtons}>
        <button>Youtube</button>
      </div>
      <div className={css.colButtons}>
        <button>Vimeo</button>
      </div>
      <div className={css.colButtons}>
        <button>Twitch</button>
      </div>
      <div className={css.colButtons}>
        <button>Blog</button>
      </div>
      <div className={css.colButtons}>
        <button>Snapchat</button>
      </div>
      <div className={css.colButtons}>
        <button>Podcast</button>
      </div>
      <div className={css.colButtons}>
        <button>TikTok</button>
      </div>
    </div>
  );
};

export default SocialMediaButtons;
