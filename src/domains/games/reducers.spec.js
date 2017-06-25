import reducers from './reducers';
import types from './actionTypes';

describe('Games reducers', () => {
  let state;
  let action;
  let result;

  context('when the state is empty', () => {
    beforeEach(() => {
      state = { allGames: [] };
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

    context('and the FETCH_GAMES action is triggered', () => {
      let games;
      before(() => {
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
        action = {
          type: types.FETCH_GAMES,
          games
        };
        result = reducers(state, action);
      });

      it('sets the allGames', () => {
        result.allGames.should.be.deep.equal(games);
      });
    });
  });

  context('when the state is not empty', () => {
    let initialGames;
    beforeEach(() => {
      initialGames = [
        {
          name: 'someGame',
          slug: 'somegame',
          description: 'some description',
          link: 'someGame.html',
          types: ['singlePlayer', 'multiPlayer'],
          teamSizes: [1, 2, 4]
        }
      ];
      state = { allGames: initialGames };
    });

    context('and the FETCH_GAMES action is triggered', () => {
      let games;
      before(() => {
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
        action = {
          type: types.FETCH_GAMES,
          games
        };
        result = reducers(state, action);
      });

      it('sets the allGames', () => {
        result.allGames.should.be.deep.equal(games);
      });
    });

    context('and the DELETE_GAME action is triggered', () => {
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
          type: types.DELETE_GAME,
          game
        };
        result = reducers(state, action);
      });

      it('updates the allGames', () => {
        result.allGames.should.be.deep.equal([]);
      });
    });

    context('and the CREATE_GAME action is triggered', () => {
      let game;
      before(() => {
        game = {
          name: 'otherGame',
          slug: 'othergame',
          description: 'other description',
          link: 'otherGame.html',
          types: ['multiPlayer'],
          teamSizes: [1, 2, 4]
        };
        action = {
          type: types.CREATE_GAME,
          game
        };
        result = reducers(state, action);
      });

      it('add the game to the allGames array', () => {
        result.allGames.should.be.deep.equal(initialGames.concat([game]));
      });
    });

    context('and the EDIT_GAME action is triggered', () => {
      let game;
      let previousGame;
      before(() => {
        previousGame = initialGames[0];
        game = {
          name: 'otherGame',
          slug: 'othergame',
          description: 'other description',
          link: 'otherGame.html',
          types: ['multiPlayer'],
          teamSizes: [1, 2, 4]
        };
        action = {
          type: types.EDIT_GAME,
          game,
          previousGame
        };
        result = reducers(state, action);
      });

      it('updates the allGames with the modified game', () => {
        result.allGames.should.be.deep.equal([game]);
      });
    });
  });
});
