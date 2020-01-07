import React, { Component, useState } from 'react';
import { bool, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form, Button, SocialMediaButtons, AccountExampleView } from '../../components';
import CodeInput from 'react-verification-code-input';
import Swal from 'sweetalert2';

import { updateSocialAccount } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import css from './AddAccountForm.css';

const AddAccountFormComponent = props => {
  const [newAccount, setNewAccount] = useState();
  const [accountList, setAccountList] = useState([]);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState();
  const test = { publicData: { age: 27 } };
  updateSocialAccount(test);
  const handleFinishedEditing = e => {
    e.preventDefault();
    props.setToggle({ toggleForm: 1 });
  };
  const handleOnComplete = e => {
    if (e === verificationCode) {
      Swal.fire({
        icon: 'success',
        title: 'Your account has been veryfied',
        showConfirmButton: false,
        timer: 2500,
      });
      if (accountList) {
        setAccountList([...accountList, newAccount]);
      } else setAccountList([newAccount]);
      console.log(accountList);
      const updateUser = { publicData: accountList };
      updateSocialAccount(updateUser);
      setShowVerification(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong verification code!',
      });
    }
  };
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const { className, currentUser, intl, rootClassName, values } = fieldRenderProps;

        const classes = classNames(rootClassName || css.root, className);
        return (
          <Form className={classes}>
            <div className={css.container}>
              <div className={css.socialContainer}>
                <SocialMediaButtons
                  currentUser={currentUser}
                  verificationCode={verificationCode}
                  setVerificationCode={setVerificationCode}
                  stateButtons={showVerification}
                  setStateButtons={setShowVerification}
                  newAccount={newAccount}
                  setNewAccount={setNewAccount}
                />
              </div>
              <div className={css.codeInputContainer}>
                {showVerification ? (
                  <CodeInput classNamecss={css.codeInput} onComplete={handleOnComplete} />
                ) : null}
              </div>
              {accountList.map(options => {
                return (
                  <AccountExampleView
                    postUsername={options.Facebook.username}
                    postFollowerAmmount="450 Friends"
                    img={options.Facebook.picture}
                    cssImg="Circle"
                  />
                );
              })}
            </div>
            <Button className={css.submitButton} type="submit" onClick={handleFinishedEditing}>
              Finished editing
            </Button>
          </Form>
        );
      }}
    />
  );
};

AddAccountFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

AddAccountFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const AddAccountForm = compose(injectIntl)(AddAccountFormComponent);

AddAccountForm.displayName = 'AddAccountForm';

export default AddAccountForm;
