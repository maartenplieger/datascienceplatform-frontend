import { SET_UPLOADED_FILE, SET_UPLOADED_FILE_STRUCTURE_DESCRIPTION, CLEAR_UPLOAD_STATE } from '../constants/uploadLabels';

const setUploadedFile = (state, payload) => {
  return Object.assign({}, state, { fileName: payload.fileName });
};

const setUploadedFileStructureDescription = (state) => {
  return Object.assign({}, state, { uploadedFileStructureDescription: true });
};

const clearUploadState = (state) => {
  return Object.assign({}, state, { fileName: '', uploadedFileStructureDescription: false });
};

const ACTION_HANDLERS = {
  [SET_UPLOADED_FILE] : (state, action) => setUploadedFile(state, action.payload),
  [SET_UPLOADED_FILE_STRUCTURE_DESCRIPTION] : (state, action) => setUploadedFileStructureDescription(state),
  [CLEAR_UPLOAD_STATE] : (state, action) => clearUploadState(state)
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
