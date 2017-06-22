import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import FileColumnDescriptionComponent from './FileColumnDescriptionComponent';
import FileStructureDescriptionComponent from './FileStructureDescriptionComponent';
import PreviewComponent from './PreviewComponent';
import FileUploadComponent from './FileUploadComponent';

export default class UploadComponent extends Component {
  componentWillUnmount () {
    console.log(this.props.actions);
    this.props.dispatch(this.props.actions.clearUploadState());
  }

  replacer (name, val) {
    // Convert integers to integers.
    if (parseInt(val)) {
      return parseInt(val);
    }
    // Convert to special caracters.
    if (val === 'tab') {
      return '\t';
    }
    if (val === 'CR') {
      return '\r';
    }
    if (val === 'LF') {
      return '\n';
    }
    if (val === 'CRLF') {
      return '\r\n';
    }

    // Return the value as is.
    return val;
  };

  render () {

    // TODO: Replace is niet correct doorgestuurd!!!!!

    return (
      <div className='MainViewport'>
        <FileUploadComponent accessToken={this.props.accessToken}
                             dispatch={this.props.dispatch} actions={this.props.actions} />
        <div className='divider-2' />
        { this.props.fileName &&
        <FileStructureDescriptionComponent accessToken={this.props.accessToken}
          dispatch={this.props.dispatch}
          actions={this.props.actions}
          fileName={this.props.fileName}
          fileStructureDescription={this.props.fileStructureDescription}
          replace={this.replace} />
        }

        <div className='divider-2' />
        {this.props.fileName && this.props.uploadedFileStructureDescription &&
        <PreviewComponent
          file={config.adagucServicesHost + '/opendap/' + this.props.accessToken + '/' + this.props.clientId.replace('/','.') +'/' + this.props.fileName}
          tableClassName='previewTable'
          componentClassName='previewComponent'
          numberOfLinesDisplayed={30}/>
        }

        <div className='divider-2' />
        { this.props.fileName && this.props.uploadedFileStructureDescription &&
        <FileColumnDescriptionComponent accessToken={this.props.accessToken}
          dispatch={this.props.dispatch}
          actions={this.props.actions}
          fileName={this.props.fileName}
          fileColumnDescription={this.props.fileColumnDescription}
          fileStructureDescription={this.props.fileStructureDescription}
          replacer={this.replacer} />
        }
      </div>
    );
  }
}

UploadComponent.propTypes = {
  fileName: PropTypes.string,
  uploadedFileStructureDescription: PropTypes.bool,
  accessToken: PropTypes.string,
  fileColumnDescription: PropTypes.object,
  fileStructureDescription: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
