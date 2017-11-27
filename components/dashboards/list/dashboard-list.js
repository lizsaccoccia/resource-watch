import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import * as actions from './dashboard-list-actions';
import reducers from './dashboard-list-reducers';
import defaultState from './dashboard-list-default-state';

import DashboardsListComponent from './dashboard-list-component';

// Mandatory
export {
  actions, reducers, defaultState
};

class DashboardsList extends React.Component {
  static propTypes = {
    // Redux
    data: PropTypes.object.isRequired,
    // Actions
    setDashboards: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    onSelectDashboard: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.triggerFetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.data.page !== this.props.data.page) ||
      (nextProps.data.search !== this.props.data.search)
    ) {
      this.triggerFetch(nextProps);
    }
  }

  componentWillUnmount() {
    // Reset page and search params
    this.props.setDashboards([]);
    this.props.setPage(1);
    this.props.setSearch('');
  }

  /**
   * HELPERS
   * - triggerFetch
  */
  triggerFetch = (props) => {
    props.fetchWidgets({
      filters: {
        ...props.filters,
        ...!!props.data.search && { name: props.data.search },
        'page[number]': props.data.page
      }
    });
  }

  render() {
    return createElement(DashboardsListComponent, {
      onSelectDashboard: (dashboard) => {
        this.props.onSelectDashboard(dashboard);
      },
      onChangePage: (page) => {
        this.props.setPage(page);
      },
      onChangeSearch: debounce((search) => {
        this.props.setSearch(search);
      }, 250),
      ...this.props
    });
  }
}
export default connect(
  state => ({
    data: state.dashboardList,
    user: state.user
  }),
  actions
)(DashboardsList);
