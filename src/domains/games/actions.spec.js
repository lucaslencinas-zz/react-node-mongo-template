import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import * as gameService from '~/services/gameService';
import { thunk } from '~/store/configureStore';
import UIactionTypes from '~/domains/ui/actionTypes';
import * as actions from './actions';
import actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Games actions', () => {
  let games;
  let game;
  let store;
  let initialState;
  let expectedActions;

  beforeEach(() => {
    games = [
      {
        name: 'someGame',
        slug: 'somegame',
        description: 'some description',
        link: 'someGame.html',
        types: ['singlePlayer', 'multiPlayer'],
        teamSizes: [1, 2, 4]
      },
      {
        name: 'otherGame',
        slug: 'othergame',
        description: 'other description',
        link: 'otherGame.html',
        types: ['multiPlayer'],
        teamSizes: [1, 2, 4]
      }
    ];
    initialState = {
      allGames: []
    };
  });

  describe('fetchGames()', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    context('when the games are retrieved successfully', () => {
      beforeEach(() => {
        expectedActions = [{ type: actionTypes.FETCH_GAMES, games }];

        sandbox.stub(gameService, 'getGames', () => Promise.resolve(games));
        return store.dispatch(actions.fetchGames());
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });

  describe('deleteGame()', () => {
    beforeEach(() => {
      initialState.allGames = games;
      store = mockStore(initialState);
    });

    context('when the game is deleted successfully', () => {
      beforeEach(() => {
        expectedActions = [
          { type: actionTypes.DELETE_GAME, game: games[0] },
          { type: UIactionTypes.SELECT_GAME, game: undefined }
        ];

        sandbox.stub(gameService, 'deleteGame', () => Promise.resolve());
        return store.dispatch(actions.deleteGame(games[0]));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });

  describe('createGame()', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    context('when the game is created successfully', () => {
      beforeEach(() => {
        expectedActions = [
          { type: actionTypes.CREATE_GAME, game: games[0] },
          { type: UIactionTypes.SELECT_GAME, game: games[0] }
        ];

        sandbox.stub(gameService, 'createGame', () => Promise.resolve({ game: games[0] }));
        return store.dispatch(actions.createGame({ game: games[0] }));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });

  describe('editGame()', () => {
    beforeEach(() => {
      initialState.allGames = games;
      game = {
        name: 'newGame',
        slug: 'newgame',
        description: 'new description',
        link: 'newGame.html',
        types: ['singlePlayer', 'multiPlayer'],
        teamSizes: [1, 2, 4]
      };
      store = mockStore(initialState);
    });

    context('when the game is edited successfully', () => {
      beforeEach(() => {
        expectedActions = [
          { type: actionTypes.EDIT_GAME, game, previousGame: games[0] },
          { type: UIactionTypes.SELECT_GAME, game }
        ];

        sandbox.stub(gameService, 'updateGame', () => Promise.resolve());
        return store.dispatch(actions.editGame({ game, previousGame: games[0] }));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });
});
