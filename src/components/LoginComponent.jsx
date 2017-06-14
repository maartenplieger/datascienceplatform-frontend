import React, { Component } from 'react';
import { config } from 'static/config.js';

export default class LoginComponent extends Component {
  constructor () {
    super();
    this.canRender = this.canRender.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: false,
      id: null
    };
  }

  componentDidMount () {
    this.canRender();
  }

  render () {
    return (
      <div>
        <div>
          {
            this.state.isLoggedIn ? <button onClick={this.logout}>Logout</button>
            : <button onClick={this.login}>Login</button>
          }
        </div>
        <div>
          {
            this.state.id ? <p>ID: {this.state.id}</p> : <p>Not signed in</p>
          }
        </div>
      </div>);
  }

  canRender () {
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
        this.setState({ isLoggedIn: false });
        this.setState({ id: null });
      } else {
        this.setState({ isLoggedIn: true });
        this.setState({ id: obj.id });
      }
    });
  }

  login () {
    const { backendHost, frontendHost } = config;
    window.location.assign(backendHost + '/oauth?provider=google&returnurl=' + frontendHost);
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
