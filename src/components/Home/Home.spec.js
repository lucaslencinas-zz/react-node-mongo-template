import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  let games;
  let home;
  let selectedGame;
  let onSelectGame;
  let onDeleteGame;
  let onEditGame;
  let onCreateGame;
  let onEnterCreateMode;
  let onLeaveCreateMode;
  let onEnterEditMode;
  let onLeaveEditMode;

  beforeEach(() => {
    onDeleteGame = sandbox.spy();
    onSelectGame = sandbox.spy();
    onEditGame = sandbox.spy();
    onCreateGame = sandbox.spy();
    onEnterCreateMode = sandbox.spy();
    onLeaveCreateMode = sandbox.spy();
    onEnterEditMode = sandbox.spy();
    onLeaveEditMode = sandbox.spy();
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
    selectedGame = games[1];
  });

  context('when the user is not editing or creating a game', () => {
    beforeEach(() => {
      home = shallow(
        <Home
          games={games}
          selectedGame={selectedGame}
          onDeleteGame={onDeleteGame}
          onSelectGame={onSelectGame}
          onEditGame={onEditGame}
          onCreateGame={onCreateGame}
          onEnterCreateMode={onEnterCreateMode}
          onLeaveCreateMode={onLeaveCreateMode}
          onEnterEditMode={onEnterEditMode}
          onLeaveEditMode={onLeaveEditMode}
          isCreating={false}
          isEditing={false}
        />
      );
    });

    it('renders the title', () => {
      home.find('h1').text().should.eql('React Node Template');
    });

    it('renders the GamesList component with the correct params', () => {
      const gamesList = home.find('GamesList');
      gamesList.prop('games').should.eql(games);
      gamesList.prop('onSelectGame').should.eql(onSelectGame);
      gamesList.prop('selectedGame').should.eql(selectedGame);
      gamesList.prop('onDeleteGame').should.eql(onDeleteGame);
      gamesList.prop('onOpenCreateGameForm').should.eql(onEnterCreateMode);
      gamesList.prop('isFormOpen').should.eql(false);
    });

    it('renders the GameDescription component with the correct params', () => {
      const gameDescription = home.find('GameDescription');
      gameDescription.prop('game').should.eql(selectedGame);
      gameDescription.prop('onOpenEditGameForm').should.eql(onEnterEditMode);
    });

    it('does not render the GameForm', () => {
      home.find('GamesForm').exists().should.eql(false);
    });
  });

  context('when the user is editing a game', () => {
    beforeEach(() => {
      home = shallow(
        <Home
          games={games}
          onDeleteGame={onDeleteGame}
          selectedGame={selectedGame}
          onSelectGame={onSelectGame}
          onEditGame={onEditGame}
          onCreateGame={onCreateGame}
          onEnterCreateMode={onEnterCreateMode}
          onLeaveCreateMode={onLeaveCreateMode}
          onEnterEditMode={onEnterEditMode}
          onLeaveEditMode={onLeaveEditMode}
          isEditing
        />
      );
    });

    it('renders the GamesList component with isFormOpen prop in true', () => {
      const gamesList = home.find('GamesList');
      gamesList.prop('isFormOpen').should.eql(true);
    });

    it('does not render the GameDescription component', () => {
      home.find('GamesDescription').exists().should.eql(false);
    });

    it('does not render the GameForm with the correct params', () => {
      const gameForm = home.find('GameForm');
      gameForm.prop('game').should.eql(selectedGame);
      gameForm.prop('actionName').should.eql('Edit');
      gameForm.prop('onSubmit').should.eql(onEditGame);
      gameForm.prop('onCancel').should.eql(onLeaveEditMode);
    });
  });

  context('when the user is creating a game', () => {
    beforeEach(() => {
      home = shallow(
        <Home
          games={games}
          onDeleteGame={onDeleteGame}
          onSelectGame={onSelectGame}
          onEditGame={onEditGame}
          onCreateGame={onCreateGame}
          onEnterCreateMode={onEnterCreateMode}
          onLeaveCreateMode={onLeaveCreateMode}
          onEnterEditMode={onEnterEditMode}
          onLeaveEditMode={onLeaveEditMode}
          isCreating
        />
      );
    });

    it('renders the GamesList component with isFormOpen prop in true', () => {
      const gamesList = home.find('GamesList');
      gamesList.prop('isFormOpen').should.eql(true);
    });

    it('does not render the GameDescription component', () => {
      home.find('GamesDescription').exists().should.eql(false);
    });

    it('renders the GameForm with the correct params', () => {
      const gameForm = home.find('GameForm');
      gameForm.prop('actionName').should.eql('Create');
      gameForm.prop('onSubmit').should.eql(onCreateGame);
      gameForm.prop('onCancel').should.eql(onLeaveCreateMode);
    });
  });
});
