
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    const { accessToken, emailAddress, clientId, domain, location } = this.props;
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='auto'>
            <h1>Welcome!</h1>
          </Col>
        </Row>
        <Row>
          <Col >
            {
              clientId !== null ? <p>Your email: {emailAddress}</p> : <p>Not logged in</p>
            }
            {
              clientId !== null ? <p>Your id: {clientId}</p> : <p>Your clientID: Not logged in</p>
            }
            {
              clientId !== null ? <p>Your Access Token: {accessToken}</p> : <p>Your Access Token: Not logged in</p>
            }
            {
              clientId !== null ? <p>Your compute node: {domain}</p> : <p>Your Domain: Not logged in</p>
            }
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
