import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';

class BaseLayout extends Component {
  render () {
    const { mainContent } = this.props;
    return (
      <div className='container text-center'>
        <h1>Data Science Platform</h1>
        <div className='page-layout__viewport'>
          {mainContent}
        </div>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  mainContent: PropTypes.element
};

export default BaseLayout;
