const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');

router.get('/racas', jogoController.listarRacas);
router.get('/classes', jogoController.listarClasses);
router.get('/origens', jogoController.listarOrigens);
router.get('/poderes', jogoController.listarPoderes);
router.get('/magias', jogoController.listarMagias);

module.exports = router;