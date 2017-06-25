import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GameForm from './GameForm';

describe('GameForm', () => {
  let gameForm;
  let game;
  let newGame;
  let actionName;
  let onSubmit;
  let onCancel;

  beforeEach(() => {
    onSubmit = sandbox.spy();
    onCancel = sandbox.spy();
  });

  context('when editing', () => {
    beforeEach(() => {
      actionName = 'Edit';
      game = {
        name: 'otherGame',
        slug: 'othergame',
        description: 'other description',
        link: 'otherGame.html',
        types: ['multiPlayer'],
        teamSizes: [1, 2, 4]
      };
      gameForm = shallow(
        <GameForm
          game={game}
          actionName={actionName}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />);
    });

    it('renders the title', () => {
      gameForm.find('h3').text().should.eql('Edit Game');
    });

    it('set the state with the game', () => {
      gameForm.state().should.eql(game);
    });

    it('renders all the input with the correct values', () => {
      gameForm.find('input').at(0).prop('value').should.eql(game.name);
      gameForm.find('input').at(1).prop('value').should.eql(game.description);
      gameForm.find('input').at(2).prop('value').should.eql(game.link);
      gameForm.find('input').at(3).prop('value').should.eql(game.teamSizes);
      gameForm.find('input').at(4).prop('value').should.eql(game.types);
    });

    it('renders all the buttons with the correct texts', () => {
      gameForm.find('button').at(0).text().should.eql('Cancel');
      gameForm.find('button').at(1).text().should.eql('Edit');
    });

    context('when having edited the fields', () => {
      beforeEach(() => {
        newGame = {
          name: 'newGame',
          slug: 'newgame',
          description: 'new description',
          link: 'newGame.html',
          types: ['multiPlayer'],
          teamSizes: [1, 2, 4]
        };
        gameForm.find('input').at(0).prop('onChange')({ target: { value: newGame.name } });
        gameForm.find('input').at(1).prop('onChange')({ target: { value: newGame.description } });
        gameForm.find('input').at(2).prop('onChange')({ target: { value: newGame.link } });
      });

      context('when clicking on the Edit Button', () => {
        beforeEach(() => {
          gameForm.find('button').at(1).simulate('click');
        });

        it('calls the onSubmit prop function with the correct param', () => {
          const params = {
            previousGame: { ...game, slug: 'othergame' },
            game: { ...newGame }
          };
          onSubmit.should.have.been.calledWith(params);
        });
      });
    });
  });

  context('when creating', () => {
    beforeEach(() => {
      actionName = 'Create';
      gameForm = shallow(
        <GameForm
          actionName={actionName}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />);
    });

    it('renders the title', () => {
      gameForm.find('h3').text().should.eql('Create Game');
    });

    it('set the state with the game', () => {
      gameForm.state().should.eql({});
    });

    it('renders all the input with the correct values', () => {
      expect(gameForm.find('input').at(0).prop('value')).to.eql(undefined);
      expect(gameForm.find('input').at(1).prop('value')).to.eql(undefined);
      expect(gameForm.find('input').at(2).prop('value')).to.eql(undefined);
      expect(gameForm.find('input').at(3).prop('value')).to.eql(undefined);
      expect(gameForm.find('input').at(4).prop('value')).to.eql(undefined);
    });

    it('renders all the buttons with the correct texts', () => {
      gameForm.find('button').at(0).text().should.eql('Cancel');
      gameForm.find('button').at(1).text().should.eql('Create');
    });

    context('when having edited the fields', () => {
      beforeEach(() => {
        newGame = {
          name: 'newGame',
          slug: 'newgame',
          description: 'new description',
          link: 'newGame.html',
          types: ['multiPlayer'],
          teamSizes: [1, 2, 4]
        };
        gameForm.find('input').at(0).prop('onChange')({ target: { value: newGame.name } });
        gameForm.find('input').at(1).prop('onChange')({ target: { value: newGame.description } });
        gameForm.find('input').at(2).prop('onChange')({ target: { value: newGame.link } });
        gameForm.find('input').at(3).prop('onChange')({ target: { value: newGame.teamSizes } });
        gameForm.find('input').at(4).prop('onChange')({ target: { value: newGame.types } });
      });

      context('when clicking on the Create Button', () => {
        beforeEach(() => {
          gameForm.find('button').at(1).simulate('click');
        });

        it('calls the onSubmit prop function with the correct param', () => {
          const params = {
            previousGame: { slug: '' },
            game: { ...newGame }
          };
          onSubmit.should.have.been.calledWith(params);
        });
      });
    });
  });
});
