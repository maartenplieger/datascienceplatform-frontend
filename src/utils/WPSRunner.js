
import { config } from '../static/config.js';

export const getKeys = function (obj) {
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
  var keys = getKeys(obj);

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

export const stripNS = function (currentObj) {
  var newObj = {};
  _stripNS(newObj, currentObj);
  return newObj;
};

export const doWPSCall = function (wps, accessToken, callback, failure) {
  doXML2JSONCallWithToken(wps, accessToken, callback, failure);
};

export const doWPSExecuteCall = function (wps, accessToken, statusCallBack, executeCompleteCallBack, failure) {
  statusCallBack('Starting WPS', 0);
  let wpsExecuteCallback = (executeResponse) => {
    let statusLocation = executeResponse.ExecuteResponse.attr.statusLocation;
    console.log(statusLocation);
    let processIsRunning = true;
    let pol = () => {
      console.log('POL');
      if (processIsRunning === false) {
        return;
      }
      let pollCallBack = (json) => {
        console.log('pollCallBack', json);
        let percentageComplete = 0;
        let message = '';

        /* Check processfailed */
        try {
          if (json.ExecuteResponse.Status.ProcessFailed) {
            processIsRunning = false;
            message = 'Failed, unable to get message';
            try {
              message = json.ExecuteResponse.Status.ProcessFailed.ExceptionReport.Exception.ExceptionText.value;
            } catch (e) {
            }
            statusCallBack(message, percentageComplete);
            executeCompleteCallBack(json, false);
            return;
          }
        } catch (e) {
        }

        try {
          percentageComplete = json.ExecuteResponse.Status.ProcessStarted.attr.percentCompleted;
          message = json.ExecuteResponse.Status.ProcessStarted.value;
          console.log('POLLING', json);
        } catch (e) {
        }

        let processCompleted = false;

        try {
          message = json.ExecuteResponse.Status.ProcessSucceeded.value;
          if (message) {
            percentageComplete = 100;
            console.log('COMPLETED', json);
            processIsRunning = false;
            statusCallBack(message, percentageComplete);
            executeCompleteCallBack(json, true);
            return;
          }
        } catch (e) {
        }
        if (processCompleted === false) {
          statusCallBack(message, percentageComplete);
        }
      };
      doXML2JSONCallWithToken(statusLocation, accessToken, pollCallBack, failure);
      setTimeout(pol, 300);
    };
    pol();
  };
  doXML2JSONCallWithToken(wps, accessToken, wpsExecuteCallback, failure);
};

const doXML2JSONCallWithToken = function (urlToXMLService, accessToken, callback, failure) {
  let encodedWPSURL = encodeURIComponent(urlToXMLService + '&key=' + accessToken);
  let requestURL = config.backendHost + '/xml2json?request=' + encodedWPSURL;
  console.log('starting fetch ' + requestURL);
  fetch(requestURL)
  .then(function (response) {
    let a = response.json();
    return a;
  }).then(json => {
    let strippedJSON = stripNS(json);
    callback(strippedJSON);
  }).catch(function (data) {
    console.log(data);
    failure(data);
  });
};
