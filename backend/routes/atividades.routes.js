const express = require('express');
const router = express.Router();
const atividadesController = require('../controllers/atividades.controller');

// Rotas de listagem
router.get('/', atividadesController.listarTodas);
router.get('/hoje', atividadesController.listarHoje);
router.get('/concluidas-hoje', atividadesController.listarConcluidasHoje);
router.get('/ontem', atividadesController.listarOntem);
router.get('/data/:data', atividadesController.listarPorData);

// Rotas de CRUD
router.get('/:id', atividadesController.buscarPorId);
router.post('/', atividadesController.criar);
router.put('/:id', atividadesController.atualizar);
router.patch('/:id/concluir', atividadesController.marcarConcluida);
router.delete('/:id', atividadesController.deletar);

module.exports = router;