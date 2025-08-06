const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// ROTA DE LOGIN: POST /auth/login
router.post('/login', async (req, res) => {
    const { email, senha, lembrar } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) throw error;

        if (data.session) {
            const umAnoEmSegundos = 31536000;
            const maxAge = lembrar ? umAnoEmSegundos * 1000 : data.session.expires_in * 1000;

            res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', maxAge });
            res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', ...(lembrar && { maxAge: umAnoEmSegundos * 1000 }) });
        }
        res.json({ mensagem: 'Login realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }
});

// ROTA DE REGISTRO: POST /auth/registrar
router.post('/registrar', async (req, res) => {
    // ... (toda a sua lógica de registro que estava no server.js) ...
    // É exatamente o mesmo código que você já tinha.
    const { username, email, senha, confirmaSenha } = req.body;
    if (senha !== confirmaSenha) return res.status(400).json({ erro: 'As senhas não coincidem' });
    try {
        const { data: existingUser } = await supabase.from('usuarios').select('username').eq('username', username).single();
        if (existingUser) return res.status(409).json({ erro: 'Este nome de usuário já está em uso.' });

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({ email, password: senha, email_confirm: false, user_metadata: { username } });
        if (authError) throw authError;

        await supabase.auth.admin.updateUserById(authData.user.id, { email_confirm: true });
        res.json({ mensagem: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        if (error.code === 'weak_password') return res.status(422).json({ erro: 'A senha é muito fraca.' });
        if (error.code === '23505' || error.message.includes('username')) return res.status(409).json({ erro: 'Este nome de usuário já está em uso.' });
        if (error.message.includes('User already registered')) return res.status(409).json({ erro: 'Este email já está em uso.' });
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// ROTA DE LOGOUT: POST /auth/logout
router.post('/logout', (req, res) => {
    res.clearCookie('sb-access-token');
    res.clearCookie('sb-refresh-token');
    res.json({ mensagem: 'Logout realizado com sucesso!' });
});

// ROTA DE RECUPERAÇÃO DE SENHA: POST /auth/recuperar-senha
router.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ erro: 'O email é obrigatório.' });
    const redirectUrl = `${req.protocol}://${req.get('host')}/resetar-senha`;
    try {
        await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
        res.json({ mensagem: 'Se uma conta com este email existir, um link de recuperação foi enviado.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
});


module.exports = router;