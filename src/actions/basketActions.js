// This is where action creators are put
import { SET_BASKET_ITEMS } from '../constants/basketLabels';

const setBasketItems = (accessToken) => {
  return {
    type: SET_BASKET_ITEMS,
    payload: {
      accessToken: accessToken
    }
  };
};

const actions = {
  setBasketItems
};

export default actions;
