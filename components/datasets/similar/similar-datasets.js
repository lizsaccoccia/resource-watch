import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from './similar-datasets-actions';
import reducers from './similar-datasets-reducers';
import defaultState from './similar-datasets-default-state';

import SimilarDatasetsComponent from './similar-datasets-component';

// Mandatory
export {
  actions, reducers, defaultState
};

class SimilarDatasets extends React.Component {
  static propTypes = {
    datasetId: PropTypes.string.isRequired
  };

  async componentWillMount() {
    if (this.props.datasetId) {
      await this.triggerFetch(this.props);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.datasetId !== this.props.datasetId) {
      await this.triggerFetch(nextProps);
    }
  }

  /**
   * HELPERS
   * - triggerFetch
  */
  triggerFetch = props => props.fetchSimilarDatasets({
    id: props.datasetId
  })

  render() {
    return createElement(SimilarDatasetsComponent, {
      ...this.props
    });
  }
}
export default connect(
  state => ({
    data: state.similarDatasets
  }),
  actions
)(SimilarDatasets);
