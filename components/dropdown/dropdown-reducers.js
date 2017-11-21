import * as actions from './dropdown-actions';

export default {
  [actions.openDropdown]: (state, action) => ({ ...state, open: true }),
  [actions.closeDropdown]: (state, action) => ({ ...state, open: false })
}
