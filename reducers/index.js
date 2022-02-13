import { combineReducers } from 'redux';

import { LOAD_ALL_BOOKING } from '../actions';

function allBooking(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_ALL_BOOKING:
      newState.allBooking = action.allBooking;
      return newState;
    default:
      return state;
  }
}

  export default combineReducers({
    allBooking,
  })