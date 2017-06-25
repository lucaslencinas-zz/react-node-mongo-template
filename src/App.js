import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import RouterContext from 'react-router/lib/RouterContext';
import { Home } from '~/containers';
import { configureStore } from './store';

/* eslint-disable react/prop-types */
const asyncRender = (props) => (<RouterContext {...props} />);

const render = (props) => (<ReduxAsyncConnect {...props} render={asyncRender} />);

const App = ({ initialState = {} }) => {
  const store = configureStore(initialState);
  return (
    <Provider store={store} key="provider" ref={(rootInstance) => initHotLoader(rootInstance)}>
      <Router history={browserHistory} render={render} >
        <Route path="/*" component={Home} />
      </Router>
    </Provider>
  );
};

function initHotLoader(rootInstance) {
  if (module.hot) {
    /* eslint-disable global-require */
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
      getRootInstances() {
        // Help React Hot Loader figure out the root component instances on the page:
        return [rootInstance];
      }
    });
  }
  /* eslint-enable global-require */
}

App.propTypes = {
  initialState: PropTypes.object
};
export default App;
