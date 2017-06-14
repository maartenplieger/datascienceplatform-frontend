import React from 'react';
import LoginComponent from './LoginComponent';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('(Component) LoginComponent', () => {
  let _component;
  const _dispatch = sinon.spy();
  const incrementFunc = sinon.spy();
  const _actions = {
    incrementCounter: incrementFunc
  };
  beforeEach(() => {
    _component = mount(<LoginComponent count={0} dispatch={_dispatch} actions={_actions} />);
  });

  it('Can mount', () => {
    expect(_component.type()).to.equal(LoginComponent);
    expect(_component.html()).to.equal('<div>hi!</div>');
  });
});
