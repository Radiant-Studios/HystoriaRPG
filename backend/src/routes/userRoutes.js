const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Configuração do Multer (pode ficar aqui ou em um arquivo de config)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });


// ROTA PARA BUSCAR DADOS DO USUÁRIO ATUAL: GET /api/usuario/atual
router.get('/atual', async (req, res) => {
    try {
        const { data: user, error } = await supabase.from('usuarios').select('username, email, foto_perfil').eq('id', req.userId).single();
        if (error || !user) return res.status(404).json({ erro: 'Usuário não encontrado.' });
        
        const fotoUrl = user.foto_perfil || '/images/default-avatar.jpg';
        res.json({ username: user.username, email: user.email, foto_perfil_url: fotoUrl });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
});

// ROTA PARA ATUALIZAR USERNAME, EMAIL, SENHA, FOTO
// (Todas as rotas de 'atualizar_*' que estavam no server.js vêm para cá)

router.post('/atualizar_username', async (req, res) => {
    // ... Lógica para atualizar username
});

router.post('/atualizar_email', async (req, res) => {
    // ... Lógica para atualizar email
});

router.post('/atualizar_senha', async (req, res) => {
    // ... Lógica para atualizar senha
});

router.post('/atualizar_foto_perfil', upload.single('uploadFotodePerfil'), async (req, res) => {
    // ... Lógica para atualizar foto de perfil
});


module.exports = router;