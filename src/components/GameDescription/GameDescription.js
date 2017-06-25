import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameDescription.css';

const GameDescription = ({
  game,
  onOpenEditGameForm
}) => {
  const renderGameContent = () => (
    <div data-test-id="game-description-content">
      <h3>{game.name}<span onClick={onOpenEditGameForm}>Edit</span></h3>
      <div data-test-id="fields" className={styles.fields}>
        <div data-test-id="fields-description" className={styles.fieldset}>
          <div>Description: </div>
          <div>{game.description}</div>
        </div>
        <div data-test-id="fields-link" className={styles.fieldset}>
          <div>Link: </div>
          <div>{game.link}</div>
        </div>
        <div data-test-id="fields-types" className={styles.fieldset}>
          <div>Types: </div>
          <div>{game.types}</div>
        </div>
        <div data-test-id="fields-team-sizes" className={styles.fieldset}>
          <div>Team Sizes: </div>
          <div>{game.teamSizes}</div>
        </div>
      </div>
    </div>
  );

  const renderEmptyContent = () => (
    <div data-test-id="game-description-empty-content" className={styles.emptyContent}>
      <div>
        Select a Game
      </div>
    </div>
  );
  return (
    <div data-test-id="game-description" className={styles.gameDescription}>
      {game ? renderGameContent() : renderEmptyContent()}
    </div>
  );
};

GameDescription.propTypes = {
  game: PropTypes.object,
  onOpenEditGameForm: PropTypes.func
};

export default GameDescription;
