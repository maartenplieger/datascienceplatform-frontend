
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
    this.loadCatalog = this.loadCatalog.bind(this);

    this.state = {
      modal: false,
      inputCSVPath:null,
      catalog:null,
      selectedCatalog: null
    };

    this.domainLoaded = false;
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
    let catalogs = this.state.catalog;
    for (let j = 0; j < catalogs.catalog.length; j++) {
      let catalog = catalogs.catalog[j];
      if (id === catalog.name) {
        this.setState({
          modal: !this.state.modal,
          title:title,
          id:id,
          selectedCatalog: Object.assign({}, catalog)
        });
      }
    }
  };

  renderCatalogs () {
    let catalogs = this.state.catalog;
    let html = [];
    for (let j = 0; j < catalogs.catalog.length; j++) {
      let catalog = catalogs.catalog[j];
      html.push(Object.assign({}, this.renderParam(catalog.title, catalog.name), { key: j }));
    }

    return html;
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

  componentWillReceiveProps (nextProps) {
    const { domain } = nextProps;
    if (!domain) {
      return;
    }
    this.loadCatalog(domain);
  }

  loadCatalog (domain) {
    if (domain && this.domainLoaded === false) {
      this.domainLoaded = true;
      let url = 'https://' + domain + '/catalog/list';
      console.log('Fetching catalog url', url);
      fetch(url,
        {
          credentials:'include'
        }).then((result) => {
          return result.json();
        }).then((json) => {
          this.setState({
            catalog: json
          });
        });
    }
  };

  componentDidMount () {
    this.setState({
      inputCSVPath: this.props.inputCSVPath
    });
  }

  handleChange (name, value) {
    this.setState({
      [name]: value
    });
  };

  render () {
    this.loadCatalog(this.props.domain);
    const { accessToken, clientId, domain, jobDescPath, metaCSVPath } = this.props;
    if (!clientId || !this.state.inputCSVPath || !this.state.catalog) return (<div>Not signed in</div>);
    let file = 'https://' + domain + '/opendap/' + accessToken + '/' + clientId.replace('/', '.') + '/' + this.state.inputCSVPath;
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
            <Label>{this.state.inputCSVPath}</Label>
          </Col>
        </Row>
        <Row style={{ background:'#EEE', margin:'10px' }}>
          <Col xs='2'>
            <Label>jobDescPath</Label>
          </Col>
          <Col>
             <Label>{jobDescPath}</Label>
          </Col>
        </Row>
        <Row style={{ background:'#EEE', margin:'10px' }}>
          <Col xs='2'>
            <Label>metaCSVPath</Label>
          </Col>
          <Col>
            <Label>{metaCSVPath}</Label>
          </Col>
        </Row>
        <h3>Select meteorological parameters:</h3>
        {
          this.renderCatalogs()
        }

        <p>First 10 rows of data</p>
        <PreviewComponent
          file={file}
          numberOfLinesDisplayed={10}
          tableClassName='previewTable'
          componentClassName='previewComponent'
        />
        <Button color='primary' style={{ float:'right' }} onClick={this.startWrangling}>Start wrangling</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Metadata for [{this.state.title}]</ModalHeader>
          <ModalBody>
            <p>Choosed ID = {this.state.id}</p>
            <Row><Col>Name:</Col><Col> { this.state.selectedCatalog ? this.state.selectedCatalog.name : null }</Col></Row>
            <Row><Col>Datatype:</Col><Col> { this.state.selectedCatalog ? this.state.selectedCatalog.datatype : null }</Col></Row>
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
  inputCSVPath: PropTypes.string.isRequired,
  jobDescPath: PropTypes.string.isRequired,
  metaCSVPath: PropTypes.string.isRequired
};

export default withRouter(WranglerComponent);
