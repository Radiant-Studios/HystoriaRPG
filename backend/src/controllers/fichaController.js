const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

// No futuro, estes dados podem vir de um local mais robusto
const classesData = require('../config/classesData.js');
const racasData = require('../config/racasData.js');

// =========================================================================
// FUNÇÕES DE LEITURA (GET)
// =========================================================================

const listarFichas = async (req, res) => {
    try {
        const { data: fichas, error } = await supabase.from('fichas').select('*').eq('user_id', req.userId);
        if (error) throw error;
        res.json(fichas || []);
    } catch (error) {
        console.error('Erro ao recuperar fichas:', error);
        res.status(500).json({ erro: 'Erro interno do servidor ao buscar fichas.' });
    }
};

const buscarFichaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data: ficha, error } = await supabase
            .from('fichas')
            .select('*')
            .eq('id', id)
            .eq('user_id', req.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ erro: 'Ficha não encontrada ou você não tem permissão para vê-la.' });
            }
            throw error;
        }

        res.json(ficha);
    } catch (error) {
        console.error('Erro ao recuperar a ficha:', error);
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
};

// =========================================================================
// FUNÇÕES DE CRIAÇÃO E DELEÇÃO (POST, DELETE)
// =========================================================================

const criarFicha = async (req, res) => {
    try {
        const { nomePersonagem, historia, raca, classe, origem } = req.body;
        const userId = req.userId;

        if (!nomePersonagem || !raca || !classe || !origem) {
            return res.status(400).json({ success: false, erro: 'Dados da ficha incompletos.' });
        }

        const classeNormalizada = classe.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const dadosClasse = classesData[classeNormalizada];
        if (!dadosClasse) {
            return res.status(400).json({ success: false, erro: `Classe "${classe}" inválida.` });
        }

        const { data, error } = await supabase
            .from('fichas')
            .insert([{
                user_id: userId,
                nome: nomePersonagem,
                historia: historia,
                raca: raca,
                classes: [{ nome: classe, nivel: 1 }],
                origem: origem,
                nivel: 1,
                atributos: { FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0 },
                pericias: {},
                pontos_de_vida_max: dadosClasse.basePV,
                pontos_de_vida_atual: dadosClasse.basePV,
                pontos_de_mana_max: dadosClasse.basePM,
                pontos_de_mana_atual: dadosClasse.basePM,
            }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Erro no servidor ao criar ficha:', error);
        res.status(500).json({ success: false, erro: 'Erro interno do servidor ao criar a ficha.' });
    }
};

const deletarFicha = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const { error } = await supabase.from('fichas').delete().match({ id: id, user_id: userId });
        if (error) throw error;
        res.json({ sucesso: 'Ficha deletada com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor ao deletar ficha:', error);
        res.status(500).json({ erro: 'Erro interno do servidor ao deletar a ficha.' });
    }
};

// =========================================================================
// FUNÇÕES DE ATUALIZAÇÃO (UPDATE)
// =========================================================================

const atualizarInfoGeral = async (req, res) => {
    const { id } = req.params;
    const { identidade, origem, raca, classes, divindade } = req.body;

    if (!identidade || !identidade.nomePersonagem) {
        return res.status(400).json({ erro: 'O nome do personagem é obrigatório.' });
    }

    try {
        const { data, error } = await supabase.from('fichas').update({
            nome: identidade.nomePersonagem,
            historia: identidade.historia,
            origem,
            raca,
            classes,
            divindade
        }).match({ id: id, user_id: req.userId }).select();

        if (error) throw error;
        if (!data || data.length === 0) return res.status(404).json({ erro: 'Ficha não encontrada' });
        res.json({ mensagem: 'Informações atualizadas com sucesso!', ficha: data[0] });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar informações' });
    }
};

const atualizarAtributos = async (req, res) => {
    const { id } = req.params;
    const atributos = req.body;

    try {
        const { error } = await supabase.from('fichas').update({ atributos }).match({ id: id, user_id: req.userId });
        if (error) throw error;
        res.json({ mensagem: 'Atributos atualizados com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar atributos' });
    }
};

const atualizarPericias = async (req, res) => {
    const { id } = req.params;
    const { pericias } = req.body;

    if (!pericias) return res.status(400).json({ erro: 'Dados de perícias não fornecidos.' });

    try {
        const { error } = await supabase.from('fichas').update({ pericias }).match({ id: id, user_id: req.userId });
        if (error) throw error;
        res.json({ mensagem: 'Perícias atualizadas com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno do servidor ao atualizar as perícias.' });
    }
};

const atualizarPontos = async (req, res) => {
    const { id } = req.params;
    const { tipo, valor, pvMaximo, pmMaximo } = req.body;

    try {
        const { data: ficha, error: fetchError } = await supabase.from('fichas')
            .select('pontos_de_vida_atual, pontos_de_vida_max, pontos_de_mana_atual, pontos_de_mana_max')
            .match({ id: id, user_id: req.userId }).single();

        if (fetchError || !ficha) return res.status(404).json({ erro: 'Ficha não encontrada' });

        let updateData = {};
        if (tipo === 'pv') {
            updateData.pontos_de_vida_atual = Math.max(0, Math.min(ficha.pontos_de_vida_atual + valor, pvMaximo || ficha.pontos_de_vida_max));
            if (pvMaximo) updateData.pontos_de_vida_max = pvMaximo;
        } else if (tipo === 'pm') {
            updateData.pontos_de_mana_atual = Math.max(0, Math.min(ficha.pontos_de_mana_atual + valor, pmMaximo || ficha.pontos_de_mana_max));
            if(pmMaximo) updateData.pontos_de_mana_max = pmMaximo;
        } else {
            return res.status(400).send('Tipo inválido');
        }

        const { data: updatedFicha, error: updateError } = await supabase.from('fichas').update(updateData).eq('id', id).select().single();
        if (updateError) throw updateError;

        res.json(updatedFicha);
    } catch (error) {
        res.status(500).send('Erro interno do servidor');
    }
};

const atualizarNivel = async (req, res) => {
    const { id } = req.params;
    const { nivel } = req.body;
    try {
        const { error } = await supabase.from('fichas').update({ nivel }).match({ id: id, user_id: req.userId });
        if (error) throw error;
        res.json({ mensagem: 'Nível atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar nível' });
    }
};

const atualizarFoto = async (req, res) => {
    const { id } = req.params;
    const bucketName = 'fotos-personagem';
    try {
        if (!req.file) return res.status(400).json({ erro: 'Nenhum arquivo de imagem enviado.' });
        
        const filePath = `public/${req.userId}/${id}/${uuidv4()}-avatar.png`;
        const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, req.file.buffer, { contentType: req.file.mimetype, upsert: true });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        const { error: dbError } = await supabase.from('fichas').update({ foto_personagem: urlData.publicUrl }).match({ id: id, user_id: req.userId });
        if (dbError) throw dbError;

        res.json({ sucesso: 'Foto do personagem atualizada com sucesso!', caminho: urlData.publicUrl });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor ao atualizar a foto.' });
    }
};

