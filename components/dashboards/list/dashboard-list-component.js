import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';
import Paginator from 'components/ui/Paginator';
import SearchInput from 'components/ui/SearchInput';

export default function DashboardsList({
  data,
  onChangePage,
  onChangeSearch,
  onSelectDashboard
}) {
  return (
    <div className="c-dashboard-widget-edition">
      <div className="c-page-section -small dock-widget-container">
        <div className="l-container">
          <div className="row">
            <div className="column small-12">

              <SearchInput
                input={{
                  placeholder: 'Search widget'
                }}
                link={{
                  label: 'New dashboard',
                  route: 'myrw',
                  params: { tab: 'dashboards', id: 'new' }
                }}
                onSearch={onChangeSearch}
              />

              <Spinner isLoading={data.loading} className="-relative -small -light" />

              <div className="row l-row">
                {data.dashboards.map(dashboard => (
                  <div
                    className="column list-item small-12 medium-4"
                    key={dashboard.id}
                  >
                    <div className="c-card">
                      <div
                        className="card-container"
                      >
                        <header className="card-header">
                          <Title
                            className="-default"
                          >
                            <span
                              onClick={() => {
                                onSelectDashboard(dashboard);
                              }}
                            >
                              {dashboard.name}
                            </span>
                          </Title>
                        </header>

                        <div className="card-content">
                          {dashboard.published && 'published' }
                          {!dashboard.published && 'not published' }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Paginator
                options={{
                  size: data.total,
                  page: data.page,
                  limit: data.pageSize
                }}
                onChange={onChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardsList.propTypes = {
  data: PropTypes.object,
  onChangePage: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onSelectDashboard: PropTypes.func
};

DashboardsList.defaultProps = {
  data: {},
  user: {},
  onChangePage: null,
  onChangeSearch: null,
  onSelectDashboard: null
};
