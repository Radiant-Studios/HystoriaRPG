const express = require('express');
const router = express.Router();
const multer = require('multer');

// 1. Importa o novo controller que contém toda a lógica
const fichaController = require('../controllers/fichaController');

// 2. Configura o Multer para upload de ficheiros
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB
});

// --- Rotas de Leitura (GET) ---
router.get('/', fichaController.listarFichas);
router.get('/:id', fichaController.buscarFichaPorId);

// --- Rotas de Criação e Deleção (POST, DELETE) ---
router.post('/', fichaController.criarFicha);
router.delete('/:id', fichaController.deletarFicha);

// --- Rotas de Atualização (POST ou PUT/PATCH) ---
router.post('/:id/info', fichaController.atualizarInfoGeral);
router.post('/:id/atributos', fichaController.atualizarAtributos);
router.post('/:id/pericias', fichaController.atualizarPericias);
router.post('/:id/pontos', fichaController.atualizarPontos);
router.post('/:id/nivel', fichaController.atualizarNivel);
router.post('/:id/foto', upload.single('fotoPersonagem'), fichaController.atualizarFoto);

// --- Rotas para Habilidades e Classes (JSON arrays) ---
router.post('/:id/habilidades', fichaController.adicionarHabilidade);
router.delete('/:id/habilidades', fichaController.removerHabilidade);
router.post('/:id/classes', fichaController.atualizarClasses);


module.exports = router;