const database = require('../db');

function get(game, fields) {
  return database.find(game, fields, 'games');
}

function getAll(fields) {
  return database.search({}, fields, 'games');
}

function post(game) {
  return database.insert(game, 'games');
}

function remove(game) {
  return database.remove(game, 'games');
}

function update(game, newGame) {
  return database.update(game, newGame, 'games');
}

module.exports = {
  get,
  getAll,
  post,
  remove,
  update
};
