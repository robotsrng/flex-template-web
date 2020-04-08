import React, { useState, useEffect } from 'react';
import { SocialMediaButtons } from '../../components';

import css from './SelectChannelForm.css';

const SelectChannelForm = props => {
  const [inputValue, setInputValue] = useState('');
  const [socialMediaSelected, setSocialMediaSelected] = useState('');
  const disabled = !inputValue || !socialMediaSelected;
  useEffect(() => {
    if (sessionStorage.getItem('platform')) {
      setSocialMediaSelected(sessionStorage.getItem('platform'));
    }
    if (sessionStorage.getItem('username')) {
      setInputValue(sessionStorage.getItem('username'));
    }
  }, []);
  const handleOnClick = e => {
    e.preventDefault();
    setSocialMediaSelected(e.target.value);
    props.updateStorage('platform', e.target.value);
  };
  const handleNext = e => {
    e.preventDefault();
    props.onSubmit('location');
  };
  const handleOnChange = value => {
    setInputValue(value);
    props.updateStorage('username', value);
  };
  return (
    <React.Fragment>
      <div className={css.container}>
        <p className={css.sectionTitle}>Select the channel your are connecting</p>
        <p>
          After you have inserted the code into your bio. Select the channel below that you'd like
          to connect.
        </p>
        <div className={css.socialContainer}>
          <SocialMediaButtons
            handleOnClick={handleOnClick}
            socialMediaSelected={socialMediaSelected}
          />
        </div>
        {socialMediaSelected ? (
          <div className={css.input}>
            <p className={css.inputTitle}>
              {socialMediaSelected.replace(/^\w/, c => c.toUpperCase())}
            </p>
            <input
              placeholder="username"
              onChange={e => handleOnChange(e.target.value)}
              value={inputValue}
            ></input>
          </div>
        ) : null}
      </div>
      <button className={css.submitButton} type="submit" onClick={handleNext} disabled={disabled}>
        Next
      </button>
    </React.Fragment>
  );
};

export default SelectChannelForm;
