
import actionTypes from './actionTypes';

const initialState = {};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_GAME:
      return {
        ...state,
        selectedGame: action.game
      };

    case actionTypes.ENTER_CREATE_MODE:
      return {
        ...state,
        isCreating: true
      };

    case actionTypes.LEAVE_CREATE_MODE:
      return {
        ...state,
        isCreating: false
      };

    case actionTypes.ENTER_EDIT_MODE:
      return {
        ...state,
        isEditing: true
      };

    case actionTypes.LEAVE_EDIT_MODE:
      return {
        ...state,
        isEditing: false
      };

    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.alert
      };

    default:
      return state;
  }
}
