const express = require('express');
const router = express.Router();
const { userLogin, userRegister } = require('../controllers/authControllers')

// Rota de registro de usuário
router.post('/register', userRegister);

// Rota de login
router.post('/', userLogin);

module.exports = router;
