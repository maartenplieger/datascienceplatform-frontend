import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS } from '../constants/basketLabels';

const setBasketItems = (state, payload) => {
  let result = null;
  fetch('https://bhw451.knmi.nl:8090/basket/list?key=' + payload.accessToken)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return null;
      }
    })
    .then((json) => {
      result = json;
    });
  return Object.assign({}, state, { basket: result, hasFetched: true });
};

const updateBasket = (state, payload) => {
  return Object.assign({}, state, { basket: payload, hasFetched: true });
};

const ACTION_HANDLERS = {
  [SET_BASKET_ITEMS] : (state, action) => setBasketItems(state, action.payload),
  [UPDATE_BASKET_ITEMS] : (state, action) => updateBasket(state, action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { basket: null, hasFetched: false };
export default function userReducer (state = initialState, action) {
  if (!action) {
    return state;
  }
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
