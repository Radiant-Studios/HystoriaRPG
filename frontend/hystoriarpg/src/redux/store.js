import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importa o reducer que acabamos de criar

export const store = configureStore({
  reducer: {
    // Registra o nosso slice de autenticação na store
    auth: authReducer,
    // Você pode adicionar outros slices aqui no futuro (ex: fichas, campanhas)
  },
});