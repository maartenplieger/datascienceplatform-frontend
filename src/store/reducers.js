import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import countReducer from '../reducers/countReducer';
import userReducer from '../reducers/userReducer';
export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    countState: countReducer,
    userState: userReducer
  });
};
export default makeRootReducer;
