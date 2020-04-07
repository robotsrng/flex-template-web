import React, { useState, useEffect } from 'react';
import { bool, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form, Button, VerificationCodeField } from '../../components';

import axios from 'axios';

import css from './VerificationCodeForm.css';

const VerificationCodeFormComponent = props => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    const data = {
      service: sessionStorage.getItem('platform'),
      username: sessionStorage.getItem('username'),
    };
    axios
      .post('/api/verify', data)
      .then(res => {
        if (res.data.code) {
          setVerificationCode(res.data.code.toString());
        } else setError(true);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }, []);
  const handleBack = _ => {
    const data = {
      service: sessionStorage.getItem('platform'),
      username: sessionStorage.getItem('username'),
    };
    axios
      .post('/api/delete-verification', data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    props.updateStep('channel');
    props.setStepState('channel');
  };

  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const { className, rootClassName, updateInProgress, handleSubmit } = fieldRenderProps;

        const classes = classNames(rootClassName || css.root, className);
        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {verificationCode ? (
              <div>
                <div className={css.container}>
                  <p className={css.sectionTitle}>Paste this code in your account bio</p>
                  <p>
                    Go to the profile of the social account you are verifying. Paste this into the
                    bio. Don't worry you can delete it right after.
                  </p>
                  <VerificationCodeField code={verificationCode} />
                </div>
                <Button className={css.submitButton} type="submit" inProgress={updateInProgress}>
                  Next
                </Button>
              </div>
            ) : null}
            {error ? (
              <div>
                <div className={css.container}>
                  <p className={css.sectionTitle}>Something went wrong</p>
                  <p>Please check that your username and platform is correct.</p>
                </div>
                <Button className={css.submitButton} type="button" onClick={handleBack}>
                  Back to select channel
                </Button>
              </div>
            ) : null}
          </Form>
        );
      }}
    />
  );
};

VerificationCodeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

VerificationCodeFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  // from injectIntl
  intl: intlShape.isRequired,
  updateInProgress: bool.isRequired,
};

const VerificationCodeForm = compose(injectIntl)(VerificationCodeFormComponent);

VerificationCodeForm.displayName = 'VerificationCodeForm';

export default VerificationCodeForm;
