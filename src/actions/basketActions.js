// This is where action creators are put
import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS } from '../constants/basketLabels';

const setBasketItems = (accessToken) => {
  return {
    type: SET_BASKET_ITEMS,
    payload: {
      accessToken: accessToken
    }
  };
};

const updateBasketItems = (json) => {
  return {
    type: UPDATE_BASKET_ITEMS,
    payload: {
      jsonResponse: json
    }
  };
};

const actions = {
  setBasketItems,
  updateBasketItems
};

export default actions;
