import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CSV from 'csv-string';

export default class PreviewComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null
    };
    this.getData = this.getData.bind(this);
  }

  getData () {
    if (!this.props.file) return;
    console.log('getData');
    let _this = this;

    axios
    .get(this.props.file)
    .then(function (result) {
      let csvData = CSV.parse(result.data);
      let griddedCsvData = [];
      for (let i of Array(10).keys()) {
        griddedCsvData.push(csvData[i]);
      }
      console.log(griddedCsvData);
      _this.setState({ data: griddedCsvData });
    });
  }

  componentWillReceiveProps () {
    this.getData();
  }

  render () {
    let bla = this.state.data;
    return (
      <div>
        {bla ? bla.map(function (object, i) {
          return bla[i];
        }) : ''}
      </div>);
  }
}

PreviewComponent.propTypes = {
  file: PropTypes.string
};
