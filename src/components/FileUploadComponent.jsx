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

  handleFileUpload({file}) {

    console.log(file);

    this.props.actions.uploadRequest({
      file,
      name: 'Awesome Cat Pic'
    })
  }

  render() {

    return (

      <input type="file" onChange={this.handleFileUpload} />
    );
  }

}
