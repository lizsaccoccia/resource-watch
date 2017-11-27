import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import DashboardsList from 'components/dashboards/list/dashboard-list';

function DashboardsIndex(props) {
  const { user } = props;

  console.log(user);

  return (
    <div className="c-dashboards-index">
      <DashboardsList
        filters={{
          'filter[user]': user.id
        }}
        onSelectDashboard={d => console.info(d)}
      />
    </div>
  );
}

DashboardsIndex.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(DashboardsIndex);
