import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PreviewComponent extends Component {
  render () {
    return (
      <div>
        {this.props.file ? this.props.file : ''}
      </div>);
  }
}

PreviewComponent.propTypes = {
  file: PropTypes.string
};
