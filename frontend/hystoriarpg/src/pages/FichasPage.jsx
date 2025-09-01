import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './FichasPage.module.css';
import axios from 'axios';

function FichasPage() {
    const [fichas, setFichas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFichas = async () => {
            try {
                const API_URL = 'http://localhost:5000';
                const response = await axios.get(`${API_URL}/api/fichas`, { withCredentials: true });
                setFichas(response.data);
            } catch (err) {
                setError('Não foi possível carregar suas fichas. Tente novamente mais tarde.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFichas();
    }, []);

    // --- NOVA FUNÇÃO PARA DELETAR A FICHA ---
    const handleDelete = async (e, fichaId) => {
        // Previne que o clique no botão ative o Link para a página de detalhes
        e.preventDefault();
        e.stopPropagation();

        // Pede confirmação ao usuário
        if (window.confirm('Tem certeza que deseja excluir este personagem? Esta ação não pode ser desfeita.')) {
            try {
                const API_URL = 'http://localhost:5000';
                await axios.delete(`${API_URL}/api/fichas/${fichaId}`, { withCredentials: true });

                // Atualiza o estado para remover a ficha da tela instantaneamente
                setFichas(fichasAtuais => fichasAtuais.filter(ficha => ficha.id !== fichaId));

            } catch (err) {
                setError('Não foi possível excluir a ficha. Tente novamente.');
                console.error(err);
            }
        }
    };

    if (loading) {
        return <div className={styles.container}><h1 className={styles.title}>Carregando suas fichas...</h1></div>;
    }

    if (error) {
        return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Meus Personagens</h1>
                <Link to="/novaficha" className={styles.newCharButton}>
                    + Criar Novo Personagem
                </Link>
            </div>

            {fichas.length === 0 ? (
                <p className={styles.noCharsMessage}>Você ainda não tem nenhum personagem. Que tal criar um agora?</p>
            ) : (
                <div className={styles.grid}>
                    {fichas.map(ficha => (
                        <Link to={`/fichas/${ficha.id}`} key={ficha.id} className={styles.card}>
                            <img 
                                src={ficha.foto_personagem || '/images/default-avatar.jpg'} 
                                alt={`Foto de ${ficha.nome}`} 
                                className={styles.cardImage} 
                            />
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{ficha.nome}</h2>
                                <p className={styles.cardSubtitle}>
                                    {ficha.raca.nome} {ficha.classes[0].nome.nome} Nível {ficha.nivel}
                                </p>
                                
                                {/* --- BOTÃO DE LIXEIRA ADICIONADO AQUI --- */}
                                <button 
                                    className={styles.deleteButton} 
                                    onClick={(e) => handleDelete(e, ficha.id)}
                                    title="Excluir personagem"
                                >
                                    🗑️
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FichasPage;