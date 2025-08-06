import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NovaFichaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePersonagem: '',
    historia: '',
    raca: '',
    classe: '',
    origem: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para atualizar o estado quando o usuário digita em qualquer campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Chama a sua API de criação de ficha
      const response = await axios.post('http://localhost:3000/api/fichas', formData, {
        withCredentials: true,
      });

      // Se a criação for bem-sucedida, a API retorna a ficha criada
      const novaFicha = response.data;
      
      // Redireciona o usuário para a página de detalhes da ficha recém-criada
      navigate(`/ficha/${novaFicha.id}`);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.erro);
      } else {
        setError('Ocorreu um erro ao criar a ficha. Tente novamente.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Criar Nova Ficha de Personagem</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomePersonagem">Nome do Personagem</label>
          <input
            type="text"
            id="nomePersonagem"
            name="nomePersonagem"
            value={formData.nomePersonagem}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="raca">Raça</label>
          <input
            type="text"
            id="raca"
            name="raca"
            value={formData.raca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="classe">Classe</label>
          <input
            type="text"
            id="classe"
            name="classe"
            value={formData.classe}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="origem">Origem</label>
          <input
            type="text"
            id="origem"
            name="origem"
            value={formData.origem}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="historia">História</label>
          <textarea
            id="historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Criando...' : 'Criar Ficha'}
        </button>
      </form>
    </div>
  );
}

export default NovaFichaPage;