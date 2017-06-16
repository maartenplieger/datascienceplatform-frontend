import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import countReducer from '../reducers/countReducer';
import { combineForms } from 'react-redux-form';

const initialFileDescription = {
  projString: '',
  columnDate: ''
};

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    countState: countReducer,
    deep: combineForms({
      fileDescription: initialFileDescription
    })
  });
};
export default makeRootReducer;
