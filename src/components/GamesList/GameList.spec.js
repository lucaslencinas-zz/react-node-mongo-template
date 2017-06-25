import React from 'react';
import { shallow } from 'enzyme';
import GamesList from './GamesList';

describe('GamesList', () => {
  let games;
  let gamesList;
  let selectedGame;
  let onSelectGame;
  let onDeleteGame;
  let onOpenCreateGameForm;
  let isFormOpen;

  beforeEach(() => {
    onDeleteGame = sandbox.spy();
    onSelectGame = sandbox.spy();
    onOpenCreateGameForm = sandbox.spy();
    isFormOpen = true;
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
    selectedGame = games[0];
    gamesList = shallow(
      <GamesList
        games={games}
        onDeleteGame={onDeleteGame}
        onSelectGame={onSelectGame}
        onOpenCreateGameForm={onOpenCreateGameForm}
        selectedGame={selectedGame}
        isFormOpen={isFormOpen}
      />);
  });

  it('should be rendered', () => (
    gamesList.should.exist
  ));

  it('renders the title', () => {
    gamesList.find('h3').text().should.eql('Games');
  });

  it('renders the games components', () => {
    gamesList.find('Game').length.should.eql(2);
  });

  describe('each game component', () => {
    let gamesComponent;

    beforeEach(() => {
      gamesComponent = gamesList.find('Game');
    });

    it('renders the first Game component with the correct props', () => {
      gamesComponent.at(0).prop('game').should.eql(games[0]);
      gamesComponent.at(0).prop('isSelected').should.eql(true);
      gamesComponent.at(0).prop('onSelectGame').should.eql(onSelectGame);
      gamesComponent.at(0).prop('onDeleteGame').should.eql(onDeleteGame);
    });

    it('renders the second Game component with the correct props', () => {
      gamesComponent.at(1).prop('game').should.eql(games[1]);
      gamesComponent.at(1).prop('isSelected').should.eql(false);
      gamesComponent.at(1).prop('onSelectGame').should.eql(onSelectGame);
      gamesComponent.at(1).prop('onDeleteGame').should.eql(onDeleteGame);
    });
  });

  it('renders the CreateGame component', () => {
    gamesList.find('CreateGame').exists().should.eql(true);
    gamesList.find('CreateGame').prop('onOpenCreateGameForm').should.eql(onOpenCreateGameForm);
    gamesList.find('CreateGame').prop('isFormOpen').should.eql(isFormOpen);
  });
});
