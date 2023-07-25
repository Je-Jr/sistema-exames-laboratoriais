const express = require('express');
const authRoutes = require('./authRoutes');
const pacientesRoutes = require('./pacientesRoutes');
const profileControllers = require('../routes/profileRoutes');
const router = express.Router();

// Rotas de autenticação
router.use('/auth', authRoutes);
console.log('passou authRoutes')

// Rotas de pacientes
router.use('/pacientes', pacientesRoutes);
console.log('passou pacientesRoutes')

// Outras rotas e configurações do servidor...
router.use('/profile', profileControllers);
console.log('passou profileRoutes')


module.exports = router;


