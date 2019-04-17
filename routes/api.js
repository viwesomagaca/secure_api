const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiRoutes = require('../controller/item');

    router.get('/items',  passport.authenticate('jwt', { session : false }), apiRoutes.getItems);
    router.post('/items',  passport.authenticate('jwt', { session : false }), apiRoutes.addItems);
    router.get('/items/:id',  passport.authenticate('jwt', { session : false }),apiRoutes. getItemById);
    router.post('/items/:id',  passport.authenticate('jwt', { session : false }), apiRoutes.updateItem);
    router.post('/items/:id',  passport.authenticate('jwt', { session : false }), apiRoutes.deleteItem);

module.exports = router;