import React from 'react';
import { shallow } from 'enzyme';
import CreateGame from './CreateGame';

describe('CreateGame', () => {
  let onOpenCreateGameForm;
  let createGame;

  beforeEach(() => {
    onOpenCreateGameForm = sandbox.spy();
  });

  context('when the form is open', () => {
    beforeEach(() => {
      createGame = shallow(<CreateGame onOpenCreateGameForm={onOpenCreateGameForm} isFormOpen />);
    });

    it('should be rendered', () => (
      createGame.should.exist
    ));

    it('does not render the Create Game button', () => {
      createGame.find('[data-test-id="create-game-button"]').exists().should.eql(false);
    });
  });

  context('when the form is NOT open', () => {
    beforeEach(() => {
      createGame = shallow(<CreateGame onOpenCreateGameForm={onOpenCreateGameForm} />);
    });

    it('renders the Create Game button', () => {
      createGame.find('[data-test-id="create-game-button"]').exists().should.eql(true);
    });

    context('when clicking on the Create Game button', () => {
      beforeEach(() => {
        createGame.find('[data-test-id="create-game-button"]').simulate('click');
      });

      it('calls the onOpenCreateGameForm function', () => (
        onOpenCreateGameForm.should.have.been.called
      ));
    });
  });
});
