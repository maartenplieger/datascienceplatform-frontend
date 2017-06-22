
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WranglerComponent from './WranglerComponent';

export default class Wrangler extends Component {
  render () {
    const { dispatch, actions, accessToken, clientId, domain } = this.props;
    console.log(domain);
    return (
      <div className='MainViewport'>
        <h1>Wrangle data</h1>
        <WranglerComponent
          // inputCSVPath='ExportOngevalsData100lines.csv'
          inputCSVPath='globalstats.csv'
          jobDescPath='jobDesc.json'
          metaCSVPath='metaDataCsv.json'
          dispatch={dispatch}
          actions={actions}
          accessToken={accessToken}
          domain={domain}
          clientId={clientId} />
      </div>);
  }
}
Wrangler.propTypes = {
  accessToken: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
