const express = require('express');
const router = express.Router();
const apiRoutes = require('../controller');

// router.post('/register', apiRoutes.register);
// router.post('/login', apiRoutes.login);
router.get('/items', apiRoutes.getItems);
router.post('/items', apiRoutes.addItems);
router.get('/items/:id',apiRoutes. getItemById);
router.post('/items/:id', apiRoutes.updateItem);
router.post('/item/:id', apiRoutes.deleteItem);



module.exports = router;