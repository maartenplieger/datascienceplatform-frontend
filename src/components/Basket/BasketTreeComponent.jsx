import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import PropTypes from 'prop-types';

export default class BasketTreeComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle (node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  render () {
    const decorators = {
      Container: (props) => {
        return (
          <div onClick={props.onClick}>
            {props.node.name ? props.node.name : ''}
            {'       '}
            {props.node.size ? props.node.size + ' bytes' : ''}
            {'       '}
            {props.node.date ? props.node.date : ''}
          </div>
        );
      }
    };
    return (
      <Treebeard
        data={this.props.data}
        onToggle={this.onToggle}
        decorators={decorators}
      />
    );
  }
}

BasketTreeComponent.propTypes = {
  data: PropTypes.object
};
