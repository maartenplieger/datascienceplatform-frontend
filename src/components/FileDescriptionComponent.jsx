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
      <Form model="fileDescription"
            onSubmit={() => this.handleSubmit()}>

        <h3>Please specify the CSV columns with location and time information and their formats:</h3>

        <h4>Location information:</h4>

        <div className="formField">
          <label>X column:</label>
          <Control
            type="number"
            placeholder="X"
            model="fileDescription.columnX"
            required
            min={0}
          />
        </div>

        <div className="formField">
          <label>Y column:</label>
          <Control
            type="number"
            placeholder="Y"
            model="fileDescription.columnY"
            required
            min={0}
          />
        </div>

        <div className="formField">
          <label>Projection:</label>
          <Control.select model="fileDescription.projString">
            <option value=""></option>
            <option value="+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +no_defs">Rijksdriehoek</option>
            <option value="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs">WGS 84</option>
          </Control.select>
        </div>

        <h4>Time information:</h4>

        <div className="formField">
          <label>Date column:</label>
          <Control
            type="number"
            model="fileDescription.columnDate"
            required
            min={0}
          />
          <label>
            Date format pattern
            (check <a href="https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior"> this</a> table for options):
          </label>
          <Control.text
              model="fileDescription.dateFormat"
              required
              placeholder="%d%b%y (03JAN06)">
          </Control.text>
        </div>

        <div className="formField">
          <label>Hour column:</label>
          <Control
            type="number"
            model="fileDescription.columnHour"
            min={0}
          />
          <label>Hour format:</label>
          <Control.select
            model="fileDescription.hourFormat">
            <option value=""></option>
            <option value="hourInterval">1.00-01.59 (interval)</option>
            <option value="time">13:45 (time)</option>
            <option value="plainHour">13 (hour)</option>
          </Control.select>
        </div>

        <div className="formField">
          <label>Minute column:</label>
          <Control
            type="number"
            model="fileDescription.columnMinute"
            min={0}
          />
        </div>

        <div className="formField">
          <label>
            Timezone:
          </label>
          <Control.text
            model="fileDescription.timeZone"
            required
            placeholder="CET">
          </Control.text>
        </div>

        <button type="submit">
          Submit description
        </button>
      </Form>
    );
  }

}