// =========================================================================
// FUNÇÕES PARA HABILIDADES E CLASSES (ARRAYS JSON)
// =========================================================================

const adicionarHabilidade = async (req, res) => {
    const { id } = req.params;
    const { habilidade } = req.body;

    if (!habilidade || !habilidade.nome) return res.status(400).json({ message: 'Dados da habilidade incompletos.' });

    try {
        const { data: ficha, error: fetchError } = await supabase.from('fichas').select('habilidades').match({ id, user_id: req.userId }).single();
        if (fetchError || !ficha) return res.status(404).json({ message: 'Ficha não encontrada' });

        const habilidadesAtuais = ficha.habilidades || [];
        habilidadesAtuais.push(habilidade);

        const { error: updateError } = await supabase.from('fichas').update({ habilidades: habilidadesAtuais }).eq('id', id);
        if (updateError) throw updateError;

        res.json({ message: 'Habilidade adicionada com sucesso!', habilidades: habilidadesAtuais });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar a habilidade' });
    }
};

const removerHabilidade = async (req, res) => {
    const { id } = req.params;
    const { habilidadeNome } = req.body;

    if (!habilidadeNome) return res.status(400).json({ message: 'Nome da habilidade não fornecido.' });

    try {
        const { data: ficha, error: fetchError } = await supabase.from('fichas').select('habilidades').match({ id, user_id: req.userId }).single();
        if (fetchError || !ficha) return res.status(404).json({ message: 'Ficha não encontrada' });

        const habilidadesAtuais = ficha.habilidades || [];
        const novasHabilidades = habilidadesAtuais.filter(hab => hab.nome.trim().toLowerCase() !== habilidadeNome.trim().toLowerCase());

        if (habilidadesAtuais.length === novasHabilidades.length) return res.status(404).json({ message: 'Habilidade não encontrada' });

        const { error: updateError } = await supabase.from('fichas').update({ habilidades: novasHabilidades }).eq('id', id);
        if (updateError) throw updateError;

        res.json({ message: 'Habilidade removida com sucesso!', habilidades: novasHabilidades });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover habilidade' });
    }
};

const atualizarClasses = async (req, res) => {
    const { id } = req.params;
    const { classes, isMulticlass } = req.body;

    try {
        const { data: ficha, error } = await supabase.from('fichas').update({ classes: classes, is_multiclass: isMulticlass }).match({ id: id, user_id: req.userId }).select().single();
        if (error) throw error;
        res.json({ mensagem: 'Classes atualizadas com sucesso!', ficha });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor ao atualizar classes' });
    }
};

// Exporta todas as funções para as rotas poderem usá-las
module.exports = {
    listarFichas,
    buscarFichaPorId,
    criarFicha,
    deletarFicha,
    atualizarInfoGeral,
    atualizarAtributos,
    atualizarPericias,
    atualizarPontos,
    atualizarNivel,
    atualizarFoto,
    adicionarHabilidade,
    removerHabilidade,
    atualizarClasses
};