import { SET_ACCESS_TOKEN, SET_CLIENT_ID, SET_EMAIL_ADDRESS } from '../constants/userLabels';

const setAccessToken = (state, payload) => {
  return Object.assign({}, state, { accessToken: payload.accessToken });
};

const setClientId = (state, payload) => {
  return Object.assign({}, state, { clientId: payload.clientId });
};

const setEmailAddress = (state, payload) => {
  return Object.assign({}, state, { emailAddress: payload.emailAddress });
};

const ACTION_HANDLERS = {
  [SET_ACCESS_TOKEN] : (state, action) => setAccessToken(state, action.payload),
  [SET_CLIENT_ID]    : (state, action) => setClientId(state, action.payload),
  [SET_EMAIL_ADDRESS]    : (state, action) => setEmailAddress(state, action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { accessToken: null, clientId: null, emailAddress: null };
export default function userReducer (state = initialState, action) {
  if (!action) {
    return state;
  }
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
