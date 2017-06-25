import * as gameService from '~/services/gameService';
import * as uiActions from '~/domains/ui/actions';
import actionTypes from './actionTypes';

function fetchGamesSuccess(games) {
  return {
    type: actionTypes.FETCH_GAMES,
    games
  };
}

function deleteGameSuccess(game) {
  return {
    type: actionTypes.DELETE_GAME,
    game
  };
}

function createGameSuccess(game) {
  return {
    type: actionTypes.CREATE_GAME,
    game
  };
}

function editGameSuccess({ game, previousGame }) {
  return {
    type: actionTypes.EDIT_GAME,
    game,
    previousGame
  };
}

export function fetchGames() {
  return (dispatch) => (
    gameService.getGames()
      .then(((games) => dispatch(fetchGamesSuccess(games))))
  );
}

export function deleteGame(game) {
  return (dispatch) => (
    gameService.deleteGame(game)
      .then((() => {
        dispatch(deleteGameSuccess(game));
        dispatch(uiActions.selectGame(undefined));
      }))
  );
}

export function createGame({ game }) {
  return (dispatch) => (
    gameService.createGame({ game })
      .then((() => {
        dispatch(createGameSuccess(game));
        dispatch(uiActions.selectGame(game));
      }))
  );
}

export function editGame({ game, previousGame }) {
  return (dispatch) => (
    gameService.updateGame({ game, previousGame })
      .then((() => {
        dispatch(editGameSuccess({ game, previousGame }));
        dispatch(uiActions.selectGame(game));
      }))
  );
}
