import * as uiActions from '~/domains/ui/actions';

export function dispatchError({ dispatch, error }) {
  // eslint-disable-next-line no-console
  console.error(error);
  const alert = {
    type: 'error',
    message: error.message
  };

  return dispatch(uiActions.setAlert(alert));
}
