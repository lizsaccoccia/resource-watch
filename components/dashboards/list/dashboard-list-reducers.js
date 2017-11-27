import * as actions from './dashboard-list-actions';

export default {
  [actions.setDashboards]: (state, action) =>
    ({ ...state, dashboards: action.payload }),

  [actions.setLoading]: (state, action) =>
    ({ ...state, loading: action.payload }),

  [actions.setError]: (state, action) =>
    ({ ...state, error: action.payload }),

  [actions.setPage]: (state, action) =>
    ({ ...state, page: action.payload }),

  [actions.setPageSize]: (state, action) =>
    ({ ...state, pageSize: action.payload }),

  [actions.setTotal]: (state, action) =>
    ({ ...state, total: action.payload }),

  [actions.setSearch]: (state, action) =>
    ({ ...state, search: action.payload })


};
