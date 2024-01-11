const express = require('express');
const { signup, login } = require('../controllers/user_controller.js');
const { verifyToken } = require('../middleware/verifyTokenMiddleware.js');

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/user',verifyToken);

module.exports = router;