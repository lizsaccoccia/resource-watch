import initOpbeat from 'opbeat-react';
import { createOpbeatMiddleware } from 'opbeat-react/redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from 'redactions';

// New modules
import { handleModule } from 'redux-actions';
import * as search from 'components/app/layout/search/search';
import * as similarDatasets from 'components/datasets/similar/similar-datasets';
import * as dashboardDetail from 'components/dashboards/detail/dashboard-detail';
import * as dashboardThumbnailList from 'components/dashboards/thumbnail-list/dashboard-thumbnail-list';
import * as widgetBlockModule from 'components/dashboards/wysiwyg/widget-block/widget-block';
import * as widgetBlockEditionModule from 'components/dashboards/wysiwyg/widget-block-edition/widget-block-edition';
import { reducers as widgetEditorReducers, setConfig } from 'widget-editor';

if (process.env.NODE_ENV === 'production') {
  initOpbeat({
    orgId: '17ab8eb501d2418a81f3167c10407e90',
    appId: '7170680c2a'
  });
}

// REDUCERS
const reducer = combineReducers({
  ...reducers,
  ...widgetEditorReducers,
  search: handleModule(search),

  // Datasets
  similarDatasets: handleModule(similarDatasets),

  // Dashboards
  dashboardDetail: handleModule(dashboardDetail),
  dashboardThumbnailList: handleModule(dashboardThumbnailList),
  widgetBlock: handleModule(widgetBlockModule),
  widgetBlockEdition: handleModule(widgetBlockEditionModule)
});

export const initStore = (initialState = {}) => createStore(
  reducer,
  initialState,
  composeWithDevTools(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(thunk, createOpbeatMiddleware())
  )
);

// Change the configuration according to your needs
setConfig({
  url: process.env.WRI_API_URL,
  env: process.env.API_ENV,
  applications: process.env.APPLICATIONS,
  authUrl: process.env.CALLBACK_URL,
  assetsPath: '/static/images/'
});
