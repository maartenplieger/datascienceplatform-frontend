import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import PropTypes from 'prop-types';
import stylingBasket from '../../styles/stylingBasket/stylingBasket';
import { Button } from 'reactstrap';
import ScrollArea from 'react-scrollbar';

export default class BasketTreeComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onToggle (node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  /**
   * Deleting an item by dispatching an action.
   **/
  deleteItem () {
    const { dispatch, actions, accessToken } = this.props;
    if (!accessToken) return;

    /* Getting the path of the currently selected item. */
    let pathItem = this.state.cursor.id;
    const pathItemWithoutGoogleId =
      pathItem.substring(pathItem.indexOf('/'), pathItem.length);

    dispatch(actions.deleteBasketItem({ accessToken: accessToken,
      path: pathItemWithoutGoogleId }));
  }

  render () {
    // const decorators = {
    //   Container: (props) => {
    //     return (
    //       <div onClick={props.onClick}>
    //         {props.node.name ? props.node.name : ''}
    //         {'       '}
    //         {props.node.size ? props.node.size + ' bytes' : ''}
    //         {'       '}
    //         {props.node.date ? props.node.date : ''}
    //       </div>
    //     );
    //   }
    // };

    return (
      <div>
        <ScrollArea speed={0.8} horizontal={false} contentClassName='content' className='scrollAreaBasket' >
          <Treebeard
            data={this.props.data}
            onToggle={this.onToggle}
            style={stylingBasket}
          />
        </ScrollArea>
        <hr />
        <Button className='basketButton'>Upload</Button>
        <Button className='basketButton'>Preview</Button>
        <Button className='basketButton'>Wrangle</Button>
        <Button className='basketButton'>Download</Button>
        <Button className='basketButton' onClick={() => this.deleteItem()}>Delete</Button>
      </div>
    );
  }
}

BasketTreeComponent.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.object.isRequired
};
