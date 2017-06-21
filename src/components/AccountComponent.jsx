
import React, { Component } from 'react';
import { Col, Row, Card } from 'reactstrap';
import PropTypes from 'prop-types';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    const { accessToken, emailAddress, clientId, domain } = this.props;
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='auto'>
            <div className='text'>
              <h1>Your account</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col >
            <Card>
              {
                clientId !== null ? <p>Email: {emailAddress}</p> : <p>Not logged in</p>
              }
              {
                clientId !== null ? <p>Id: {clientId}</p> : <p>Your clientID: Not logged in</p>
              }
              {
                <p>Accesstoken: {accessToken}</p>
              }
              {
                clientId !== null ? <p>Compute node: {domain}</p> : <p>Your Domain: Not logged in</p>
              }
            </Card>
          </Col>
        </Row>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  emailAddress: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string
};
