const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

// ... (a função listarFichas continua a mesma)
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


// FUNÇÃO ATUALIZADA PARA BUSCAR DADOS RELACIONADOS
const buscarFichaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Busca a ficha principal
        const { data: ficha, error: fichaError } = await supabase
            .from('fichas')
            .select('*')
            .eq('id', id)
            .eq('user_id', req.userId)
            .single();

        if (fichaError) {
            if (fichaError.code === 'PGRST116') {
                return res.status(404).json({ erro: 'Ficha não encontrada ou você não tem permissão para vê-la.' });
            }
            throw fichaError;
        }

        // 2. Busca os poderes relacionados
        const { data: poderes, error: poderesError } = await supabase
            .from('fichas_poderes')
            .select('poderes (*)') // Pega todos os dados da tabela 'poderes'
            .eq('ficha_id', id);
        
        if (poderesError) throw poderesError;

        // 3. Busca as magias relacionadas
        const { data: magias, error: magiasError } = await supabase
            .from('fichas_magias')
            .select('magias (*)') // Pega todos os dados da tabela 'magias'
            .eq('ficha_id', id);

        if (magiasError) throw magiasError;
        
        // 4. Junta tudo em um único objeto de resposta
        const fichaCompleta = {
            ...ficha,
            poderes: poderes.map(p => p.poderes), // Extrai o objeto do poder
            magias: magias.map(m => m.magias)      // Extrai o objeto da magia
        };

        res.json(fichaCompleta);
    } catch (error) {
        console.error('Erro ao recuperar a ficha detalhada:', error);
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
};

const LISTA_PERICIAS_COMPLETA = {
    "Acrobacia": { atributo_base: "destreza" }, "Adestramento": { atributo_base: "carisma" },
    "Atletismo": { atributo_base: "forca" }, "Atuação": { atributo_base: "carisma" },
    "Cavalgar": { atributo_base: "destreza" }, "Conhecimento": { atributo_base: "inteligencia" },
    "Cura": { atributo_base: "sabedoria" }, "Diplomacia": { atributo_base: "carisma" },
    "Enganação": { atributo_base: "carisma" }, "Fortitude": { atributo_base: "constituicao" },
    "Furtividade": { atributo_base: "destreza" }, "Guerra": { atributo_base: "inteligencia" },
    "Iniciativa": { atributo_base: "destreza" }, "Intimidação": { atributo_base: "carisma" },
    "Intuição": { atributo_base: "sabedoria" }, "Investigação": { atributo_base: "inteligencia" },
    "Jogatina": { atributo_base: "carisma" }, "Ladinagem": { atributo_base: "destreza" },
    "Luta": { atributo_base: "forca" }, "Misticismo": { atributo_base: "inteligencia" },
    "Nobreza": { atributo_base: "inteligencia" }, "Ofício": { atributo_base: "inteligencia" },
    "Percepção": { atributo_base: "sabedoria" }, "Pilotagem": { atributo_base: "destreza" },
    "Pontaria": { atributo_base: "destreza" }, "Reflexos": { atributo_base: "destreza" },
    "Religião": { atributo_base: "sabedoria" }, "Sobrevivência": { atributo_base: "sabedoria" },
    "Vontade": { atributo_base: "sabedoria" }
};

// Substitua sua função criarFicha inteira por esta
const criarFicha = async (req, res) => {
    const { poderes, magias, pericias: periciasTreinadas, ...dadosDaFicha } = req.body;
    const userId = req.userId;

    try {
        // --- NOVA LÓGICA PARA CRIAR O OBJETO DE PERÍCIAS ---
        const objetoPericias = {};
        Object.keys(LISTA_PERICIAS_COMPLETA).forEach(nomePericia => {
            objetoPericias[nomePericia] = {
                treinada: periciasTreinadas.includes(nomePericia),
                outros_bonus: 0,
                atributo_base: LISTA_PERICIAS_COMPLETA[nomePericia].atributo_base
            };
        });
        // --- FIM DA NOVA LÓGICA ---

        const { data: novaFicha, error: fichaError } = await supabase
            .from('fichas')
            .insert({
                user_id: userId,
                nome: dadosDaFicha.nomePersonagem,
                historia: dadosDaFicha.historia,
                raca: dadosDaFicha.raca,
                classes: [{ nome: dadosDaFicha.classe, nivel: 1 }], 
                origem: dadosDaFicha.origem,
                nivel: 1,
                atributos: dadosDaFicha.atributosFinais,
                pontos_de_vida_max: dadosDaFicha.pv,
                pontos_de_vida_atual: dadosDaFicha.pv,
                pontos_de_mana_max: dadosDaFicha.pm,
                pontos_de_mana_atual: dadosDaFicha.pm,
                pericias: objetoPericias // Salva o novo objeto JSONB
            })
            .select()
            .single();

        if (fichaError) throw fichaError;

        const fichaId = novaFicha.id;

        if (poderes && poderes.length > 0) {
            const poderesParaInserir = poderes.map(poder => ({ ficha_id: fichaId, poder_id: poder.id }));
            const { error: poderesError } = await supabase.from('fichas_poderes').insert(poderesParaInserir);
            if (poderesError) throw poderesError;
        }
        
        if (magias && magias.length > 0) {
            const magiasParaInserir = magias.map(magia => ({ ficha_id: fichaId, magia_id: magia.id }));
            const { error: magiasError } = await supabase.from('fichas_magias').insert(magiasParaInserir);
            if (magiasError) throw magiasError;
        }

        res.status(201).json(novaFicha);

    } catch (error) {
        console.error('Erro detalhado ao criar ficha:', error);
        res.status(500).json({ erro: 'Ocorreu um erro no servidor ao tentar criar a ficha completa.' });
    }
};


// ... (o resto do arquivo 'deletarFicha', 'atualizarInfoGeral', etc., continua o mesmo)
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