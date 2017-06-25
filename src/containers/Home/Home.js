import { connect } from 'react-redux';
import { Home } from '~/components';
import async from '~/containers/async';
import {
  actions,
  selectors
} from '~/domains';

const homeState = (state) => ({
  games: selectors.allGames(state),
  selectedGame: selectors.selectedGame(state),
  isCreating: selectors.isCreating(state),
  isEditing: selectors.isEditing(state)
});

const homeAction = (dispatch) => ({
  onSelectGame: (payload) => {
    dispatch(actions.selectGame(payload));
    dispatch(actions.leaveCreateMode());
    dispatch(actions.leaveEditMode());
  },
  onDeleteGame: (payload) => dispatch(actions.deleteGame(payload)),
  onEditGame: (payload) => {
    dispatch(actions.editGame(payload));
    dispatch(actions.leaveEditMode());
  },
  onCreateGame: (payload) => {
    dispatch(actions.createGame(payload));
    dispatch(actions.leaveCreateMode());
  },
  onEnterCreateMode: () => dispatch(actions.enterCreateMode()),
  onLeaveCreateMode: () => dispatch(actions.leaveCreateMode()),
  onEnterEditMode: () => dispatch(actions.enterEditMode()),
  onLeaveEditMode: () => dispatch(actions.leaveEditMode())
});

const resolve = ({ dispatch }) => dispatch(actions.fetchGames());

export default async(resolve)(connect(homeState, homeAction)(Home));
