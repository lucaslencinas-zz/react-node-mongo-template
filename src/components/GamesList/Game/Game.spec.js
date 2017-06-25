import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

describe('Game', () => {
  let game;
  let gameComponent;
  let onSelectGame;
  let onDeleteGame;

  beforeEach(() => {
    onDeleteGame = sandbox.spy();
    onSelectGame = sandbox.spy();
    game = {
      name: 'someGame',
      description: 'some description',
      link: 'someGame.html',
      types: ['singlePlayer', 'multiPlayer'],
      teamSizes: [1, 2, 4]
    };
    gameComponent = shallow(<Game game={game} onDeleteGame={onDeleteGame} onSelectGame={onSelectGame} />);
  });

  it('should be rendered', () => (
    gameComponent.should.exist
  ));

  it('renders the name of the game', () => {
    gameComponent.find('[data-test-id="game-name"]').text().should.eql('someGame');
  });

  context('when clicking on the game name', () => {
    beforeEach(() => {
      gameComponent.find('[data-test-id="game-name"]').simulate('click');
    });

    it('calls the onSelectGame with the game param', () => {
      onSelectGame.should.have.been.calledWith(game);
    });
  });

  context('when clicking on the game delete', () => {
    beforeEach(() => {
      gameComponent.find('[data-test-id="game-delete"]').simulate('click');
    });

    it('calls the onDeleteGame with the game param', () => {
      onDeleteGame.should.have.been.calledWith(game);
    });
  });
});
