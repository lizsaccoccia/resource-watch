import { createAction, createThunkAction } from 'redux-actions';

export const openDropdown = createAction('OPEN_DROPDOWN');
export const closeDropdown = createAction('CLOSE_DROPDOWN');

export const asyncCloseDropdown = createThunkAction('ASYNC_CLOSE_DROPDOWN', payload => dispatch => {
  dispatch({type: 'ASYNC_CLOSE_DROPDOWN'});
  setTimeout(() => {
    dispatch(closeDropdown());
  }, 1000);
});
