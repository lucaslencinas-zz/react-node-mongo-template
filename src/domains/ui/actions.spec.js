import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';
import * as actions from './actions';
import actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Games actions', () => {
  let alert;
  let game;
  let store;
  let initialState;
  let expectedActions;

  beforeEach(() => {
    game = {
      name: 'someGame',
      slug: 'somegame',
      description: 'some description',
      link: 'someGame.html',
      types: ['singlePlayer', 'multiPlayer'],
      teamSizes: [1, 2, 4]
    };
    initialState = {
      allGames: []
    };
  });

  describe('selectGame()', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    context('when the games is selected successfully', () => {
      beforeEach(() => {
        expectedActions = [{ type: actionTypes.SELECT_GAME, game }];
        return store.dispatch(actions.selectGame(game));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });

  describe('setAlert()', () => {
    beforeEach(() => {
      initialState = { allGames: [] };
      store = mockStore(initialState);
      alert = {
        type: 'error',
        message: 'some error message'
      };
    });

    context('when the alert is set', () => {
      beforeEach(() => {
        expectedActions = [{ type: actionTypes.SET_ALERT, alert }];
        return store.dispatch(actions.setAlert(alert));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });
});
