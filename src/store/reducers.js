import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import WPSReducer from '../reducers/WPSReducer';
import userReducer from '../reducers/userReducer';
import uploadReducer from '../reducers/uploadReducer';
import jobListReducer from '../reducers/jobListReducer';
import { combineForms } from 'react-redux-form';

import basketReducer from '../reducers/basketReducer';
export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    WPSState: WPSReducer,
    userState: userReducer,
    basketState: basketReducer,
    uploadState: uploadReducer,
    jobListState: jobListReducer,
    fileDescriptionState: combineForms({
      fileDescription: ''
    })
  });
};
export default makeRootReducer;
