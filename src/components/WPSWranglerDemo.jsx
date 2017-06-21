
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.wrangleClicked = this.wrangleClicked.bind(this);
  }

  wrangleClicked (id) {
    const { accessToken, dispatch, actions, nrOfStartedProcesses } = this.props;
    dispatch(actions.startWPSExecute(accessToken, 'wrangleProcess',
      'inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101',
      nrOfStartedProcesses));
  };

  calculateClicked (id) {
    const { accessToken, dispatch, actions, nrOfStartedProcesses } = this.props;
    dispatch(actions.startWPSExecute(accessToken, 'binaryoperatorfornumbers_10sec', 'inputa=10;inputb=2;operator=divide', nrOfStartedProcesses));
  };

  render () {
    const { accessToken, nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <h1>Wrangler Demo</h1>
        <p>{accessToken}</p>
        <Button id='wrangleButton' onClick={() => { this.wrangleClicked('wrangleProcess'); }}>Wrangle!</Button>
        <Button id='wrangleButton' onClick={() => { this.calculateClicked('binaryoperatorfornumbers_10sec'); }}>Calculator</Button>
        <p>nrOfStartedProcesses: {nrOfStartedProcesses}</p>
        <p>nrOfFailedProcesses: {nrOfFailedProcesses}</p>
        <p>nrOfCompletedProcesses: {nrOfCompletedProcesses}</p>
        <p>runningProcesses: {JSON.stringify(runningProcesses)}</p>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.Object
};
