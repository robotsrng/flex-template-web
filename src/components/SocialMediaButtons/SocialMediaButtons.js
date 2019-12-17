import React, { useState } from 'react';
import css from './SocialMediaButtons.css';
import { FacebookProvider, Profile, LoginButton } from 'react-facebook';
import Swal from 'sweetalert2';
import axios from 'axios';
import cloudinary from 'cloudinary-core';

const cloudName = 'sidesuite';
const SocialMediaButtons = props => {
  //Get img
  const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'demo' });
  const SampleImg = () => <img src={cloudinaryCore.url('sample')} />;
  // Upload img

  const handleResponse = data => {
    Swal.fire({
      title: 'Success',
      text: 'Please verify your email to get the verify code',
      icon: 'success',
    });
    const verificationCode = Math.floor(
      Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)
    );
    props.setVerificationCode(verificationCode.toString());
    console.log(verificationCode);
    const mailData = {
      destination: props.currentUser.attributes.email,
      text: 'Your verification code is ' + verificationCode,
    };
    // axios
    //   .post('/api/sendMail', mailData)
    //   .then(r => {
    //     console.log(r);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // props.setStateButtons(true);
    console.log(data);
  };
  const handleError = error => {
    Swal.fire({
      title: 'Error',
      text: 'There was an issue while verifying your account please try later or contact support',
      icon: 'error',
    });
  };
  return (
    <div className={css.linkAccountContainer}>
      {console.log(cloudinaryCore.url('sample'))}
      <div className={css.colButtons}>
        <button>Instagram</button>
      </div>
      <div className={css.colButtons}>
        <FacebookProvider appId="2644611702444575">
          <LoginButton scope="email" onCompleted={handleResponse} onError={handleError}>
            Facebook
          </LoginButton>
        </FacebookProvider>
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
