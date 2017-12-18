import * as actions from './similar-datasets-actions';

export default {
  [actions.setSimilarList]: (state, action) =>
    ({ ...state, list: action.payload }),

  [actions.setSimilarLoading]: (state, action) =>
    ({ ...state, loading: action.payload }),

  [actions.setSimilarError]: (state, action) =>
    ({ ...state, error: action.payload })
};
