const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Rota de cadastro
router.post('/cadastro', usuariosController.cadastrar);

// Rota de login
router.post('/login', usuariosController.login);

// Rota para obter perfil do usuário
router.get('/:id', usuariosController.obterPerfil);

module.exports = router;
