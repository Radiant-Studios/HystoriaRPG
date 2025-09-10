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
router.post('/:id/armadura-escudo', async (req, res) => {
    const { id } = req.params;
    const { tipo, campo, valor } = req.body; // tipo: 'armadura' ou 'escudo', campo: 'defesa' ou 'penalidade'

    if (!['armadura', 'escudo'].includes(tipo) || !['defesa', 'penalidade'].includes(campo)) {
        return res.status(400).json({ message: 'Tipo ou campo inválido para armadura/escudo.' });
    }

    const colunaParaAtualizar = `${tipo}_${campo}`;

    try {
        const { data, error } = await supabase
            .from('fichas')
            .update({ [colunaParaAtualizar]: valor })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            res.status(200).json({ message: 'Armadura/Escudo atualizado com sucesso!', ficha: data[0] });
        } else {
            res.status(404).json({ message: 'Ficha não encontrada.' });
        }
    } catch (error) {
        console.error("Erro ao atualizar armadura/escudo:", error.message);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar armadura/escudo.' });
    }
});

// --- Rotas para Habilidades e Classes (JSON arrays) ---
router.post('/:id/habilidades', fichaController.adicionarHabilidade);
router.post('/:id/defesa', fichaController.atualizarDefesa);
router.get('/:id/statsgerais', fichaController.buscarStatsGerais);
router.post('/:id/statsgerais', fichaController.atualizarStatsGerais);
router.delete('/:id/habilidades', fichaController.removerHabilidade);
router.post('/:id/classes', fichaController.atualizarClasses);


module.exports = router;