const express = require('express');
const router = express.Router();
const clientRoutes = require('../controller/user');

router.post('/register', apiRoutes.register);
router.post('/login', apiRoutes.login);

