import { applyMiddleware, createStore } from 'redux';
import { dispatchError } from '~/utils/errors';
import { reducers } from '~/domains';

export const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    const promise = action(dispatch, getState);

    if (promise.catch) {
      promise.catch((error) => dispatchError({ dispatch, error }));
    }

    return promise;
  }

  return next(action);
};

export default function configureStore(initialState) {
  const middlewares = [thunk];
  const middleware = applyMiddleware(...middlewares);
  const enhancers = getEnhancers(middleware);
  const store = createStore(reducers, initialState, enhancers);
  return store;
}

function getEnhancers(middleware) {
  // eslint-disable-next-line global-require
  const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;
  return composeWithDevTools(middleware);
}
