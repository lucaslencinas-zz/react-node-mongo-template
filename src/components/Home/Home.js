import React from 'react';
import PropTypes from 'prop-types';
import { GamesList, GameDescription, GameForm } from '~/components';
import styles from './Home.css';

const Home = ({
  games,
  isEditing,
  isCreating,
  selectedGame,
  onSelectGame,
  onDeleteGame,
  onEditGame,
  onCreateGame,
  onEnterCreateMode,
  onLeaveCreateMode,
  onEnterEditMode,
  onLeaveEditMode
}) => {
  const isFormOpen = isEditing || isCreating;
  let formProps;
  if (isEditing) {
    formProps = {
      game: selectedGame,
      actionName: 'Edit',
      onSubmit: onEditGame,
      onCancel: onLeaveEditMode
    };
  }

  if (isCreating) {
    formProps = {
      actionName: 'Create',
      onSubmit: onCreateGame,
      onCancel: onLeaveCreateMode
    };
  }
  return (
    <div className={styles.home}>
      <h1 className={styles.title}><div className={styles.arrowRight} />React Node Template</h1>
      <div className={styles.content}>
        <div className={styles.list}>
          <GamesList
            games={games}
            onSelectGame={onSelectGame}
            selectedGame={selectedGame}
            onDeleteGame={onDeleteGame}
            onOpenCreateGameForm={onEnterCreateMode}
            isFormOpen={isFormOpen}
          />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.game}>
            <GameDescription
              display-if={!isFormOpen}
              game={selectedGame}
              onOpenEditGameForm={onEnterEditMode}
            />
            <GameForm display-if={isFormOpen} {...formProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  isEditing: PropTypes.bool,
  isCreating: PropTypes.bool,
  selectedGame: PropTypes.object,
  onSelectGame: PropTypes.func,
  onDeleteGame: PropTypes.func,
  onEditGame: PropTypes.func,
  onCreateGame: PropTypes.func,
  onEnterCreateMode: PropTypes.func,
  onLeaveCreateMode: PropTypes.func,
  onEnterEditMode: PropTypes.func,
  onLeaveEditMode: PropTypes.func
};

export default Home;
