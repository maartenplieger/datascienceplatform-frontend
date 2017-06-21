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

  render() {

    return (
      <div>
        <p>Please specify the CSV columns with location and time information and their formats:</p>
      <div>
      <Form model="fileDescription"
            onSubmit={() => this.handleSubmit()}>

        <h5 className="media-heading">Location information:</h5>

        <div className="form-group row">
          <label className="col-3 col-form-label">X column:</label>
          <Control
            className="form-control col-3"
            type="number"
            placeholder="X"
            model="fileDescription.columnX"
            required
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Y column:</label>
          <Control
            className="form-control col-3"
            type="number"
            placeholder="Y"
            model="fileDescription.columnY"
            required
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Projection:</label>
          <Control.select model="fileDescription.projString" className="form-control col-3">
            <option value=""></option>
            <option value="+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +no_defs">Rijksdriehoek</option>
            <option value="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs">WGS 84</option>
          </Control.select>

        </div>

        <h5>Time information:</h5>

        <div className="form-group row">
          <label className="col-3 col-form-label">Date column:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileDescription.columnDate"
            required
            min={0}
          />
          </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">
            Date format:
          </label>
          <Control.text
              className="form-control col-3"
              model="fileDescription.dateFormat"
              required
              placeholder="%d%b%y (03JAN06)">
          </Control.text>
          <small className="text-muted form-text col-4">(check <a href="https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior"> this</a> table for options)</small>
         </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Hour column:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileDescription.columnHour"
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Hour format:</label>
          <Control.select
            model="fileDescription.hourFormat"
            className="form-control col-3">
            <option value=""></option>
            <option value="hourInterval">Interval (1.00-01.59)</option>
            <option value="time">Time (13:45)</option>
            <option value="plainHour">Hour (13)</option>
          </Control.select>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Minute column:</label>
          <Control
            type="number"
            model="fileDescription.columnMinute"
            className="form-control col-3"
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">
            Timezone:
          </label>
          <Control.text
            model="fileDescription.timeZone"
            className="form-control col-3"
            required
            placeholder="CET">
          </Control.text>
        </div>

        <button type="submit" className="btn btn-secondary">
          Submit description
        </button>
      </Form>
        </div>
        </div>
    );
  }

}
