import React, { Component } from 'react';
import { config } from 'static/config.js';
import { Col, Row, Navbar, NavbarBrand, NavItem, Nav, NavLink, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import DSPLogo from '../components/assets/dsp_logo.svg';

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

  componentWillUpdate () {
    this.canRender();
  }

  render () {
    const { clientId, location } = this.props;
    var { pathname } = location;

    return (
      <div>
        <Navbar inverse>
          <Row>
            <Col xs='auto'>
              <NavbarBrand tag='div'>
                <img alt='Home of GeoWeb' className='logo' src={DSPLogo} />
                <span className='nav-brand-text'>DSP</span>
              </NavbarBrand>
            </Col>
            <Col className='welcomeSign'>
              <h1>KNMI Data Science Platform</h1>
            </Col>
            <Col xs='auto' className='signInOffButton'>
              {
                clientId !== null ? <Button color='primary' onClick={this.logout}>Sign out</Button>
                : <Button onClick={this.login}>Sign in</Button>
              }
            </Col>
          </Row>
        </Navbar>
        <Navbar color='faded' className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/' active={pathname === '/'} >Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/wrangler' active={pathname === '/wrangler'}>Wrangler</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/basket' active={pathname === '/basket'}>Basket</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
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
        console.log('Not signed in');
        dispatch(actions.setAccessToken(null));
        dispatch(actions.setClientId(null));
        dispatch(actions.setEmailAddress(null));
        dispatch(actions.setDomain(null));
      } else {

        console.log(actions);
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
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  routes: PropTypes.array
};
