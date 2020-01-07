import React, { useState } from 'react';
import css from './SocialMediaButtons.css';
import FacebookLogin from 'react-facebook-login';
import Swal from 'sweetalert2';
import axios from 'axios';

const SocialMediaButtons = props => {
  const [socialMediaName, setSocialMediaName] = useState('');
  const handleResponse = data => {
    Swal.fire({
      title: 'Success',
      text: 'Please verify your email to get the verify code',
      icon: 'success',
    });
    const newAccount = { Facebook: { username: data.name, picture: data.picture.data.url } };
    props.setNewAccount(newAccount);
    const verificationCode = Math.floor(
      Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)
    );
    props.setVerificationCode(verificationCode.toString());
    console.log(verificationCode);
    const mailData = {
      destination: props.currentUser.attributes.email,
      text: 'Your verification code is ' + verificationCode,
    };
    // const account={}
    // axios
    //   .post('/api/sendMail', mailData)
    //   .then(r => {
    //     console.log(r);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    props.setStateButtons(true);
    console.log(data);
  };
  const handleOnclickFacebook = e => {
    setSocialMediaName(e.target.textContent);
  };
  return (
    <div className={css.linkAccountContainer}>
      <div className={css.colButtons}>
        <button>Instagram</button>
      </div>
      <div className={css.colButtons}>
        <FacebookLogin
          appId="2644611702444575"
          autoLoad={false}
          size="medium"
          scope="user_friends"
          fields="name,email,picture"
          callback={handleResponse}
          onClick={handleOnclickFacebook}
          cssClass={css.colButtons}
          textButton="Facebook"
        >
          Facebook
        </FacebookLogin>
      </div>
      <div className={css.colButtons}>
        <button onClick={handleOnclickFacebook}>Vsco</button>
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
