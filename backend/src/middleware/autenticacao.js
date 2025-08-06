const supabase = require('../config/supabaseClient');

const autenticarUsuario = async (req, res, next) => {
    const token = req.cookies['sb-access-token'];

    const handleAuthFailure = () => {
        res.clearCookie('sb-access-token');
        res.clearCookie('sb-refresh-token');
        
        // Se for uma rota de API, retorna um erro 401 JSON.
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ erro: 'Usuário não autenticado. Por favor, faça login.' });
        }
        
        // Para outras rotas (se houver), redireciona.
        return res.redirect('/login');
    };

    if (!token) {
        return handleAuthFailure();
    }

    try {
        const { error: sessionError } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: req.cookies['sb-refresh-token'] || null
        });

        if (sessionError) {
            return handleAuthFailure();
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return handleAuthFailure();
        }

        req.userId = user.id;
        next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);
        return handleAuthFailure();
    }
};

module.exports = autenticarUsuario;