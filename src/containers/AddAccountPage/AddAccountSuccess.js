import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ListingSocialMediaCard, NamedLink } from '../../components';

import css from './AddAccountSuccess.css';

const AddAccountSuccessForm = props => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const data = {
      service: sessionStorage.getItem('platform'),
      username: sessionStorage.getItem('username'),
    };
    axios
      .post('/api/getInfo', data)
      .then(res => {
        console.log(res);
        setUser({
          username: sessionStorage.getItem('username'),
          platform: sessionStorage.getItem('platform'),
          photo: res.data.photo,
          audience: res.data.count,
        });
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <React.Fragment>
      <div className={css.container}>
        <h1>
          Your channel is<span className={css.greenText}> verified!</span>
        </h1>
        <ListingSocialMediaCard
          img={user.photo}
          username={user.username}
          audience={user.audience}
          platform={user.platform}
        />
      </div>
      <NamedLink name="NewListingPage" className={css.submitButton}>
        Add your post +
      </NamedLink>
    </React.Fragment>
  );
};

export default AddAccountSuccessForm;
