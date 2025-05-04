const express = require('express');
const {registerController, loginController} = require('../controllers/authController');

const router = express.Router();

// routes
// register || post
router.post('/register', registerController);

// Login || post
router.post('/login', loginController);

module.exports = router;