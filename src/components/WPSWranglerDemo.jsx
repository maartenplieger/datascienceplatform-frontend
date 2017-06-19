
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doWPSExecuteCall } from '../utils/WPSRunner.js';
import { Button } from 'reactstrap';

let wpsProcessOptions = [];

let dataInputs = 'inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101';
wpsProcessOptions['wrangleProcess'] = 'service=wps&request=Execute&identifier=wrangleProcess&' +
     'version=1.0.0&DataInputs=' + dataInputs + '&storeExecuteResponse=true&status=true&';

wpsProcessOptions['binaryoperatorfornumbers_10sec'] = 'service=wps&request=Execute&identifier=binaryoperatorfornumbers_10sec&version=1.0.0&' +
  'DataInputs=inputa=10;inputb=2;operator=divide;&storeExecuteResponse=true&status=true&';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
      isRunning: false,
      percentageComplete: '-',
      message: '',
      result:'',
      isComplete:false
    };
    this.wrangleClicked = this.wrangleClicked.bind(this);
  }

  wrangleClicked (id) {
    const { accessToken } = this.props;
    this.setState({
      isRunning: true,
      isComplete: false
    });

    // let dataInputs = 'inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101';
    // let wps = this.props.domain + '/wps?service=wps&request=Execute&identifier=wrangleProcess&' +
    // 'version=1.0.0&DataInputs=' + dataInputs + '&storeExecuteResponse=true&status=true&';

    console.log(this.props.domain);
    let wps = 'https://' + this.props.domain + '/wps?' + wpsProcessOptions[id];

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

  componentWillMount () {
    console.log('componentWillMount');
  }

  componentDidMount () {
    console.log('componentDidMount');
  }

  componentWillUnmount () {
    console.log('componentWillUnmount()');
  }

  render () {
    const { accessToken } = this.props;
    let link = this.state.result + '?key=' + accessToken + '&format=application/json';
    return (
      <div className='MainViewport'>
        <h1>Wrangler</h1>
        <p>{accessToken}</p>
        <Button id='wrangleButton' onClick={() => { this.wrangleClicked('wrangleProcess'); }}>Wrangle!</Button>
        <Button id='wrangleButton' onClick={() => { this.wrangleClicked('binaryoperatorfornumbers_10sec'); }}>Calculator</Button>
        { this.state.percentageComplete !== '-' ? <p className='percentage'>percentageComplete: {this.state.percentageComplete}%</p> : null}
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
