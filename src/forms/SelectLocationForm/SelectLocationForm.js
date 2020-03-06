import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { compose } from 'redux';
import { Form, Button, LocationAutocompleteInputField, FeatureButtons } from '../../components';
import * as validators from '../../util/validators';

import css from './SelectLocationForm.css';

const identity = v => v;

const SelectLocationFormComponent = props => {
  const [postCategoriesList, setPostCategoriesList] = useState([]);
  useEffect(() => {
    if (sessionStorage.getItem('features')) {
      setPostCategoriesList(sessionStorage.getItem('features').split(','));
    }
  }, []);
  const handleOnClick = e => {
    e.preventDefault();
    const exist = postCategoriesList && postCategoriesList.includes(e.target.value);
    if (!exist) {
      setPostCategoriesList([...postCategoriesList, e.target.value]);
    } else {
      setPostCategoriesList(
        postCategoriesList.filter(postCategories => postCategories !== e.target.value)
      );
    }
  };
  const handleNext = values => {
    props.updateFeatures(postCategoriesList);
    props.updateLocation(values.location.selectedPlace.origin);
    props.setStepState('code');
    props.onSubmit('code');
  };

  const addressNotRecognizedMessage = `We didn't recognize this location. Please try another location.`;
  const addressRequiredMessage = 'The location is required';

  return (
    <FinalForm
      {...props}
      onSubmit={handleNext}
      render={fieldRenderProps => {
        const {
          className,
          rootClassName,
          handleSubmit,
          pristine,
          invalid,
          ready,
          disabled,
          updated,
        } = fieldRenderProps;

        const classes = classNames(rootClassName || css.root, className);

        const submitReady = (updated && pristine) || ready;
        const submitDisabled = invalid || disabled;
        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <div className={css.container}>
              <div className={css.locationContainer}>
                <p className={css.sectionTitle}>Where is your core audience</p>
                <p>
                  Enter your hometown, state, or country. This will give each post made from this
                  channel a specific location.
                </p>
                <LocationAutocompleteInputField
                  className={css.locationAddress}
                  inputClassName={css.locationAutocompleteInput}
                  iconClassName={css.locationAutocompleteInputIcon}
                  predictionsClassName={css.predictionsRoot}
                  validClassName={css.validLocation}
                  // autoFocus
                  name="location"
                  label="Location"
                  placeholder="Start typing..."
                  useDefaultPredictions={false}
                  format={identity}
                  validate={validators.composeValidators(
                    validators.autocompleteSearchRequired(addressRequiredMessage),
                    validators.autocompletePlaceSelectedProfile(addressNotRecognizedMessage)
                  )}
                />
              </div>
              <p className={css.sectionTitle}>What interests do you represent best?</p>
              <div className={css.socialContainer}>
                <FeatureButtons handleOnClick={handleOnClick} list={postCategoriesList} />
              </div>
            </div>
            <Button
              className={css.submitButton}
              type="submit"
              disabled={submitDisabled}
              ready={submitReady}
            >
              Save
            </Button>
          </Form>
        );
      }}
    />
  );
};

SelectLocationFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectLocationFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectLocationForm = compose(injectIntl)(SelectLocationFormComponent);

SelectLocationForm.displayName = 'SelectLocationForm';

export default SelectLocationForm;
