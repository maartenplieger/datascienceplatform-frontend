import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import wrangleReducer from '../reducers/wrangleReducer';
import userReducer from '../reducers/userReducer';
import basketReducer from '../reducers/basketReducer';
export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    wranglerState: wrangleReducer,
    userState: userReducer,
    basketState: basketReducer
  });
};
export default makeRootReducer;
