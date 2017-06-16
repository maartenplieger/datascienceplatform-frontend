
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doWPSExecuteCall } from '../utils/WPSRunner.js';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
      statusLocation: 'no process running',
      isRunning: false,
      percentageComplete: 0,
      message: '',
      result:'',
      isComplete:false
    };
    this.wrangleClicked = this.wrangleClicked.bind(this);
  }

  wrangleClicked () {
    const { accessToken } = this.props;
    this.setState({
      statusLocation: 'starting',
      isRunning: true,
      isComplete: false
    });

    let wps = 'https://bhw512.knmi.nl:8090/wps?service=wps&request=Execute&identifier=wrangleProcess&' +
    'version=1.0.0&DataInputs=inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101&storeExecuteResponse=true&status=true&';

    let statusUpdateCallback = (message, percentageComplete) => {
      this.setState({
        percentageComplete: percentageComplete,
        message:message
      });
    };

    let executeCompletCallback = (json, processSucceeded) => {
      if (processSucceeded) {
        let result = json.ExecuteResponse.ProcessOutputs.Output.Data.LiteralData.value;
        let message = json.ExecuteResponse.Status.ProcessSucceeded.value;

        this.setState({
          percentageComplete: 100,
          message: message,
          result: result,
          isComplete: true,
          isRunning: false
        });
      } else {
        this.setState({
          percentageComplete: '-',
          message: 'failed',
          isComplete: true,
          isRunning: false
        });
      }
    };

    doWPSExecuteCall(wps, accessToken, statusUpdateCallback, executeCompletCallback);
  };

  render () {
    const { accessToken } = this.props;
    let link = this.state.result + '?key=' + accessToken + '&format=application/json';
    return (
      <div>
        <p>{accessToken}</p>
        <button id='wrangleButton' onClick={this.wrangleClicked}>Wrangle!</button>{this.state.statusLocation}
        <p className='percentage'>percentageComplete: {this.state.percentageComplete}%</p>
        <p>message: {this.state.message}</p>
        <p>isRunning {this.state.isRunning ? 'true' : 'false' }</p>
        <p>isComplete: {this.state.isComplete ? 'true' : 'false' }</p>
        <p>Result: {this.state.result}</p>
        { this.state.isComplete ? <p>Result as JSON: <a target='_blank' href={link}>{link}</a></p> : null }
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string
};
