import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';

export default class UploadComponent extends React.Component {

  handleSubmit() {

    const { backendHost, frontendHost, adagucServicesHost } = config;

    // TODO: Filenaam op basis van de geuplode file maken!
    var formData  = new FormData();
    formData.append("files",new Blob([JSON.stringify( this.props.fileDescription)],{type:""}), "fileDesc.json");

    fetch(adagucServicesHost + "/basket/upload?key=" + this.props.accessToken,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {console.log(result.body);})

  }

  handleFileUpload(event) {

    var formData  = new FormData();
    formData.append("files", this.fileInput.files[0], this.fileInput.files[0].name);

    const { backendHost, frontendHost, adagucServicesHost } = config;

    fetch(adagucServicesHost + "/basket/upload?key=" + this.props.accessToken,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {console.log(result.body);})
  }

  handleFileChange(event) {

    console.log(event.target);
    console.log(event.target.files[0]);
  }


  render() {

    return (
      <div>
        <form onSubmit={(event)=>this.handleFileUpload(event)}>
          <input
            type="file" onChange={(event) => this.handleFileChange(event)}
            ref={(input) => { this.fileInput = input; }}/>
          <button className="submitButton"
                  type="submit">Upload File
          </button>
        </form>
      </div>
    );
  }

}
