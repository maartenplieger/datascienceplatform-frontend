import React, { Component } from 'react';
import { config } from 'static/config.js';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

export default class TitleComponent extends Component {
  constructor () {
    super();
    this.canRender = this.canRender.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    this.canRender();
  }

  render () {
    const { accessToken, emailAddress, clientId, domain } = this.props;
    return (
      <div>
        <Row>
          <Col xs='auto' className='welcomeSign'>
            {
              clientId !== null ? <h2>Hello {emailAddress}!</h2> : <h2>Not logged in</h2>
            }
            {
              clientId !== null ? <h4>Your clientID: {clientId}</h4> : <h4>Your clientID: Not logged in</h4>
            }
            {
              clientId !== null ? <h4>Your Access Token: {accessToken}</h4> : <h4>Your Access Token: Not logged in</h4>
            }
            {
              clientId !== null ? <h4>Your Domain: {domain}</h4> : <h4>Your Domain: Not logged in</h4>
            }
          </Col>
          <Col xs='auto' className='signInOffButton'>
            {
              clientId !== null ? <button onClick={this.logout}>Logout</button>
              : <button onClick={this.login}>Login</button>
            }
          </Col>
        </Row>
        <hr />
      </div>);
  }

  canRender () {
    const { dispatch, actions } = this.props;
    const { backendHost } = config;
    fetch(backendHost + '/getid', {
      credentials: 'include'
    })
    .then(function (response) {
      return response.json();
    })
    .then(json => {
      let obj = json;
      if (obj.error) {
        dispatch(actions.setAccessToken(null));
        dispatch(actions.setClientId(null));
        dispatch(actions.setEmailAddress(null));
        dispatch(actions.setDomain(null));
      } else {
        dispatch(actions.setAccessToken(obj.services_access_token));
        dispatch(actions.setClientId(obj.id));
        dispatch(actions.setEmailAddress(obj.email_address));
        dispatch(actions.setDomain(obj.domain));
      }
    });
  }

  login () {
    const { backendHost, frontendHost } = config;
    window.location.assign(backendHost + '/oauth?provider=google&returnurl=' + frontendHost + '/#/wrangler');
  }

  logout () {
    const { backendHost } = config;
    fetch(backendHost + '/logout', {
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.canRender();
    });
  }
}

TitleComponent.propTypes = {
  accessToken: PropTypes.string,
  emailAddress: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
