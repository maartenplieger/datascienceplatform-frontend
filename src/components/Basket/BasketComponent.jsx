import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasketTreeComponent from './BasketTreeComponent';

export default class BasketComponent extends Component {
  componentWillUpdate () {
    const { accessToken, dispatch, actions, basket } = this.props;
    if (!accessToken) return;
    if (basket) return;
    fetch('https://bhw451.knmi.nl:8090/basket/list?key=' + accessToken)
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

  render () {
    const { basket } = this.props;
    if (!basket) return (<div />);
    return (
      <div>
        {
        basket
        ? <BasketTreeComponent data={basket.jsonResponse} />
        : <div />
        }
      </div>
    );
  }
}

BasketComponent.propTypes = {
  accessToken: PropTypes.string,
  basket: PropTypes.object,
  hasFetched: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
