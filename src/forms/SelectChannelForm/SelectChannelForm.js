import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form, Button, SocialMediaButtons } from '../../components';

import css from './SelectChannelForm.css';

const SelectChannelFormComponent = props => {
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
    props.updatePlatform(e.target.value);
  };
  const handleNext = e => {
    e.preventDefault();
    props.onSubmit('location');
    props.setStepState('location');
  };
  const handleOnChange = value => {
    setInputValue(value);
    props.updateUsername(value);
  };
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const { className, rootClassName } = fieldRenderProps;

        const classes = classNames(rootClassName || css.root, className);
        return (
          <Form className={classes}>
            <div className={css.container}>
              <p className={css.sectionTitle}>Select the channel your are connecting</p>
              <p>
                After you have inserted the code into your bio. Select the channel below that you'd
                like to connect.
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
            <Button
              className={css.submitButton}
              type="submit"
              onClick={handleNext}
              disabled={disabled}
            >
              Next
            </Button>
          </Form>
        );
      }}
    />
  );
};

SelectChannelFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectChannelFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectChannelForm = compose(injectIntl)(SelectChannelFormComponent);

SelectChannelForm.displayName = 'SelectChannelForm';

export default SelectChannelForm;
