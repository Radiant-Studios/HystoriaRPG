const supabase = require('../config/supabaseClient');

// --- FUNÇÕES DE LEITURA PARA DADOS PÚBLICOS DO JOGO ---

const listarRacas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('racas').select('*').order('nome');
        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor ao buscar raças.' });
    }
};

const listarClasses = async (req, res) => {
    try {
        const { data, error } = await supabase.from('classes').select('*').order('nome');
        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor ao buscar classes.' });
    }
};

const listarOrigens = async (req, res) => {
    try {
        const { data, error } = await supabase.from('origens').select('*').order('nome');
        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor ao buscar origens.' });
    }
};

// Função para buscar poderes com filtros
const listarPoderes = async (req, res) => {
    try {
        // Ex: /api/jogo/poderes?categoria=combate,destino
        const { categoria } = req.query;

        let query = supabase.from('poderes').select('*');

        if (categoria) {
            const categoriasArray = categoria.split(',');
            query = query.in('categoria', categoriasArray);
        }
        
        const { data, error } = await query.order('nome');
        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar poderes.' });
    }
};

// Função para buscar magias com filtros
const listarMagias = async (req, res) => {
    try {
        const { tipo, circulo } = req.query;
        let query = supabase.from('magias').select('*');
        if (tipo) query = query.eq('tipo', tipo);
        if (circulo) query = query.eq('circulo', circulo);
        
        const { data, error } = await query.order('nome');
        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar magias.' });
    }
};

module.exports = {
    listarRacas,
    listarClasses,
    listarOrigens,
    listarPoderes,
    listarMagias
};