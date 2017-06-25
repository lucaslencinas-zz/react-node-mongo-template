import actionTypes from './actionTypes';

const initialState = {
  allGames: []
};

export default function reducers(state = initialState, action) {
  let allGames;
  let game;
  let newGame;
  let updatedGame;
  let previousSlugGame;
  let gameIndex;
  let newGames;

  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return {
        ...state,
        allGames: action.games
      };

    case actionTypes.DELETE_GAME:
      game = action.game;
      allGames = state.allGames.filter((gameInState) => gameInState.slug !== game.slug);

      return {
        ...state,
        allGames
      };

    case actionTypes.CREATE_GAME:
      newGame = action.game;

      return {
        ...state,
        allGames: state.allGames.concat([newGame])
      };

    case actionTypes.EDIT_GAME:
      updatedGame = action.game;
      previousSlugGame = action.previousGame.slug;
      gameIndex = state.allGames.findIndex((g) => g.slug === previousSlugGame);
      newGames = state.allGames.slice();
      newGames[gameIndex] = updatedGame;
      return {
        ...state,
        allGames: newGames
      };

    default:
      return state;
  }
}
