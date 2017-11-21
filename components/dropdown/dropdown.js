import { connect } from 'react-redux';

import Dropdown from './dropdown-component';
import * as actions from './dropdown-actions';
import reducers from './dropdown-reducers';
import initialState from './dropdown-initial-state';

// Manadatory
export {
  actions, reducers, initialState
};

export default connect(
  state => state.dropdown,
  actions
)(Dropdown);
