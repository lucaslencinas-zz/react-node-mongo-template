import selectors from './selectors';

describe('Games Selectors', () => {
  let state;
  let isCreating;
  let isEditing;
  let selectedGame;

  beforeEach(() => {
    isCreating = true;
    isEditing = true;
    selectedGame = {
      name: 'someGame',
      slug: 'somegame',
      description: 'some description',
      link: 'someGame.html',
      types: ['singlePlayer', 'multiPlayer'],
      teamSizes: [1, 2, 4]
    };

    state = {
      ui: {
        isCreating,
        isEditing,
        selectedGame
      }
    };
  });

  it('the isCreating selector retrieves the vlue of the variable isCreating', () => {
    selectors.isCreating(state).should.eql(isCreating);
  });

  it('the isEditing selector retrieves the vlue of the variable isEditing', () => {
    selectors.isEditing(state).should.eql(isEditing);
  });

  it('the selectedGame selector retrieves the vlue of the variable selectedGame', () => {
    selectors.selectedGame(state).should.eql(selectedGame);
  });
});
