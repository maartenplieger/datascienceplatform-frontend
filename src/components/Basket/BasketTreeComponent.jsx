import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import PropTypes from 'prop-types';
import treeBeardStyling from '../../styles/stylingBasket/stylingBasket';
import { Button } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import PreviewComponent from '../PreviewComponent';
import { withRouter } from 'react-router';

class BasketTreeComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.deleteBasketItem = this.deleteBasketItem.bind(this);
  }

  /**
   * What to do when the treebeard is toggled.
   **/
  onToggle (node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }

    node.active = true;

    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  }

  /**
   * Deleting an item by dispatching an action.
   **/
  deleteBasketItem () {
    const { dispatch, actions, accessToken } = this.props;
    if (!accessToken) return;

    /* Getting the path of the currently selected item. */
    let pathItem = this.state.cursor.id;
    const pathItemWithoutGoogleId =
      pathItem.substring(pathItem.indexOf('/'), pathItem.length);

    dispatch(actions.deleteBasketItem({ accessToken: accessToken,
      path: pathItemWithoutGoogleId }));
  }

  /**
   * Download a basket item.
   **/
  downloadBasketItem () {
    // There's always an if..
    if (!this.state.cursor) return;

    /* this.state.cursor is always the current selected item in the basket. */
    window.location = this.state.cursor.httpurl;
  }

  previewFile () {
    const filePath = this.state.cursor.httpurl;
    return filePath;
  }

  render () {
    return (
      <div>
        <ScrollArea speed={1} horizontal={false} contentClassName='content' className='scrollAreaBasket' >
          {/* More about Treebeard: https://github.com/alexcurtis/react-treebeard */}
          <Treebeard
            data={this.props.data}
            onToggle={this.onToggle}
            style={treeBeardStyling}
          />
        </ScrollArea>
        <hr /> {/* Dividing line, for dividing the tree and the buttons. */}
        <Button className='basketButton' onClick={() => this.props.router.push('/upload')}>Upload</Button>
        <Button className='basketButton' onClick={() => this.previewFile()}
          disabled={this.state.cursor ? this.state.cursor.type === 'NODE' : true}>Preview</Button>
        <Button className='basketButton'>Wrangle</Button>
        <Button className='basketButton' onClick={() => this.downloadBasketItem()}
          disabled={this.state.cursor ? this.state.cursor.type === 'NODE' : true}>Download</Button>
        <Button className='basketButton' onClick={() => this.deleteBasketItem()}>Delete</Button>
        <hr />
        <PreviewComponent file={this.state.cursor ? this.state.cursor.httpurl : ''} />
      </div>
    );
  }
}

BasketTreeComponent.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default withRouter(BasketTreeComponent)
