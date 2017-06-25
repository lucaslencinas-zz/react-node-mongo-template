import config from 'config';
import { format } from 'url';
import 'whatwg-fetch';

export function getGames() {
  const url = format({
    ...config.api,
    pathname: `${config.api.pathname}/games`
  });

  return fetch(url)
    .then(checkStatus)
    .then((response) => response.json());
}

export function deleteGame(game) {
  const url = format({
    ...config.api,
    pathname: `${config.api.pathname}/games/${game.slug}`
  });

  return fetch(url, { method: 'DELETE' })
    .then(checkStatus)
    .then(() => game);
}

export function createGame({ game }) {
  const url = format({
    ...config.api,
    pathname: `${config.api.pathname}/games`
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })
  .then(checkStatus)
  .then(() => game);
}

export function updateGame({ game, previousGame }) {
  const url = format({
    ...config.api,
    pathname: `${config.api.pathname}/games/${previousGame.slug}`
  });

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })
  .then(checkStatus)
  .then(() => ({ game, previousGame }));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
