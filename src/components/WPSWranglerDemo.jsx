import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WPSWranglerDemo extends Component {
  render () {
    const { count, dispatch, actions } = this.props;
    return (
      <div>

        <button id='incrementButton' onClick={() => dispatch(actions.startWrangler())}>Wrangle!</button>{count}
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  count: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
