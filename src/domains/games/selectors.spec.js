import selectors from './selectors';

describe('Games Selectors', () => {
  let state;
  let allGames;

  beforeEach(() => {
    allGames = [
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
    state = {
      games: {
        allGames
      }
    };
  });

  it('the allGames retrieves all the games in the state', () => {
    selectors.allGames(state).should.eql(allGames);
  });
});
