const express = require('express');
const bodyParser = require('body-parser');
const gameController = require('../controllers/gameController');

export function api() {
  // eslint-disable-next-line new-cap
  const router = express.Router();
  router.use(bodyParser.json())

     .get('/games', gameController.getAll)
    .post('/games', gameController.post)

     .put('/games/:slug', gameController.update)
  .delete('/games/:slug', gameController.remove)
     .get('/games/:slug', gameController.get);

  return router;
}
