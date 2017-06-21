import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasketTreeComponent from './BasketTreeComponent';
import { config } from '../../static/config.js';

export default class BasketComponent extends Component {
  /**
   * Fetching the basket items.
   **/
  fetchListItems () {
    const { accessToken, dispatch, actions, basket } = this.props;
    if (!accessToken) return;
    /* If there is already a basket, don't fetch. */
    if (basket) return;
    fetch(config.adagucServicesHost + '/basket/list?key=' + accessToken)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return null;
      }
    })
    .then((json) => {
      dispatch(actions.updateBasketItems(json));
    });
  }

  componentWillUpdate () {
    this.fetchListItems();
  }

  componentDidMount () {
    this.fetchListItems();
  }

  render () {
    const { basket, dispatch, actions, accessToken } = this.props;
    if (!basket) return (<div />);
    return (
      <div>
        {
        basket
        ? <BasketTreeComponent data={basket.jsonResponse} dispatch={dispatch}
          actions={actions} accessToken={accessToken} />
        : <div />
        }
      </div>
    );
  }
}

BasketComponent.propTypes = {
  accessToken: PropTypes.string,
  basket: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
