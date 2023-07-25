const express = require('express');
const authenticateToken = require('../config/authMiddleware');
const { obterTodosPacientes, cadastrarPaciente, obterPacientePorId, atualizarPaciente } = require('../controllers/pacienteController');
const router = express.Router();

// Obter dados pacientes
router.get('/', authenticateToken, obterTodosPacientes);

// Cadastro de pacientes
router.post('/cadastro', authenticateToken, cadastrarPaciente);

// Obter paciente por id
router.get('/editar/:id', authenticateToken, obterPacientePorId)

// Atualizar paciente
router.put('/editar/:id', authenticateToken, atualizarPaciente);

module.exports = router;
