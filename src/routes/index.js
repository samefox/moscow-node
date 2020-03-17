const routes = require('express').Router();
const { getClient, addClient, updateClient, deleteClient } = require('./client');

routes.get('/client', getClient);
routes.post('/client', addClient);
routes.put('/client', updateClient);
routes.delete('/client', deleteClient);

module.exports = routes;
