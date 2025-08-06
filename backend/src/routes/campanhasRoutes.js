const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Configuração do Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

// ROTA PARA LISTAR CAMPANHAS DO MESTRE: GET /api/campanhas
router.get('/', async (req, res) => {
    try {
        const { data: campanhas, error } = await supabase
            .from('campanhas')
            .select('*')
            .eq('mestre_id', req.userId);
        if (error) throw error;
        res.json(campanhas || []);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar campanhas" });
    }
});

// ROTA PARA CRIAR CAMPANHA: POST /api/campanhas
router.post('/', upload.single('imagem'), async (req, res) => {
    // ... (Lógica de app.post('/campanhas', ...)
});

// ROTA PARA VER UMA CAMPANHA ESPECÍFICA: GET /api/campanhas/:uuid
router.get('/:uuid', async (req, res) => {
    // ... (Lógica de app.get('/campanha/:uuid', ...)
});

module.exports = router;