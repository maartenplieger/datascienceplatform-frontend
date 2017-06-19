import { SET_BASKET_ITEMS } from '../constants/basketLabels';

const setBasketItems = (state, payload) => {
  return Object.assign({}, state, { basket: payload });
};

const ACTION_HANDLERS = {
  [SET_BASKET_ITEMS] : (state, action) => setBasketItems(state, action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { basket: null };
export default function userReducer (state = initialState, action) {
  if (!action) {
    return state;
  }
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
