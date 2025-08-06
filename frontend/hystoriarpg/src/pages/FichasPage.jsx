// Arquivo: frontend/src/pages/FichasPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Para criar links de navegação

function FichasPage() {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect é o hook que executa uma função quando o componente "monta" na tela.
  // Perfeito para buscar dados iniciais.
  useEffect(() => {
    const fetchFichas = async () => {
      try {
        // Chama a nova API que criamos no backend
        const response = await axios.get('http://localhost:3000/api/fichas', {
          withCredentials: true // MUITO IMPORTANTE: envia os cookies para autenticação
        });
        setFichas(response.data); // Guarda a lista de fichas no estado do componente
      } catch (err) {
        // Se a chamada falhar (ex: usuário não logado), guardamos o erro
        setError('Falha ao carregar as fichas. Por favor, tente fazer o login novamente.');
        console.error(err);
      } finally {
        // Independentemente do resultado, paramos de mostrar a mensagem de "carregando"
        setLoading(false);
      }
    };

    fetchFichas();
  }, []); // O array vazio [] significa: "execute esta função apenas uma vez"

  // Se estiver carregando, mostre uma mensagem
  if (loading) {
    return <div>Carregando suas fichas...</div>;
  }

  // Se deu erro, mostre o erro
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Minhas Fichas</h1>
      <Link to="/fichas/nova" className="button-new-char">
        + Criar Nova Ficha
      </Link>
      
      <div className="fichas-list">
        {fichas.length > 0 ? (
          fichas.map(ficha => (
            // O "key" é uma propriedade especial que o React usa para otimizar listas
            <div key={ficha.id} className="ficha-card">
              <Link to={`/ficha/${ficha.id}`}>
                <img 
                  src={ficha.foto_personagem || '/images/default-avatar.jpg'} 
                  alt={`Foto de ${ficha.nome}`} 
                />
                <div className="ficha-card-info">
                  <h2>{ficha.nome}</h2>
                  <p>{ficha.raca} - Nível {ficha.nivel}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>Você ainda não tem nenhuma ficha. Que tal criar uma?</p>
        )}
      </div>
    </div>
  );
}

export default FichasPage;