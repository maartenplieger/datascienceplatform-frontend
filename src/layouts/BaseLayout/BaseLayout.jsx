import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../styles/core.scss';

class BaseLayout extends Component {
  render () {
    const { header, mainContent } = this.props;
    return (
      <Container>
        <div className='container text-center'>
          <Row className='upperHeader'>
            <h1>Data Science Platform</h1>
          </Row>
          <Row>
            {header || 'Oops'}
          </Row>
          <Row>
            <div className='page-layout__viewport'>
              {mainContent}
            </div>
          </Row>
        </div>
      </Container>
    );
  }
}

BaseLayout.propTypes = {
  header: PropTypes.element,
  mainContent: PropTypes.element
};

export default BaseLayout;
