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
import axios from 'axios';

import AddAccountSuccess from './AddAccountSuccess.js';
import AddAccountError from './AddAccountError.js';

export class AddAccountPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 'channel' };
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
    this.setState({ step: newStep });
  };

  updateStorage = (storageName, data) => {
    sessionStorage.setItem(storageName, data);
  };
  clearAll = _ => {
    sessionStorage.clear();
    sessionStorage.setItem('step', 'channel');
    this.setState({ step: sessionStorage.getItem('step') });
  };
  handleSubmit = _ => {
    const featuresArray = sessionStorage.getItem('features').split(',');
    const userData = {
      service: sessionStorage.getItem('platform'),
      username: sessionStorage.getItem('username'),
    };
    axios
      .post('/api/getInfo', userData)
      .then(res => {
        const photo = res.data.photo;
        const count = res.data.count;
        let data = {
          photo,
          count,
          platform: sessionStorage.getItem('platform'),
          features: featuresArray,
          username: sessionStorage.getItem('username'),
          location: JSON.parse(sessionStorage.getItem('location')),
        };
        // Update profileImage only if file system has been accessed
        const updatedValues = data;
        this.props.onUpdateProfile(updatedValues);
      })
      .catch(err => {
        console.log(err);
        this.updateStep('error');
      });
  };
  render() {
    const { currentUser, scrollingDisabled, intl, updateInProgress, success } = this.props;

    const user = ensureCurrentUserProfile(currentUser);
    const form = tab => {
      if (user.id) {
        switch (tab) {
          case 'channel': {
            return (
              <SelectChannelForm updateStorage={this.updateStorage} onSubmit={this.updateStep} />
            );
          }
          case 'location': {
            return (
              <SelectLocationForm updateStorage={this.updateStorage} onSubmit={this.updateStep} />
            );
          }
          case 'code': {
            return (
              <VerificationCodeForm
                onSubmit={this.handleSubmit}
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
  success: bool,

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
