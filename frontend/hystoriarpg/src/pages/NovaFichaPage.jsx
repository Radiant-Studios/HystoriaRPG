import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from './NovaFicha.module.css';

// NOTA IMPORTANTE: Crie um objeto como este para mapear os nomes das suas
// classes e raças para os caminhos das imagens que você irá usar.
const IMAGE_MAP = {
    // Classes
    Guerreiro: '/images/classes/guerreiro.jpg',
    Ladino: '/images/classes/ladino.jpg',
    Arcanista: '/images/classes/arcanista.jpg',
    // Raças
    Humano: '/images/racas/humano.jpg',
    Anão: '/images/racas/anao.jpg',
    Elfo: '/images/racas/elfo.jpg',
    // Imagem padrão caso não encontre uma específica
    default: '/images/default-card.jpg'
};


function NovaFichaPage() {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [activeCard, setActiveCard] = useState(null);
    const [selections, setSelections] = useState({
        raca: '',
        classe: '',
        origem: '',
    });
    const [formData, setFormData] = useState({
        nomePersonagem: '',
        historia: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [racas, setRacas] = useState([]);
    const [classes, setClasses] = useState([]);
    const [origens, setOrigens] = useState([]);

    useEffect(() => {
        async function fetchRacas() {
            const { data } = await supabase.from('racas').select('*');
            setRacas(data);
        }
        async function fetchClasses() {
            const { data } = await supabase.from('classes').select('*');
            setClasses(data);
        }
        async function fetchOrigens() {
            const { data } = await supabase.from('origens').select('*');
            setOrigens(data);
        }
        fetchRacas();
        fetchClasses();
        fetchOrigens();
    }, []);

    const handleCardToggle = (id) => {
        setActiveCard(activeCard === id ? null : id);
    };

    const handleSelect = (type, value) => {
        setSelections(prev => ({ ...prev, [type]: value }));
        setCurrentStep(prev => prev + 1);
        setActiveCard(null); // Reseta o card ativo ao avançar
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const finalFichaData = { ...formData, ...selections };
        try {
            const response = await axios.post('http://localhost:5000/api/fichas', finalFichaData, {
                withCredentials: true,
            });
            navigate(`/fichas/${response.data.id}`);
        } catch (err) {
            setError(err.response?.data?.erro || 'Ocorreu um erro ao criar a ficha.');
            setIsLoading(false);
        }
    };

    // Componente de passo de seleção, agora renderiza uma grid de cards
    const SelectionStep = ({ title, data, type, selectedValue }) => (
        <>
            <h1>{title}</h1>
            <div className={styles.selectionSummary}>{selectedValue || 'Faça a sua escolha'}</div>
            <div className={styles.selectionGrid}>
                {data.map((item) => (
                    <div
                        key={item.nome}
                        className={`${styles.card} ${activeCard === item.nome ? styles.active : ''}`}
                        onClick={() => handleCardToggle(item.nome)}
                    >
                        <div
                            className={styles.cardImage}
                            style={{ backgroundImage: `url(${IMAGE_MAP[item.nome] || IMAGE_MAP.default})` }}
                        ></div>
                        <h3 className={styles.cardTitle}>{item.nome}</h3>
                        <div className={styles.cardContent}>
                            <ul>
                                {item.habilidades && (Array.isArray(item.habilidades) ? (
                                    item.habilidades.map((hab, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: hab }}></li>
                                    ))
                                ) : (
                                    <li dangerouslySetInnerHTML={{ __html: item.habilidades }}></li>
                                ))}
                            </ul>
                            <button className={styles.btn} onClick={(e) => {
                                e.stopPropagation(); // Impede que o clique no botão feche o card
                                handleSelect(type, item.nome);
                            }}>
                                Selecionar {item.nome}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div className={styles.novaFichaContainer}>
            {/* Steps para Raça, Classe e Origem */}
            <div className={`${styles.step} ${currentStep === 1 ? styles.active : ''}`}>
                <SelectionStep title="Escolha sua Raça" data={racas} type="raca" selectedValue={selections.raca} />
            </div>
            <div className={`${styles.step} ${currentStep === 2 ? styles.active : ''}`}>
                <SelectionStep title="Escolha sua Classe" data={classes} type="classe" selectedValue={selections.classe} />
            </div>
            <div className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}>
                <SelectionStep title="Escolha sua Origem" data={origens} type="origem" selectedValue={selections.origem} />
            </div>

            {/* Step Final do Formulário */}
            <div className={`${styles.step} ${currentStep === 4 ? styles.active : ''}`}>
                <h1>Identidade do Personagem</h1>
                <div className={styles.selectionSummary}>
                    {`${selections.raca} / ${selections.classe} / ${selections.origem}`}
                </div>
                <form id={styles.identidadeForm} onSubmit={handleSubmit}>
                    <div className={styles.inputbox}>
                        <input
                            type="text"
                            name="nomePersonagem"
                            placeholder="Nome do Personagem"
                            value={formData.nomePersonagem}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className={styles.inputbox}>
                        <textarea
                            name="historia"
                            placeholder="Escreva a história do seu personagem..."
                            value={formData.historia}
                            onChange={handleFormChange}
                        ></textarea>
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                    <button type="submit" className={styles.btn} disabled={isLoading}>
                        {isLoading ? 'A criar...' : 'Finalizar e Criar Ficha'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NovaFichaPage;