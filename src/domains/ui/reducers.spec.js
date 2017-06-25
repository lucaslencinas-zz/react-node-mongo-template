import reducers from './reducers';
import types from './actionTypes';

describe('UI reducers', () => {
  let state;
  let action;
  let result;

  context('when the state is empty', () => {
    beforeEach(() => {
      state = {};
    });

    context('and no action is triggered', () => {
      before(() => {
        action = {};
        result = reducers(state, action);
      });

      it('returns the initial state', () => (
        result.should.be.deep.equal(state)
      ));
    });

    context('and the SELECT_GAME action is triggered', () => {
      let game;
      before(() => {
        game = {
          name: 'someGame',
          slug: 'somegame',
          description: 'some description',
          link: 'someGame.html',
          types: ['singlePlayer', 'multiPlayer'],
          teamSizes: [1, 2, 4]
        };
        action = {
          type: types.SELECT_GAME,
          game
        };
        result = reducers(state, action);
      });

      it('sets the selectedGame with the game', () => {
        result.selectedGame.should.be.deep.equal(game);
      });
    });

    context('and the ENTER_CREATE_MODE action is triggered', () => {
      before(() => {
        action = { type: types.ENTER_CREATE_MODE };
        result = reducers(state, action);
      });

      it('sets the isCreating variable to true', () => {
        result.isCreating.should.be.deep.equal(true);
      });
    });

    context('and the LEAVE_CREATE_MODE action is triggered', () => {
      before(() => {
        action = { type: types.LEAVE_CREATE_MODE };
        result = reducers(state, action);
      });

      it('sets the isCreating variable to false', () => {
        result.isCreating.should.be.deep.equal(false);
      });
    });

    context('and the ENTER_EDIT_MODE action is triggered', () => {
      before(() => {
        action = { type: types.ENTER_EDIT_MODE };
        result = reducers(state, action);
      });

      it('sets the isEditing variable to true', () => {
        result.isEditing.should.be.deep.equal(true);
      });
    });

    context('and the LEAVE_EDIT_MODE action is triggered', () => {
      before(() => {
        action = { type: types.LEAVE_EDIT_MODE };
        result = reducers(state, action);
      });

      it('sets the isEditing variable to false', () => {
        result.isEditing.should.be.deep.equal(false);
      });
    });
  });
});
