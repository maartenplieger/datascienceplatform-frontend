// This is where action creators are put
import { INCREMENT_COUNT } from '../constants/countLabels';

const startWrangler = () => {
  return {
    type: INCREMENT_COUNT
  };
};

const actions = {
  startWrangler
};

export default actions;
