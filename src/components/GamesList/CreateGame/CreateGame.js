import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateGame.css';

const CreateGame = ({ onOpenCreateGameForm, isFormOpen }) => (
  <div className={styles.createGame}>
    <div
      data-test-id="create-game-button"
      display-if={!isFormOpen}
      className={styles.createGameButton}
      onClick={onOpenCreateGameForm}
    >
      + Create Game
    </div>
  </div>
);

CreateGame.propTypes = {
  onOpenCreateGameForm: PropTypes.func,
  isFormOpen: PropTypes.bool
};

export default CreateGame;
