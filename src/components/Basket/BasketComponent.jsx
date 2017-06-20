import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasketTreeComponent from './BasketTreeComponent';

export default class BasketComponent extends Component {
  constructor () {
    super();
    this.getBasketItems = this.getBasketItems.bind(this);
    this.state = {
      basket: null,
      hasFetched: false
    };
  }

  getBasketItems () {
    const { accessToken } = this.props;
    if (!accessToken || this.state.hasFetched) return;

    let result = null;

    fetch('https://bhw451.knmi.nl:8090/basket/list?key=' + accessToken)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error(result.statusText);
      }
    })
    .then((json) => {
      result = json;
      this.setState({ basket: result, hasFetched: true });
    });
  }

  componentDidUpdate () {
    this.getBasketItems();
  }

  render () {
    return (
      <div>
        {
        this.state.basket
        ? <BasketTreeComponent data={this.state.basket} />
        : <div />
        }
      </div>
    );
  }
}

BasketComponent.propTypes = {
  accessToken: PropTypes.string
  // dispatch: PropTypes.func.isRequired,
  // actions: PropTypes.object.isRequired
};
