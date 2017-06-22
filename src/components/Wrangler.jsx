
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WranglerComponent from './WranglerComponent';

export default class Wrangler extends Component {
  render () {
    const { dispatch, actions, accessToken, clientId, domain, selectedCSVFileForWrangling, nrOfStartedProcesses, runningProcesses } = this.props;

    let _selectedCSVFileForWrangling = selectedCSVFileForWrangling;
    if (!_selectedCSVFileForWrangling) {
      _selectedCSVFileForWrangling = 'ExportOngevalsData.csv';
    }
    let filedescription = _selectedCSVFileForWrangling.substring(0, _selectedCSVFileForWrangling.lastIndexOf('.')) + '_descr.json';

    return (
      <div className='MainViewport'>
        <h1>Wrangle data</h1>
        <WranglerComponent
          // inputCSVPath='ExportOngevalsData100lines.csv'
          inputCSVPath={_selectedCSVFileForWrangling}
          metaCSVPath={filedescription}
          dispatch={dispatch}
          actions={actions}
          accessToken={accessToken}
          domain={domain}
          clientId={clientId}
          nrOfStartedProcesses={nrOfStartedProcesses}
          runningProcesses={runningProcesses}
          />
      </div>);
  }
}
Wrangler.propTypes = {
  selectedCSVFileForWrangling: PropTypes.string,
  accessToken: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
