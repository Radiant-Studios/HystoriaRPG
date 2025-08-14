import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial da autenticação
const initialState = {
  user: null, // Guarda os dados do usuário logado
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/usuario/atual', {
        withCredentials: true,
      });
      return data; // Retorna os dados do utilizador se a sessão for válida
    } catch (err) {
      
      return rejectWithValue(err.response.data.erro);
    }
  }
);

// Ação assíncrona para fazer o login do usuário
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      // Chama a API de login
      await axios.post('http://localhost:5000/auth/login', loginData, {
        withCredentials: true,
      });
      
      // Se o login deu certo, busca os dados do usuário
      const { data: userData } = await axios.get('http://localhost:5000/api/usuario/atual', {
        withCredentials: true,
      });

      // Retorna os dados do usuário em caso de sucesso
      return userData;

    } catch (err) {
      // Retorna a mensagem de erro da API em caso de falha
      return rejectWithValue(err.response.data.erro);
    }
  }
);

// Ação assíncrona para registrar um novo usuário
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Chama a API de registro
      const response = await axios.post('http://localhost:5000/auth/registrar', userData);
      // Retorna a mensagem de sucesso
      return response.data.mensagem; 
    } catch (err) {
      // Retorna a mensagem de erro da API
      return rejectWithValue(err.response.data.erro);
    }
  }
);

// Criação do "slice" de autenticação
const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers são funções que alteram o estado de forma síncrona
  reducers: {
    // Ação de logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  // extraReducers lidam com as ações assíncronas (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // Casos do Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload; // Salva os dados do usuário no estado
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload; // Salva a mensagem de erro
      })

      // Casos do Registro
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        // O registro bem-sucedido não loga o usuário, apenas muda o status
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Salva a mensagem de erro
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Usuário não autenticado'; // Mensagem padrão se a autenticação falhar
      });
    },
});

// Exporta a ação de logout e o reducer principal
export const { logout } = authSlice.actions;
export default authSlice.reducer;