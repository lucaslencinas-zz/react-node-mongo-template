const gameService = require('../services/gameService');

function get(req, res) {
  const game = {
    slug: req.params.slug
  };
  const fields = req.query.fields && !Array.isArray(req.query.fields) ?
    [req.query.fields] :
    req.query.fields;

  return gameService.get(game, fields)
    .then((wantedGame) => res.status(200).json(wantedGame));
}

function getAll(req, res) {
  const fields = req.query.fields && !Array.isArray(req.query.fields) ? [req.query.fields] : req.query.fields;
  return gameService.getAll(fields)
    .then((games) => res.status(200).json(games));
}

function post(req, res) {
  const game = {
    slug: req.body.slug,
    name: req.body.name,
    description: req.body.description || 'No description',
    link: req.body.link || '',
    types: req.body.types || [],
    teamSizes: req.body.teamSizes || []
  };

  return gameService.post(game)
    .then((createdGame) => res.status(201).json(createdGame));
}

function remove(req, res) {
  const game = {
    slug: req.params.slug
  };

  return gameService.remove(game)
    .then(() => res.status(204).send());
}

function update(req, res) {
  const game = {
    slug: req.params.slug
  };
  const newGame = req.body;

  return gameService.update(game, newGame)
    .then(() => res.status(204).send());
}

module.exports = {
  get,
  getAll,
  post,
  remove,
  update
};
