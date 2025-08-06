import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importações do Redux
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolva toda a aplicação com o Provider, passando a store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);