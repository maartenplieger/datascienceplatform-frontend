import React from 'react';
import UploadComponent from './UploadComponent';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('(Upload) UploadComponent', () => {
  let _component;
  const _dispatch = sinon.spy();
  const incrementFunc = sinon.spy();
  const _actions = {
    incrementCounter: incrementFunc
  };
  beforeEach(() => {
    _component = mount(<UploadComponent count={0} dispatch={_dispatch} actions={_actions} />);
  });

  it('Can mount', () => {
    expect(_component.type()).to.equal(UploadComponent);
  });
});
