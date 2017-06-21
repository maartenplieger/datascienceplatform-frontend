
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.dropDownSelectItem = this.dropDownSelectItem.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20
    };
  }

  toggle (e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropDownSelectItem (value) {
    this.setState({
      dropDownValue: value
    });
  };

  wrangleClicked (id) {
    const { accessToken, dispatch, actions, nrOfStartedProcesses } = this.props;
    dispatch(actions.startWPSExecute(accessToken, 'wrangleProcess',
      'inputCSVPath=ExportOngevalsData100lines.csv;metaCSVPath=metaDataCsv.json;jobDescPath=jobDesc.json;limit=101',
      nrOfStartedProcesses));
  };

  calculateClicked () {
    const { accessToken, dispatch, actions, nrOfStartedProcesses } = this.props;
    dispatch(actions.startWPSExecute(accessToken, 'binaryoperatorfornumbers_10sec',
      '[inputa=' + this.state.inputa + ';inputb=' + this.state.inputb + ';operator=' + this.state.dropDownValue + ';]', nrOfStartedProcesses));
  };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  render () {
    const { accessToken, nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <h1>WPS Demo</h1>
        <p>{accessToken}</p>
        <p><Button id='wrangleButton' onClick={() => { this.wrangleClicked('wrangleProcess'); }}>Wrangle!</Button></p>
        <p>
          <Row>
            <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col>
            <Col xs='2'>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret >
                  { this.state.dropDownValue }
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e) => { this.dropDownSelectItem('add'); }}>add</DropdownItem>
                  <DropdownItem onClick={(e) => { this.dropDownSelectItem('divide'); }}>divide</DropdownItem>
                  <DropdownItem onClick={(e) => { this.dropDownSelectItem('substract'); }}>substract</DropdownItem>
                  <DropdownItem onClick={(e) => { this.dropDownSelectItem('multiply'); }}>multiply</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
            <Col xs='2'><Input onChange={(event) => { this.handleChange('inputb', event.target.value); }} value={this.state.inputb} /></Col>
            <Col xs='2'><Button color='primary' id='wrangleButton' onClick={() => { this.calculateClicked(); }}>Calculate</Button></Col>
          </Row>
        </p>
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
  nrOfCompletedProcesses: PropTypes.number
};
