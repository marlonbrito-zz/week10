const { Router } = require('express');
const DevControler = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevControler.index);

routes.post('/devs', DevControler.store);

routes.get('/search',SearchController.index );

routes.put('/devs', DevControler.update);

routes.delete('/devs/:github_username', DevControler.destroy);

module.exports = routes;