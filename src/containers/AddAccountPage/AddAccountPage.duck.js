import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';

import axios from 'axios';

// ================ Action types ================ //

export const CLEAR_UPDATED_FORM = 'app/ProfileSettingsPage/CLEAR_UPDATED_FORM';

export const UPDATE_PROFILE_REQUEST = 'app/ProfileSettingsPage/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfileSettingsPage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfileSettingsPage/UPDATE_PROFILE_ERROR';

// ================ Reducer ================ //

const initialState = {
  updateInProgress: false,
  updateProfileError: null,
  success: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateInProgress: false,
        success: true,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateInProgress: false,
        updateProfileError: payload,
        success: false,
      };

    case CLEAR_UPDATED_FORM:
      return { ...state, updateProfileError: null };

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const clearUpdatedForm = () => ({
  type: CLEAR_UPDATED_FORM,
});

// SDK method: sdk.currentUser.updateProfile
export const updateProfileRequest = params => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { params },
});
export const updateProfileSuccess = result => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: result.data,
});
export const updateProfileError = error => ({
  type: UPDATE_PROFILE_ERROR,
  payload: error,
  error: true,
});

// ================ Thunk ================ //

// Images return imageId which we need to map with previously generated temporary id

export const updateProfile = actionPayload => {
  return (dispatch, getState, sdk) => {
    dispatch(updateProfileRequest());
    const data = { service: actionPayload.platform, username: actionPayload.username };
    console.log(actionPayload);
    return axios
      .post('/api/verify', data)
      .then(res => {
        if (res.data.verified === true) {
          dispatch(updateProfileSuccess(res));
          const userData = {};
          // sdk.currentUser
          //   .updateProfile(actionPayload)
          //   .then(response => {})
          //   .catch(e => dispatch(updateProfileError(storableError(e))));

          // const entities = denormalisedResponseEntities(res);
          // if (entities.length !== 1) {
          //   throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
          // }
          // const currentUser = entities[0];

          // // Update current user in state.user.currentUser through user.duck.js
          // dispatch(currentUserShowSuccess(currentUser));
        } else dispatch(updateProfileError(storableError(res)));
      })
      .catch(err => {
        console.log(err);
        dispatch(updateProfileError(storableError(err)));
      });
  };
};
