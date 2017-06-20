import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';
import FileDescriptionComponent from './FileDescriptionComponent'
import FileUploadComponent from './FileUploadComponent'

export default class UploadComponent extends React.Component {

  render() {

    return (
      <div>
        <FileUploadComponent />
        <FileDescriptionComponent />
      </div>
    );
  }
}
