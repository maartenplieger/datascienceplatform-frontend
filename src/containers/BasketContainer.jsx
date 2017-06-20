import React, { Component } from 'react';
import BasketComponent from '../components/Basket/BasketComponent';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class BasketContainer extends Component {
  render () {
    const { accessToken, dispatch, actions } = this.props;
    return (
      <div>
        <BasketComponent accessToken={accessToken}
          dispatch={dispatch} actions={actions} />
        <hr />
        <Button>Upload</Button>
        <Button>Preview</Button>
        <Button>Wrangle</Button>
        <Button>Download</Button>
        <Button>Delete</Button>
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
