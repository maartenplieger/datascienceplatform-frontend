import React, { Component } from 'react';
import BasketComponent from '../components/Basket/BasketComponent';
import PropTypes from 'prop-types';

class BasketContainer extends Component {
  render () {
    const { accessToken, dispatch, actions } = this.props;
    return (
      <div>
        <BasketComponent accessToken={accessToken}
          dispatch={dispatch} actions={actions} />
        <hr />
        <button>Upload</button>
        <button>Preview</button>
        <button>Wrangle</button>
        <button>Download</button>
        <button>Delete</button>
      </div>
    );
  }
}

BasketContainer.propTypes = {
  accessToken: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default BasketContainer;
