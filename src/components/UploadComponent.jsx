import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';

export default class UploadComponent extends React.Component {

  handleSubmit() {

    var data = new FormData();
    data.append( "fileDescription", JSON.stringify( this.props.fileDescription ) );

    const { backendHost, frontendHost } = config;

    var formData  = new FormData();
    formData.append("files",JSON.stringify( this.props.fileDescription));

    fetch("https://localhost:8090/basket/upload?key=" ,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {console.log(result.body);})

  }

  render() {

    return (
      <Form model="fileDescription"
            onSubmit={() => this.handleSubmit()}>
        <div className="formField">
          <label>Proj string:</label>
          <Control.select model="fileDescription.projString">
            <option value=""></option>
            <option value="test1">Test 1</option>
            <option value="test2">Test 2</option>
            <option value="test3">Test 3</option>
          </Control.select>
        </div>

        <div className="formField">
          <label>Column date:</label>
          <Control.text model="fileDescription.columnDate"/>
        </div>

        <button type="submit">
          Submit description
        </button>
      </Form>
    );
  }

}
