import React, { Component } from 'react';
import BasketComponent from '../components/Basket/BasketComponent';
import PropTypes from 'prop-types';

class BasketContainer extends Component {
  render () {
    const { accessToken, dispatch, actions, basket, hasFetched, domain } = this.props;
    return (
      <div>
        <BasketComponent accessToken={accessToken}
          dispatch={dispatch} actions={actions} basket={basket} hasFetched={hasFetched}
          domain={domain} />
      </div>
    );
  }
}

BasketContainer.propTypes = {
  domain: PropTypes.string,
  accessToken: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  basket: PropTypes.object,
  hasFetched: PropTypes.bool
};

export default BasketContainer;
