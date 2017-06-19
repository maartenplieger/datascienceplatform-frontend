
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doWPSExecuteCall } from '../utils/WPSRunner.js';
import { Button } from 'reactstrap';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
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
      isRunning: true,
      isComplete: false
    });

    // let dataInputs = 'inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101';
    // let wps = this.props.domain + '/wps?service=wps&request=Execute&identifier=wrangleProcess&' +
    // 'version=1.0.0&DataInputs=' + dataInputs + '&storeExecuteResponse=true&status=true&';

    let dataInputs = 'inputa=10;inputb=0;operator=divide;';
    console.log(this.props.domain);
    let wps = 'https://' + this.props.domain + '/wps?service=wps&request=Execute&identifier=binaryoperatorfornumbers_10sec&' +
    'version=1.0.0&DataInputs=' + dataInputs + '&storeExecuteResponse=true&status=true&';

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
          isComplete: false,
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
        <Button id='wrangleButton' onClick={this.wrangleClicked}>Wrangle!</Button>
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
  accessToken: PropTypes.string,
  domain: PropTypes.string
};
