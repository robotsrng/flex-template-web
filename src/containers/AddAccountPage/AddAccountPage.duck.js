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
    return axios
      .post('/api/verify', data)
      .then(res => {
        if (res.data.verified === true) {
          // dispatch(updateProfileSuccess(res));
          sdk.currentUser
            .show()
            .then(resp => {
              console.log(resp);
              const offeringList = resp.data.data.attributes.profile.publicData.offering;
              console.log(offeringList);
              console.log(actionPayload);
              offeringList.push(actionPayload);
              const totalAudience = resp.data.data.attributes.profile.publicData.audience
                ? resp.data.data.attributes.profile.publicData.audience + actionPayload.count
                : actionPayload.count;
              const userData = { publicData: { offering: offeringList, audience: totalAudience } };
              sdk.currentUser
                .updateProfile(userData)
                .then(response => {
                  console.log(response);
                  dispatch(updateProfileSuccess(response));
                })
                .catch(e => {
                  console.log(e);
                  axios
                    .post('/api/delete-verification', data)
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => console.log(err));
                  dispatch(updateProfileError(null));
                });
            })
            .catch(err => {
              console.log(err);
              dispatch(updateProfileError(null));
            });
        } else dispatch(updateProfileError(null));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProfileError(null));
      });
  };
};
