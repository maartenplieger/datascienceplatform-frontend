// This is where action creators are put
import { SET_UPLOADED_FILE } from '../constants/uploadLabels';

const setUploadedFile = (fileName) => {
  return {
    type: SET_UPLOADED_FILE,
    payload: {
      fileName: fileName
    }
  };
};

const actions = {
  setUploadedFile
};

export default actions;
