import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';
import { actions as uploadActions } from '../actions/uploadActions'

export default class UploadComponent extends React.Component {

  handleFileUpload(event) {

    event.preventDefault();

    const { backendHost, frontendHost, adagucServicesHost } = config;
    console.log(this.props);
    const { dispatch, actions } = this.props;

    var fileName = this.fileInput.files[0].name;

    var formData  = new FormData();
    formData.append("files", this.fileInput.files[0], fileName);

    console.log("Going to fetch!");

    fetch(adagucServicesHost + "/basket/upload?key=" + this.props.accessToken,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {
        console.log("Fetched!");
        console.log(result);
        dispatch(actions.setUploadedFile(fileName));
      })
  }


  render() {

    return (
      <div>
        <form onSubmit={(event)=>this.handleFileUpload(event)}>
          <input
            type="file"
            ref={(input) => { this.fileInput = input; }}/>
          <button className="area"
                  type="submit">Upload File
          </button>
        </form>
      </div>
    );
  }
}

