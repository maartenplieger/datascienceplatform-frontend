import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import wrangleReducer from '../reducers/wrangleReducer';
import userReducer from '../reducers/userReducer';
export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    wranglerState: wrangleReducer,
    userState: userReducer
  });
};
export default makeRootReducer;
