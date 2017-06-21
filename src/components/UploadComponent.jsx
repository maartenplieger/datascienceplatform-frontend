import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { actions } from 'react-redux-form';
import FileColumnDescriptionComponent from './FileColumnDescriptionComponent'
import FileStructureDescriptionComponent from './FileStructureDescriptionComponent'
import FileUploadComponent from './FileUploadComponent'
import ScrollArea from 'react-scrollbar';

export default class UploadComponent extends React.Component {

  componentWillUnmount() {
    console.log(this.props.actions);
    this.props.dispatch(this.props.actions.clearUploadState());
  }

  replacer(name, val) {
    // Convert integers to integers.
    if (parseInt(val)) {
      return parseInt(val);
    }
    if (val == "tab") {
      return "\t";
    }
    if (val == "CR") {
      return "\r";
    }
    if (val == "LF") {
      return "\n";
    }
    if (val == "CRLF") {
      return "\r\n";
    }

    // Return the value as is.
    return val;
  };

  render() {
    return (
      <div>
        <FileUploadComponent accessToken={this.props.accessToken}
                             dispatch={this.props.dispatch} actions={this.props.actions} />
        <div className="divider-2" />
        { this.props.fileName &&
        <FileStructureDescriptionComponent accessToken={this.props.accessToken}
                                           dispatch={this.props.dispatch}
                                           actions={this.props.actions}
                                           fileName={this.props.fileName}
                                           fileStructureDescription={this.props.fileStructureDescription}
                                           replace={this.replace}/>
        }
        <div className="divider-2" />
        { this.props.fileName && this.props.uploadedFileStructureDescription &&
        <FileColumnDescriptionComponent accessToken={this.props.accessToken}
                                        dispatch={this.props.dispatch}
                                        actions={this.props.actions}
                                        fileName={this.props.fileName}
                                        fileColumnDescription={this.props.fileColumnDescription}
                                        fileStructureDescription={this.props.fileStructureDescription}
                                        replacer={this.replacer}/>
        }
      </div>
    );
  }
}
