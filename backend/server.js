require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

// --- Importa as rotas e o middleware de autenticação ---
const autenticarUsuario = require('./src/middleware/autenticacao');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const campanhaRoutes = require('./src/routes/campanhasRoutes');
const fichaRoutes = require('./src/routes/fichaRoutes');
const jogoRoutes = require('./src/routes/jogoRoutes');

const app = express();
// CORREÇÃO 2: Alterado a porta padrão para 3001 para evitar conflito com o React
const PORT = process.env.PORT || 3001;


// --- Middlewares ---

// Permite a comunicação com o frontend em React (que roda na porta 3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Interpreta cookies e o corpo das requisições (JSON)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos (imagens, css) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));


// --- Definição das Rotas da API ---

// Rotas públicas (login, registro e dados do jogo)
app.use('/auth', authRoutes);
// CORREÇÃO 1: Rota do jogo agora é pública e usa o caminho correto (singular)
app.use('/api/jogo', jogoRoutes);

// Rotas protegidas (exigem login)
app.use('/api/usuario', autenticarUsuario, userRoutes);
app.use('/api/campanhas', autenticarUsuario, campanhaRoutes);
app.use('/api/fichas', autenticarUsuario, fichaRoutes);


// --- Tratamento de Erros ---
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ erro: 'Arquivo muito grande. O limite é de 5MB.' });
        }
    }
    console.error(err);
    res.status(500).json({ erro: 'Ocorreu um erro inesperado no servidor.' });
});


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor API rodando em http://localhost:${PORT}`);
});