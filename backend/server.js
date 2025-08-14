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

const app = express();
const PORT = process.env.PORT || 3000;


// --- Middlewares ---

// Permite a comunicação com o frontend em React
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

app.get('/', (req, res) => {
  res.send('Backend is running');
});


// --- Definição das Rotas da API ---

// Rotas públicas (login, registro)
app.use('/auth', authRoutes);

// Rotas protegidas (exigem login)
app.use('/api/usuario', autenticarUsuario, userRoutes);
app.use('/api/campanhas', autenticarUsuario, campanhaRoutes);
app.use('/api/fichas', autenticarUsuario, fichaRoutes);


// --- Tratamento de Erros ---
app.use((err, req, res, next) => {
    // Trata erros de upload (arquivo muito grande)
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ erro: 'Arquivo muito grande. O limite é de 5MB.' });
        }
    }
    // Loga o erro e envia uma resposta genérica
    console.error(err);
    res.status(500).json({ erro: 'Ocorreu um erro inesperado no servidor.' });
});


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor API rodando em http://localhost:${PORT}`);
});