// This is where action creators are put
import { SET_UPLOADED_FILE, SET_UPLOADED_FILE_STRUCTURE_DESCRIPTION, CLEAR_UPLOAD_STATE } from '../constants/uploadLabels';

const setUploadedFile = (fileName) => {
  return {
    type: SET_UPLOADED_FILE,
    payload: {
      fileName: fileName
    }
  };
};

const setUploadedFileStructureDescription = () => {
  return {
    type: SET_UPLOADED_FILE_STRUCTURE_DESCRIPTION,
    payload: {
    }
  };
};

const clearUploadState = () => {
  return {
    type: CLEAR_UPLOAD_STATE
  };
};

const actions = {
  setUploadedFile,
  setUploadedFileStructureDescription,
  clearUploadState
};

export default actions;
