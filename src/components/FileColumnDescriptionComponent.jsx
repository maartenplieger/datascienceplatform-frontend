import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router'

class FileColumnDescriptionComponent extends React.Component {

  constructor () {
    super();
  }

  handleSubmit() {

    var completeFileDescription = JSON.stringify(Object.assign({}, this.props.fileColumnDescription, this.props.fileStructureDescription),this.props.replacer);
    var fileName = this.props.fileName.replace(/\.[^/.]+$/, "_descr.json");
    var router = this.props.router;

    var formData  = new FormData();
    formData.append("files",new Blob([completeFileDescription],{type:""}), fileName);

    fetch(config.adagucServicesHost + "/basket/upload?key=" + this.props.accessToken,
      {
        credentials:"include",
        method: "POST",
        body: formData
      })
      .then(function(result) {
        console.log(result.body);

        // TODO: Foutafhandeling

        // TODO: Scanner aanroepen???
      })

  }

  render() {

    return (
      <div>
      <div className="alert alert-info">
        Please specify the CSV columns with location and time information and their formats.
      </div>
      <div>
      <Form model="fileColumnDescription"
            onSubmit={() => this.handleSubmit()}>

        <h5 className="media-heading">Location information:</h5>

        <div className="form-group row">
          <label className="col-3 col-form-label required">X column:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileColumnDescription.columnX"
            required
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">Y column:</label>
          <Control
            className="form-control col-3 required"
            type="number"
            model="fileColumnDescription.columnY"
            required
            min={0}
          />
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">Projection:</label>
          <Control.select model="fileColumnDescription.projString" className="form-control col-3 required" required>
            <option value=""></option>
            <option value="+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +no_defs">Rijksdriehoek</option>
            <option value="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs">WGS 84</option>
          </Control.select>

        </div>

        <div className="divider-2" />

        <h5>Time information:</h5>

        <div className="form-group row">
          <label className="col-3 col-form-label required">
            Timezone:
          </label>
          <Control.select
            model="fileColumnDescription.timeZone"
            className="form-control col-3"
            required>
            <option value=""></option>
            <option value="CET">CET</option>
            <option value="UTC">UTC</option>
          </Control.select>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">Date column:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileColumnDescription.columnDate"
            required
            min={0}
          />
          </div>

        <div className="form-group row">
          <label className="col-3 col-form-label required">
            Date format:
          </label>
          <Control.select
              className="form-control col-3"
              model="fileColumnDescription.dateFormat"
              required>
            <option value=""></option>
            <option value="%d%b%y">03JAN06</option>
            <option value="%Y-%m-%dT%H:%M:%S">2007-03-04T21:08:12</option>
            <option value="%d-%m-%Y">03-01-2016</option>
            <option value="%d-%m-%Y %H:%M:%S">03-01-2016 21:03:00</option>
            <option value="%Y/%m/%d">2016/01/03</option>
          </Control.select>
          <small className="text-muted form-text col-6">(it is also possible to provide time information in this column)</small>
         </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Time/hour column:</label>
          <Control
            className="form-control col-3"
            type="number"
            model="fileColumnDescription.columnHour"
            min={0}
          />
          <small className="text-muted form-text col-6">(optional if the time is provided in a separate column)</small>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Time/hour format:</label>
          <Control.select
            model="fileColumnDescription.hourFormat"
            className="form-control col-3">
            <option value=""></option>
            <option value="timeMinutes">Time (13:45)</option>
            <option value="timeMinutesSeconds">Time (13:45:00)</option>
            <option value="plainHour">Hour (13)</option>
            <option value="hourInterval">Interval (1.00-01.59)</option>
          </Control.select>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Minute column:</label>
          <Control
            type="number"
            model="fileColumnDescription.columnMinute"
            className="form-control col-3"
            min={0}
          />
          <small className="text-muted form-text col-6">(optional if minutes are provided in a separate column)</small>
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

export default withRouter(FileColumnDescriptionComponent)
