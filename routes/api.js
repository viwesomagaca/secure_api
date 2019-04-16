const express = require('express');
const router = express.Router();
const apiRoutes = require('../controller');

// router.post('/register', apiRoutes.register);
// router.post('/login', apiRoutes.login);
router.get('/items', apiRoutes.getItems);

module.exports = router;