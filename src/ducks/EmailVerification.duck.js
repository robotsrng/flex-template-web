import { storableError } from '../util/errors';
import { fetchCurrentUser } from './user.duck';

// ================ Action types ================ //

export const VERIFICATION_REQUEST = 'app/EmailVerification/VERIFICATION_REQUEST';
export const VERIFICATION_SUCCESS = 'app/EmailVerification/VERIFICATION_SUCCESS';
export const VERIFICATION_ERROR = 'app/EmailVerification/VERIFICATION_ERROR';

// ================ Reducer ================ //

const initialState = {
  isVerified: false,

  // verification
  verificationError: null,
  verificationInProgress: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case VERIFICATION_REQUEST:
      return {
        ...state,
        verificationInProgress: true,
        verificationError: null,
      };
    case VERIFICATION_SUCCESS:
      return { ...state, verificationInProgress: false, isVerified: true };
    case VERIFICATION_ERROR:
      return { ...state, verificationInProgress: false, verificationError: payload };
    default:
      return state;
  }
}

// ================ Selectors ================ //

export const verificationInProgress = state => {
  return state.EmailVerification.verificationInProgress;
};

// ================ Action creators ================ //

export const verificationRequest = () => ({ type: VERIFICATION_REQUEST });
export const verificationSuccess = () => ({ type: VERIFICATION_SUCCESS });
export const verificationError = error => ({
  type: VERIFICATION_ERROR,
  payload: error,
  error: true,
});

// ================ Thunks ================ //
export const createUserListing = user => (dispatch, getState, sdk) => {
  sdk.ownListings
    .create(user)
    .then(r =>
      sdk.currentUser
        .updateProfile({ publicData: { userCard: r.data.data.id.uuid } })
        .then(response => console.log(response))
    )
    .catch(err => console.log(err));
};

export const verify = verificationToken => (dispatch, getState, sdk) => {
  if (verificationInProgress(getState())) {
    return Promise.reject(new Error('Email verification already in progress'));
  }
  dispatch(verificationRequest());

  // Note that the thunk does not reject when the verification fails, it
  // just dispatches the login error action.
  return sdk.currentUser
    .verifyEmail({ verificationToken })
    .then(() => {
      sdk.currentUser.show().then(res => {
        let description;
        if (res.data.data.attributes.profile.publicData.accountType === 'personal') {
          const name = res.data.data.attributes.profile.firstName;
          const lastName = res.data.data.attributes.profile.lastName;
          description = name.concat(' ', lastName);
        } else description = res.data.data.attributes.profile.firstName;
        const user = {
          title: res.data.data.attributes.profile.publicData.username,
          description: description.toString(),
          publicData: {
            uuid: res.data.data.id.uuid,
            listingType: res.data.data.attributes.profile.publicData.accountType,
          },
        };
        dispatch(createUserListing(user));
      });
    })
    .then(() => dispatch(verificationSuccess()))
    .then(() => dispatch(fetchCurrentUser()))
    .catch(e => dispatch(verificationError(storableError(e))));
};
