
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Icon from 'react-fa';
import PreviewComponent from './PreviewComponent';
import { withRouter } from 'react-router';

class WranglerComponent extends Component {
  constructor () {
    super();
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.metaDataClicked = this.metaDataClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.startWrangling = this.startWrangling.bind(this);

    this.state = {
      modal: false
    };
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

  toggle () {
    this.setState({
      modal: !this.state.modal,
      title:'',
      id:''
    });
  }

  metaDataClicked (title, id, _this) {
    this.setState({
      modal: !this.state.modal,
      title:title,
      id:id
    });

    console.log(title);
  };

  renderParam (title, id) {
    return (<Row style={{ background:'#EEE', margin:'10px' }}>
      <Col style={{ width:'600px', padding: '7px 0 0 15px' }} >
        <Label check>
          <Input type='checkbox' /> {title}
        </Label>
      </Col>
      <Col xs='1'>
        <Button color='info' onClick={() => { this.metaDataClicked(title, id, this); }}><Icon name='list' /></Button>
      </Col>
    </Row>);
  };

  startWrangling () {
    alert('OK');
  };

  render () {
    const { accessToken, clientId, domain, inputCSVPath, jobDescPath, metaCSVPath } = this.props;
    if (!clientId) return (<div>Not signed in</div>);
    return (
      <div>
        <Row>
          <Col>{ clientId !== null ? <p>{clientId}</p> : <p>Your clientID: Not logged in</p> }</Col>
          <Col>{domain}</Col>
          <Col>{accessToken}</Col>
        </Row>
        <h3>Provided inputs from upload:</h3>
        <Row style={{ background:'#EEE', margin:'10px' }}>
          <Col xs='2'>
            <Label>inputCSVPath</Label>
          </Col>
          <Col>
            <Input value={inputCSVPath} />
          </Col>
          <Col xs='1'>
            <Button color='info' onClick={() => { }}><Icon name='shopping-basket' /></Button>
          </Col>
        </Row>
        <Row style={{ background:'#EEE', margin:'10px' }}>
          <Col xs='2'>
            <Label>jobDescPath</Label>
          </Col>
          <Col>
            <Input value={jobDescPath} />
          </Col>
          <Col xs='1'>
            <Button color='info' onClick={() => { }}><Icon name='shopping-basket' /></Button>
          </Col>
        </Row>
        <Row style={{ background:'#EEE', margin:'10px' }}>
          <Col xs='2'>
            <Label>metaCSVPath</Label>
          </Col>
          <Col>
            <Input value={metaCSVPath} />
          </Col>
          <Col xs='1'>
            <Button color='info' onClick={() => { }}><Icon name='shopping-basket' /></Button>
          </Col>
        </Row>
        <h3>Select meteorological parameters:</h3>
        { this.renderParam('Radar data', 'id1') }
        { this.renderParam('Radar data nog een andere', 'id2') }
        { this.renderParam('Radar data en nog een', 'id3') }
        <p>First 10 rows of data</p>
        <PreviewComponent
          file={'https://' + domain + '/opendap/' + accessToken + '/' + clientId.replace('/', '.') + '/' + inputCSVPath}
          numberOfLinesDisplayed={10}
          tableClassName='previewTable'
          componentClassName='previewComponent'
        />
        <Button color='primary' style={{ float:'right' }} onClick={this.startWrangling}>Start wrangling</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Metadata for [{this.state.title}]</ModalHeader>
          <ModalBody>
            <p>Choosed ID = {this.state.id}</p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>);
  }
}

WranglerComponent.propTypes = {
  accessToken: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  inputCSVPath: PropTypes.string.required,
  jobDescPath: PropTypes.string.required,
  metaCSVPath: PropTypes.string.required
};

export default withRouter(WranglerComponent);
