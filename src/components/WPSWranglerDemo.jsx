import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from '../static/config.js';

let accessToken = '444dbedd-a979-4cd9-8dd4-7b0353e04d36';

var c4iProcessingGetKeys = function (obj) {
  if (!Object.keys) {
    let keys = [];
    let k;
    for (k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys.push(k);
      }
    }
    return keys;
  } else {
    return Object.keys(obj);
  }
};

var _stripNS = function (newObj, obj) {
  var keys = c4iProcessingGetKeys(obj);

  for (var j = 0; j < keys.length; j++) {
    var key = keys[j];
    var i = key.indexOf(':');
    var newkey = key.substring(i + 1);
    var value = obj[key];
    if (typeof value === 'object') {
      newObj[newkey] = {};
      _stripNS(newObj[newkey], value);
    } else {
      newObj[newkey] = value;
    }
  }
};

var stripNS = function (currentObj) {
  var newObj = {};
  _stripNS(newObj, currentObj);
  return newObj;
};

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
      statusLocation: 'no process running',
      isRunning: false,
      percentageComplete: 0,
      processSucceeded: false,
      message: '',
      result:''
    };
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.doWPSCall = this.doWPSCall.bind(this);
    this.pollProcesss = this.pollProcesss.bind(this);
  }

  pollProcesss () {
    if (this.state.isRunning) {
      console.log('pol' + this.state.statusLocation);
      let wps = this.state.statusLocation + '&key=' + accessToken;
      this.doWPSCall(wps, accessToken, (json) => {
        let message = '';
        let result = '';
        let percentageComplete = 0;
        try {
          percentageComplete = json.ExecuteResponse.Status.ProcessStarted.attr.percentCompleted;
        } catch (e) {}

        let processSucceeded = false;

        try {
          message = json.ExecuteResponse.Status.ProcessSucceeded.value;
          processSucceeded = true;
          percentageComplete = 100;
          result = json.ExecuteResponse.ProcessOutputs.Output.Data.LiteralData.value;
        } catch (e) {}
        this.setState({
          percentageComplete: percentageComplete,
          isRunning: !processSucceeded,
          processSucceeded: processSucceeded,
          message: message,
          result:result
        });
      });
    }
  }

  doWPSCall (wps, key, callback) {
    let encodedWPSURL = encodeURIComponent(wps);
    let requestURL = config.backendHost + '/xml2json?request=' + encodedWPSURL;
    console.log('starting fetch ' + requestURL);
    fetch(requestURL)
    .then(function (response) {
      let a = response.json();
      console.log(a);
      return a;
    }).then(json => {
      let strippedJSON = stripNS(json);
      console.log(strippedJSON);
      callback(strippedJSON);
    }).catch(function (data) {
      console.log(data);
    });
  }

  wrangleClicked () {
    // const { accessToken } = this.props;
    this.setState({ statusLocation: 'starting' });

    let wps = this.props.domain + '/wps?service=wps&request=Execute&identifier=wrangleProcess&' +
    'version=1.0.0&DataInputs=inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101&storeExecuteResponse=true&status=true&key=' + accessToken;
    this.doWPSCall(wps, accessToken, (json) => {
      let statusLocation = json.ExecuteResponse.attr.statusLocation;
      this.setState({ statusLocation: statusLocation, isRunning: true });
    });
  };

  componentDidMount () {
    window.setInterval(function () {
      this.pollProcesss();
    }.bind(this), 1000);
  }
  render () {
    const { accessToken } = this.props;
    return (
      <div>
        <p>{accessToken}</p>
        <button id='wrangleButton' onClick={this.wrangleClicked}>Wrangle!</button>{this.state.statusLocation}
        <p>percentageComplete: {this.state.percentageComplete}</p>
        <p>message: {this.state.message}</p>
        <p>Result: {this.state.result}</p>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  domain: PropTypes.string
};
