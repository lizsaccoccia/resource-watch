import 'isomorphic-fetch';
import queryString from 'query-string';
import { createAction, createThunkAction } from 'redux-actions';

// Actions
export const setDashboards = createAction('DASHBOARDS_LIST_GET_DASHBOARDS');
export const setLoading = createAction('DASHBOARDS_LIST_LOADING');
export const setError = createAction('DASHBOARDS_LIST_ERROR');
export const setTab = createAction('DASHBOARDS_LIST_TAB');
export const setPage = createAction('DASHBOARDS_LIST_PAGE');
export const setPageSize = createAction('DASHBOARDS_LIST_PAGE_SIZE');
export const setTotal = createAction('DASHBOARDS_LIST_TOTAL');
export const setSearch = createAction('DASHBOARDS_LIST_SEARCH');


// Async actions
export const fetchWidgets = createThunkAction('DASHBOARDS_LIST_FETCH_DATA', (payload = {}) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const qParams = queryString.stringify({
    sort: 'name',
    'page[number]': 1,
    'page[size]': 9,
    ...payload.filters
  });

  fetch(`${process.env.API_URL}/dashboards?${qParams}`)
    .then(response => response.json())
    .then(({ data, meta }) => {
      dispatch(setLoading(false));
      dispatch(setError(null));

      dispatch(setDashboards(data.map(d => ({ ...d.attributes, id: d.id }))));
      dispatch(setTotal(meta['total-items']));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      dispatch(setError(err));
    });
});
