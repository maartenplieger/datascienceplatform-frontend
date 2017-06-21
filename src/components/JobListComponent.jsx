import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from '../static/config.js';
import JsonTable from 'react-json-table';
import Linkify from 'react-linkify';

export default class JobListComponent extends Component {
  fetchJobListItems () {
    const { accessToken, dispatch, actions } = this.props;
    if (!accessToken) {
      return;
    }

    fetch(config.adagucServicesHost + '/joblist/list?key=' + accessToken)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return null;
      }
    })
    .then((json) => {
      dispatch(actions.updateJobListItems(json));
    });
  }

  componentWillMount () {
    this.fetchJobListItems();
  }

  render () {
    if (!this.props.jobs) return null;
    const jobs = this.props.jobs;

    /* We cannot display object inside a JSON,
     * so delete it. */
    jobs.forEach(function (object) {
      delete object.wpspostdata;
    });

    const columns = [
      { key: 'id', label: 'Job ID' },
      { key: 'creationtime', label: 'Creation date' },
      { key: 'wpsstatus', label: 'Status' },
      { key: 'percentage', label: '%' },
      { key: 'statuslocation', label: 'Result' }
    ];

    return (
      <div>
        <Linkify properties={{ target: '_blank' }}>
          <JsonTable
            rows={jobs}
            className='joblistTable'
            columns={columns}
          />
        </Linkify>
      </div>
    );
  }
}

JobListComponent.propTypes = {
  accessToken: PropTypes.string,
  jobs: PropTypes.Array,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
