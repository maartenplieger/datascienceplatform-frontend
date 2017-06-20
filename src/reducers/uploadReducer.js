import { SET_UPLOADED_FILE } from '../constants/uploadLabels';

const setUploadedFile = (state, payload) => {
  console.log(payload);
  return Object.assign({}, state, { fileName: payload.fileName });
};

const ACTION_HANDLERS = {
  [SET_UPLOADED_FILE] : (state, action) => setUploadedFile(state, action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { fileName: null };
export default function uploadReducer (state = initialState, action) {
  if (!action) {
    return state;
  }
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
