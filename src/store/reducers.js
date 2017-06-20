import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import wrangleReducer from '../reducers/wrangleReducer';
import userReducer from '../reducers/userReducer';
import { combineForms } from 'react-redux-form';
import { initialFileDescription } from '../constants/initialFormStates';

export const makeRootReducer = () => {

  return combineReducers({
    location: locationReducer,
    countState: wrangleReducer,
    userState: userReducer,
    fileDescriptionState: combineForms({
      fileDescription: ""
    })
  });
};
export default makeRootReducer;
