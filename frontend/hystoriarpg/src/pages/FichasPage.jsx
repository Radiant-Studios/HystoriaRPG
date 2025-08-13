import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './FichasPage.module.css'; // Importa o nosso novo estilo
import { FaTrash } from 'react-icons/fa'; // Ícone de lixo
import LoadingSpinner from '../components/LoadingSpinner'; // Importa o componente de loading

function FichasPage() {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fichas', {
          withCredentials: true,
        });
        setFichas(response.data);
      } catch (err) {
        setError('Falha ao carregar as fichas. Por favor, tente fazer o login novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchFichas();
  }, []);

  const handleDelete = async (fichaId) => {
    if (!window.confirm('Tem a certeza de que deseja apagar esta ficha? Esta ação é irreversível.')) return;
    try {
      await axios.delete(`http://localhost:5000/api/fichas/${fichaId}`, { withCredentials: true });
      setFichas(fichas.filter(f => f.id !== fichaId));
    } catch (err) {
      alert('Erro ao apagar a ficha.');
    }
  };

  if (loading) return <LoadingSpinner />; // <-- USA O SPINNER EM VEZ DO TEXTO
  
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <main className={styles.main}>
      <Link to="/fichas/nova" className={styles.btnNovaFicha}>
        Criar Nova Ficha
      </Link>
      
      {fichas.length > 0 ? (
        <ul className={styles.fichasList}>
          {fichas.map(ficha => (
            <li key={ficha.id} className={styles.fichaItem}>
              <Link to={`/ficha/${ficha.id}`} className={styles.fichaLink}>
                <div className={styles.fotoContainer}>
                  <img 
                    src={ficha.foto_personagem || '/images/default-avatar.jpg'} 
                    alt={`Foto de ${ficha.nome}`} 
                    className={styles.fotoPersonagem}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.nomePersonagem}>{ficha.nome}</h3>
                  <span className={styles.classePersonagem}>
                    {ficha.classes[0]?.nome || 'Classe'} - Nível {ficha.nivel}
                  </span>
                </div>
              </Link>
              <button 
                className={styles.deleteIcon} 
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique no botão ative o link do card
                  handleDelete(ficha.id);
                }}
                title="Apagar Ficha"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.nenhumaFicha}>
          <p>Nenhuma ficha encontrada. Que tal criar a sua primeira aventura?</p>
        </div>
      )}
    </main>
  );
}

export default FichasPage;