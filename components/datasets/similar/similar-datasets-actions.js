import 'isomorphic-fetch';
import { createAction, createThunkAction } from 'redux-actions';

// Widget actions
export const setSimilarList = createAction('SIMILAR_DATASETS_GET');
export const setSimilarLoading = createAction('SIMILAR_DATASETS_LOADING');
export const setSimilarError = createAction('SIMILAR_DATASETS_ERROR');

// Async actions
export const fetchSimilarDatasets = createThunkAction('SIMILAR_DATASETS_FETCH_DATA', (payload = {}) => (dispatch) => {
  dispatch(setSimilarLoading(true));
  dispatch(setSimilarError(null));

  // const endpoint = payload.ancestor ? 'similar-dataset-including-descendent' : 'similar-dataset';

  return fetch(`${process.env.WRI_API_URL}/graph/query/similar-dataset/${payload.id}?published=true&env=${process.env.API_ENV}&application=${[process.env.APPLICATIONS]}&limit=6`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(({ data }) => {
      const ids = data.map(d => d.dataset);
      return fetch(`${process.env.WRI_API_URL}/dataset/?ids=${ids}&includes=widget,metadata,layer,vocabulary&application=${process.env.APPLICATIONS}&page[size]=6`);
    })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(({ data }) => {
      dispatch(setSimilarLoading(false));
      dispatch(setSimilarError(null));
      dispatch(setSimilarList(data));
    })
    .catch((err) => {
      dispatch(setSimilarLoading(false));
      dispatch(setSimilarError(err));
    });
});
