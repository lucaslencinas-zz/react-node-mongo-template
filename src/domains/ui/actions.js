import actionTypes from './actionTypes';

export function selectGame(game) {
  return {
    type: actionTypes.SELECT_GAME,
    game
  };
}

export function enterCreateMode() {
  return {
    type: actionTypes.ENTER_CREATE_MODE
  };
}

export function leaveCreateMode() {
  return {
    type: actionTypes.LEAVE_CREATE_MODE
  };
}

export function enterEditMode() {
  return {
    type: actionTypes.ENTER_EDIT_MODE
  };
}

export function leaveEditMode() {
  return {
    type: actionTypes.LEAVE_EDIT_MODE
  };
}

export function setAlert(alert) {
  return {
    type: actionTypes.SET_ALERT,
    alert
  };
}
