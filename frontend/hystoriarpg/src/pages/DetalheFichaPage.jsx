// Arquivo: frontend/src/pages/DetalheFichaPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para ler o ID da URL
import axios from 'axios';

function DetalheFichaPage() {
  // O hook useParams nos dá acesso aos parâmetros da URL, como o ':id'
  const { id: fichaId } = useParams(); 

  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        // Usamos o fichaId da URL para construir a chamada da API
        const response = await axios.get(`http://localhost:3000/api/ficha/${fichaId}`, {
          withCredentials: true
        });
        setFicha(response.data); // Armazena o objeto completo da ficha no estado
      } catch (err) {
        setError('Não foi possível carregar a ficha.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFicha();
  }, [fichaId]); // O [fichaId] significa: "execute de novo se o ID na URL mudar"

  if (loading) {
    return <div>Carregando ficha...</div>;
  }

  if (error || !ficha) {
    return <div style={{ color: 'red' }}>{error || 'Ficha não encontrada.'}</div>;
  }

  // Se chegou aqui, a ficha foi carregada com sucesso!
  // Agora vamos renderizar os dados dela.
  return (
    <div className="ficha-container">
      <Link to="/fichas">&larr; Voltar para todas as fichas</Link>

      <div className="ficha-header">
        <img 
            src={ficha.foto_personagem || '/images/default-avatar.jpg'} 
            alt={`Foto de ${ficha.nome}`} 
            className="ficha-avatar"
        />
        <div>
            <h1>{ficha.nome}</h1>
            <p>{ficha.raca} - {ficha.origem} - Nível {ficha.nivel}</p>
        </div>
      </div>
      
      <div className="ficha-body">
        {/* Exemplo de como mostrar os atributos */}
        <div className="atributos-grid">
            <h3>Atributos</h3>
            <ul>
                {Object.entries(ficha.atributos).map(([atributo, valor]) => (
                    <li key={atributo}>
                        <strong>{atributo}:</strong> {valor}
                    </li>
                ))}
            </ul>
        </div>

        <div className="historia-section">
            <h3>História</h3>
            <p>{ficha.historia || 'Nenhuma história definida.'}</p>
        </div>
      </div>

      {/* Você pode adicionar mais seções aqui para perícias, habilidades, etc. */}
    </div>
  );
}

export default DetalheFichaPage;