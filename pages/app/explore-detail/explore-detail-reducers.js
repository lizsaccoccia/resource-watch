import * as actions from './explore-detail-actions';

export default {
  //
  // DATASET
  //
  [actions.setDataset]: (state, action) =>
    ({ ...state, data: action.payload }),

  [actions.setDatasetLoading]: (state, action) =>
    ({ ...state, loading: action.payload }),

  [actions.setDatasetError]: (state, action) =>
    ({ ...state, error: action.payload }),


  //
  // PARTNER
  //
  [actions.setPartner]: (state, action) => {
    const partner = {
      ...state.partner,
      data: action.payload
    };

    return ({ ...state, partner });
  },
  [actions.setPartnerLoading]: (state, action) => {
    const partner = {
      ...state.partner,
      loading: action.payload
    };

    return ({ ...state, partner });
  },
  [actions.setPartnerError]: (state, action) => {
    const partner = {
      ...state.partner,
      loading: action.payload
    };

    return ({ ...state, partner });
  },


  //
  // TOOLS
  //
  [actions.setTools]: (state, action) => {
    const tools = {
      ...state.tools,
      list: action.payload
    };

    return ({ ...state, tools });
  },
  [actions.setActiveTools]: (state, action) => {
    const tools = {
      ...state.tools,
      active: action.payload
    };

    return ({ ...state, tools });
  },
  [actions.setToolsLoading]: (state, action) => {
    const tools = {
      ...state.tools,
      loading: action.payload
    };

    return ({ ...state, tools });
  },
  [actions.setToolsError]: (state, action) => {
    const tools = {
      ...state.tools,
      loading: action.payload
    };

    return ({ ...state, tools });
  },


  //
  // TAGS
  //
  [actions.setTags]: (state, action) => {
    const tags = {
      ...state.tags,
      list: action.payload
    };

    return ({ ...state, tags });
  },
  [actions.setActiveTags]: (state, action) => {
    const tags = {
      ...state.tags,
      active: action.payload
    };

    return ({ ...state, tags });
  },
  [actions.setTagsLoading]: (state, action) => {
    const tags = {
      ...state.tags,
      loading: action.payload
    };

    return ({ ...state, tags });
  },
  [actions.setTagsError]: (state, action) => {
    const tags = {
      ...state.tags,
      loading: action.payload
    };

    return ({ ...state, tags });
  },


  // COUNT VIEW
  [actions.setCountView]: state => state


};
