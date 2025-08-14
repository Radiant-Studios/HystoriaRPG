import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CampanhasPage.module.css';
import { FaPlus } from 'react-icons/fa';
import LoadingSpinner from 'components/LoadingSpinner';

// No futuro, podemos criar um componente de Modal reutilizável
// Por enquanto, a lógica ficará aqui
const ModalNovaCampanha = ({ onClose, onCampanhaCriada }) => {
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('nome', nome);
        if (imagem) {
            formData.append('imagem', imagem);
        }

        try {
            const response = await axios.post('/api/campanhas', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            onCampanhaCriada(response.data); // Passa a nova campanha de volta
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao criar campanha.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2>Criar Nova Campanha</h2>
                <form id="formNovaCampanha" onSubmit={handleSubmit}>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeCampanha">Nome da Campanha</label>
                        <input type="text" id="nomeCampanha" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="imagemCampanha">Imagem de Capa (Opcional)</label>
                        <input type="file" id="imagemCampanha" onChange={(e) => setImagem(e.target.files[0])} accept="image/*" />
                    </div>
                    <button type="submit" className={styles.btn} disabled={isLoading}>
                        {isLoading ? 'Criando...' : 'Criar'}
                    </button>
                </form>
            </div>
        </div>
    );
};


function CampanhasPage() {
    const [campanhas, setCampanhas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCampanhas = async () => {
            try {
                const response = await axios.get('/api/campanhas', { withCredentials: true });
                setCampanhas(response.data);
            } catch (error) {
                console.error("Erro ao buscar campanhas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampanhas();
    }, []);

    const handleCampanhaCriada = (novaCampanha) => {
        setCampanhas([...campanhas, novaCampanha]);
        setShowModal(false);
    };

    if (loading) {
        return <LoadingSpinner/>;  // Poderíamos usar nosso LoadingSpinner aqui
    }

    return (
        <main className={styles.campaignsMain}>
            <div className={styles.mainHeader}>
                <h1>Minhas Campanhas</h1>
                <button id="btnNovaCampanha" className={styles.btn} onClick={() => setShowModal(true)}>
                    <FaPlus /> Criar Campanha
                </button>
            </div>

            <div className={styles.campanhasList}>
                {campanhas.length > 0 ? (
                    campanhas.map(campanha => (
                        <div key={campanha.uuid} className={styles.campanhaCard}>
                            <Link to={`/campanha/${campanha.uuid}`} className={styles.campanhaLink}>
                                <div className={styles.campanhaImageContainer}>
                                    <img src={campanha.imagem_capa || '/images/default-campaign.jpg'} alt={`Capa da campanha ${campanha.nome}`} />
                                    <div className={styles.campanhaOverlay}>
                                        <h3 className={styles.campanhaNome}>{campanha.nome}</h3>
                                        <span className={styles.campanhaInfo}>Mestre</span>
                                    </div>
                                </div>
                                <div className={styles.campanhaActions}>
                                    <span>Ver Campanha</span>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className={styles.nenhumaCampanha}>
                        <p>Nenhuma campanha encontrada. Que tal criar a sua primeira aventura?</p>
                    </div>
                )}
            </div>

            {showModal && <ModalNovaCampanha onClose={() => setShowModal(false)} onCampanhaCriada={handleCampanhaCriada} />}
        </main>
    );
}

export default CampanhasPage;