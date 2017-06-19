
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doWPSExecuteCall } from '../utils/WPSRunner.js';
import { Button } from 'reactstrap';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <h1>Welcome</h1>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {

};
