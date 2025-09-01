import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// 1. NOVA AÇÃO PARA VERIFICAR A SESSÃO QUANDO A APP CARREGA
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Tenta aceder a uma rota protegida. Se funcionar, o utilizador está logado.
      const { data } = await axios.get('http://localhost:5000/api/usuario/atual', {
        withCredentials: true,
      });
      return data; // Retorna os dados do utilizador se a sessão for válida
    } catch (err) {
      // Se a chamada falhar (erro 401), significa que não há sessão válida.
      return rejectWithValue(err.response.data.erro);
    }
  }
);

// Ação de login atualizada para usar o checkAuthStatus
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      await axios.post('http://localhost:5000/auth/login', loginData, {
        withCredentials: true,
      });
      // Em vez de buscar os dados aqui, apenas disparamos a verificação
      const action = await dispatch(checkAuthStatus());
      return action.payload; // O resultado do checkAuthStatus determinará o estado
    } catch (err) {
      return rejectWithValue(err.response.data.erro);
    }
  }
);

// Ação de registo (sem alterações)
export const registerUser = createAsyncThunk( /* ... seu código existente ... */ );


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { /* ... seu reducer de logout ... */ },
  extraReducers: (builder) => {
    builder
      // 2. ADICIONA OS CASOS PARA A NOVA AÇÃO
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
      })
      // Casos de Login (sem alterações, já estão corretos)
      .addCase(loginUser.pending, (state) => { /* ... */ })
      .addCase(loginUser.fulfilled, (state, action) => { /* ... */ })
      .addCase(loginUser.rejected, (state, action) => { /* ... */ })
      // Casos de Registo (sem alterações)
      .addCase(registerUser.pending, (state) => { /* ... */ })
      .addCase(registerUser.fulfilled, (state) => { /* ... */ })
      .addCase(registerUser.rejected, (state, action) => { /* ... */ });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;