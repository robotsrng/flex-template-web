import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUserProfile } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';
import { SelectChannelForm, SelectLocationForm, VerificationCodeForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { updateProfile } from './AddAccountPage.duck';
import css from './AddAccountPage.css';

import AddAccountSuccess from './AddAccountSuccess.js';
import AddAccountError from './AddAccountError.js';

export class AddAccountPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 'channel' };
    this.updateStep = this.updateStep.bind(this);
    this.updatePlatform = this.updatePlatform.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateFeatures = this.updateFeatures.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
    if (this.props.location.tab) {
      sessionStorage.clear();
      sessionStorage.setItem('step', this.props.location.tab);
    } else {
      if (!sessionStorage.getItem('step')) {
        sessionStorage.setItem('step', 'channel');
      }
    }
    this.setState({ step: sessionStorage.getItem('step') });
  }
  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      if (this.props.success === true) {
        sessionStorage.setItem('step', 'success');
        this.setState({ step: 'success' });
      } else if (this.props.success === false) {
        sessionStorage.setItem('step', 'error');
        this.setState({ step: 'error' });
      }
    }
  }
  updateStep = newStep => {
    sessionStorage.setItem('step', newStep);
  };

  updatePlatform = newPlatform => {
    sessionStorage.setItem('platform', newPlatform);
  };
  updateUsername = newUsername => {
    sessionStorage.setItem('username', newUsername);
  };
  updateLocation = newLocation => {
    sessionStorage.setItem('location', JSON.stringify(newLocation));
  };
  updateFeatures = newFeatures => {
    sessionStorage.setItem('features', newFeatures.toString());
  };
  clearAll = _ => {
    sessionStorage.clear();
    sessionStorage.setItem('step', 'channel');
    this.setState({ step: sessionStorage.getItem('step') });
  };
  render() {
    const {
      currentUser,
      onUpdateProfile,
      scrollingDisabled,
      intl,
      updateInProgress,
      success,
    } = this.props;

    const handleSubmit = _ => {
      // Ensure that the optional bio is a string
      const featuresArray = sessionStorage.getItem('features').split(',');
      let data = {
        platform: sessionStorage.getItem('platform'),
        features: featuresArray,
        username: sessionStorage.getItem('username'),
        location: JSON.parse(sessionStorage.getItem('location')),
      };
      // Update profileImage only if file system has been accessed
      const updatedValues = data;
      onUpdateProfile(updatedValues);
    };
    const handleStepState = step => {
      this.setState({ step: step });
    };
    const user = ensureCurrentUserProfile(currentUser);
    const form = tab => {
      if (user.id) {
        switch (tab) {
          case 'channel': {
            return (
              <SelectChannelForm
                className={css.form}
                updatePlatform={this.updatePlatform}
                updateUsername={this.updateUsername}
                setStepState={handleStepState}
                onSubmit={this.updateStep}
              />
            );
          }
          case 'location': {
            return (
              <SelectLocationForm
                className={css.form}
                updateLocation={this.updateLocation}
                updateFeatures={this.updateFeatures}
                setStepState={handleStepState}
                onSubmit={this.updateStep}
              />
            );
          }
          case 'code': {
            return (
              <VerificationCodeForm
                setStepState={handleStepState}
                onSubmit={handleSubmit}
                updateStep={this.updateStep}
                updateInProgress={updateInProgress}
                success={success}
              />
            );
          }
          case 'success': {
            return <AddAccountSuccess />;
          }
          case 'error': {
            return <AddAccountError clearAll={this.clearAll} />;
          }
          default:
            return null;
        }
      } else return null;
    };

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <TopbarContainer currentPage="AddAccountPage" />
        <div className={css.content}>{form(this.state.step)}</div>
      </Page>
    );
  }
}

AddAccountPageComponent.defaultProps = {
  currentUser: null,
  updateProfileError: null,
  success: null,
};

const { bool, func } = PropTypes;

AddAccountPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  success: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const { updateInProgress, updateProfileError, success } = state.AddAccountPage;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    success,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const AddAccountPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(AddAccountPageComponent);

export default AddAccountPage;
