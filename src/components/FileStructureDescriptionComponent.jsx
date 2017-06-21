import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';
import { initialFileStructureDescription } from '../constants/initialFormStates'

export default class FileColumnDescriptionComponent extends React.Component {

  constructor () {
    super();
  }

  handleSubmit() {

    const { backendHost, frontendHost, adagucServicesHost } = config;
    const { dispatch, actions } = this.props;

    var fileName = this.props.fileName.replace(/\.[^/.]+$/, "_descr.json");

    var formData  = new FormData();
    formData.append("files",new Blob([JSON.stringify( this.props.fileStructureDescription,this.props.replacer)],{type:""}), fileName);

    fetch(adagucServicesHost + "/basket/upload?key=" + this.props.accessToken,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {
        console.log(result);
        dispatch(actions.setUploadedFileStructureDescription());
      })

  }

  render() {

    console.log(this.props.fileStructureDescription.firstDataRow);

    return (
      <div>
      <div className="alert alert-info">
        Please specify the structure of the CSV file.
      </div>
      <div>
      <Form model="fileStructureDescription"
            onSubmit={() => this.handleSubmit()}>

        <h5 className="media-heading">File structure information:</h5>

        <div className="form-group row">
          <label className="col-3 col-form-label required">Column separator:</label>
          <Control.select
            className="form-control col-3"
            model="fileStructureDescription.columnSeparator"
            required
          >
            <option value=""></option>
            <option value=",">comma (,)</option>
            <option value=";">semicolon (;)</option>
            <option value="tab">tab (\t)</option>
          </Control.select>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">Row separator:</label>
          <Control.select
            className="form-control col-3"
            model="fileStructureDescription.rowSeparator"
            required
          >
            <option value=""></option>
            <option value="CR">Carriage return (\r)</option>
            <option value="LF">Line feed (\n)</option>
            <option value="CRLF">Carriage return line feed (\r\n)</option>
          </Control.select>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">First data row:</label>
          <Control
            className="form-control col-3 required"
            type="number"
            model="fileStructureDescription.firstDataRow"
            required
            min={0}
            value={this.props.fileStructureDescription.firstDataRow}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Column name row:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileStructureDescription.rowWithFieldNames"
            min={0}
          />
          <small className="text-muted form-text col-6">(optional if you want to see the column names in the preview)</small>
        </div>

        <div className="divider-2" />

        <button type="submit" className="btn btn-primary">
          Submit description
        </button>
      </Form>
        </div>
        </div>
    );
  }

}
