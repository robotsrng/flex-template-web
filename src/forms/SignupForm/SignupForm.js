import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  FieldSelectCountry,
  FieldSelectState,
  FieldSelect,
} from '../../components';
import csc from 'country-state-city';

import css from './SignupForm.css';

const KEY_CODE_ENTER = 13;

const SignupFormComponent = props => {
  const [countries] = useState(csc.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const handleOnChangeCountries = e => {
    setStates(
      csc.getStatesOfCountry(
        e.target.options[e.target.options.selectedIndex].getAttribute('data-key')
      )
    );
  };
  const handleOnChangeStates = e => {
    setCities(
      csc.getCitiesOfState(
        e.target.options[e.target.options.selectedIndex].getAttribute('data-key')
      )
    );
  };
  const handleOnClickAccountType = e => {
    e.preventDefault();
    props.setAccountTypeName(e.target.value);
  };
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          formId,
          handleSubmit,
          inProgress,
          invalid,
          intl,
          onOpenTermsOfService,
        } = fieldRenderProps;
        // email

        const emailLabel = intl.formatMessage({
          id: 'SignupForm.emailLabel',
        });
        const emailPlaceholder = intl.formatMessage({
          id: 'SignupForm.emailPlaceholder',
        });
        const emailRequiredMessage = intl.formatMessage({
          id: 'SignupForm.emailRequired',
        });
        const emailRequired = validators.required(emailRequiredMessage);
        const emailInvalidMessage = intl.formatMessage({
          id: 'SignupForm.emailInvalid',
        });
        const emailValid = validators.emailFormatValid(emailInvalidMessage);

        // password
        const passwordLabel = intl.formatMessage({
          id: 'SignupForm.passwordLabel',
        });
        const passwordPlaceholder = intl.formatMessage({
          id: 'SignupForm.passwordPlaceholder',
        });
        const passwordRequiredMessage = intl.formatMessage({
          id: 'SignupForm.passwordRequired',
        });
        const passwordMinLengthMessage = intl.formatMessage(
          {
            id: 'SignupForm.passwordTooShort',
          },
          {
            minLength: validators.PASSWORD_MIN_LENGTH,
          }
        );
        const passwordMaxLengthMessage = intl.formatMessage(
          {
            id: 'SignupForm.passwordTooLong',
          },
          {
            maxLength: validators.PASSWORD_MAX_LENGTH,
          }
        );
        const passwordMinLength = validators.minLength(
          passwordMinLengthMessage,
          validators.PASSWORD_MIN_LENGTH
        );
        const passwordMaxLength = validators.maxLength(
          passwordMaxLengthMessage,
          validators.PASSWORD_MAX_LENGTH
        );
        const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
        const passwordValidators = validators.composeValidators(
          passwordRequired,
          passwordMinLength,
          passwordMaxLength
        );

        // firstName
        const firstNameLabel = intl.formatMessage({
          id: 'SignupForm.firstNameLabel',
        });
        const firstNamePlaceholder = intl.formatMessage({
          id: 'SignupForm.firstNamePlaceholder',
        });
        const firstNameRequiredMessage = intl.formatMessage({
          id: 'SignupForm.firstNameRequired',
        });
        const firstNameRequired = validators.required(firstNameRequiredMessage);

        // lastName
        const lastNameLabel = intl.formatMessage({
          id: 'SignupForm.lastNameLabel',
        });
        const lastNamePlaceholder = intl.formatMessage({
          id: 'SignupForm.lastNamePlaceholder',
        });
        const lastNameRequiredMessage = intl.formatMessage({
          id: 'SignupForm.lastNameRequired',
        });
        const lastNameRequired = validators.required(lastNameRequiredMessage);

        const countryRequiredMessage = 'Please select a country';
        const stateRequiredMessage = 'Please select a state';
        const cityRequiredMessage = 'Please select a city';
        const businessNameRequiredMessage = 'You need to add a business name';

        const classes = classNames(rootClassName || css.root, className);
        const submitInProgress = inProgress;
        const submitDisabled = invalid || submitInProgress;

        const handleTermsKeyUp = e => {
          // Allow click action with keyboard like with normal links
          if (e.keyCode === KEY_CODE_ENTER) {
            onOpenTermsOfService();
          }
        };
        const termsLink = (
          <span
            className={css.termsLink}
            onClick={onOpenTermsOfService}
            role="button"
            tabIndex="0"
            onKeyUp={handleTermsKeyUp}
          >
            <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
          </span>
        );

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <div>
              <FieldTextInput
                type="email"
                id={formId ? `${formId}.email` : 'email'}
                name="email"
                autoComplete="email"
                label={emailLabel}
                placeholder={emailPlaceholder}
                validate={validators.composeValidators(emailRequired, emailValid)}
              />
              <div className={css.name}>
                <FieldTextInput
                  className={css.firstNameRoot}
                  type="text"
                  id={formId ? `${formId}.fname` : 'fname'}
                  name="fname"
                  autoComplete="given-name"
                  label={firstNameLabel}
                  placeholder={firstNamePlaceholder}
                  validate={firstNameRequired}
                />
                <FieldTextInput
                  className={css.lastNameRoot}
                  type="text"
                  id={formId ? `${formId}.lname` : 'lname'}
                  name="lname"
                  autoComplete="family-name"
                  label={lastNameLabel}
                  placeholder={lastNamePlaceholder}
                  validate={lastNameRequired}
                />
              </div>
              <FieldSelectCountry
                className={css.fieldSelect}
                label="Country"
                validate={validators.required(countryRequiredMessage)}
                name="country"
                id="country"
                changeCountry={handleOnChangeCountries}
              >
                <option disabled value="">
                  Choose your country...
                </option>
                {countries.map(country => (
                  <option value={country.name} data-key={country.id} key={country.id}>
                    {country.name}
                  </option>
                ))}
              </FieldSelectCountry>
              <FieldSelectState
                className={css.fieldSelect}
                label="State"
                validate={validators.required(stateRequiredMessage)}
                name="state"
                id="state"
                changeState={handleOnChangeStates}
              >
                <option disabled value="">
                  Choose your state...
                </option>
                {states.map(state => (
                  <option value={state.name} data-key={state.id} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </FieldSelectState>
              <FieldSelect
                className={css.fieldSelect}
                label="City"
                validate={validators.required(cityRequiredMessage)}
                name="city"
                id="city"
              >
                <option disabled value="">
                  Choose your city...
                </option>
                {cities.map(city => (
                  <option value={city.name} data-key={city.id} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </FieldSelect>
              <FieldTextInput
                className={css.fieldSelect}
                type="text"
                id={formId ? `${formId}.address` : 'address'}
                name="address"
                label="Address"
                placeholder="123 Street"
              />
              <div className={css.radioButtonRow}>
                {props.accountTypeName === 'personal' ? (
                  <div className={css.colButtonsSelected}>
                    <button value="personal" onClick={handleOnClickAccountType}>
                      Personal
                    </button>
                  </div>
                ) : (
                  <div className={css.colButtons}>
                    <button value="personal" onClick={handleOnClickAccountType}>
                      Personal
                    </button>
                  </div>
                )}
                {props.accountTypeName === 'business' ? (
                  <div className={css.colButtonsSelected}>
                    <button value="business" onClick={handleOnClickAccountType}>
                      Business
                    </button>
                  </div>
                ) : (
                  <div className={css.colButtons}>
                    <button value="business" onClick={handleOnClickAccountType}>
                      Business
                    </button>
                  </div>
                )}
              </div>
              {props.accountTypeName === 'business' ? (
                <FieldTextInput
                  className={css.fieldSelect}
                  type="text"
                  id={formId ? `${formId}.businessName` : 'businessName'}
                  name="businessName"
                  label="Business Name"
                  placeholder="Enter your business name..."
                  validate={validators.required(businessNameRequiredMessage)}
                />
              ) : null}

              <FieldTextInput
                className={css.password}
                type="password"
                id={formId ? `${formId}.password` : 'password'}
                name="password"
                autoComplete="new-password"
                label={passwordLabel}
                placeholder={passwordPlaceholder}
                validate={passwordValidators}
              />
            </div>

            <div className={css.bottomWrapper}>
              <p className={css.bottomWrapperText}>
                <span className={css.termsText}>
                  <FormattedMessage
                    id="SignupForm.termsAndConditionsAcceptText"
                    values={{ termsLink }}
                  />
                </span>
              </p>
              <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
                <FormattedMessage id="SignupForm.signUp" />
              </PrimaryButton>
            </div>
          </Form>
        );
      }}
    />
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

SignupFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SignupForm = compose(injectIntl)(SignupFormComponent);
SignupForm.displayName = 'SignupForm';

export default SignupForm;
