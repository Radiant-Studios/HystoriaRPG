import React from 'react';
import styles from '../pages/NovaFicha.module.css'; // Reutilizando o mesmo CSS

const ATRIBUTOS_LISTA = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];

// Custo de pontos para cada valor de atributo base em Tormenta 20
const PONTO_CUSTO = { 0: 0, 1: 1, 2: 2, 3: 4, 4: 7 };

const Atributo = ({ nome, bonusRacial, valorBase, onAumentar, onDiminuir, podeAumentar }) => {
    const valorTotal = valorBase + bonusRacial;
    const modificador = Math.floor((valorTotal - 10) / 2);

    return (
        <div className={styles.atributoBox}>
            <h3>{nome.toUpperCase().substring(0, 3)}</h3>
            <div className={styles.valorTotal}>{valorTotal}</div>
            <div className={styles.modificador}>{modificador >= 0 ? `+${modificador}` : modificador}</div>
            <div className={styles.controlesBase}>
                <button onClick={onDiminuir} disabled={valorBase <= 0}>-</button>
                <span className={styles.valorBase}>{valorBase}</span>
                <button onClick={onAumentar} disabled={!podeAumentar || valorBase >= 4}>+</button>
            </div>
        </div>
    );
};

function AtributosAllocator({ personagem, onComplete }) {
    const [atributosBase, setAtributosBase] = React.useState({
        forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0
    });

    const calcularCustoTotal = (attrs) => {
        return Object.values(attrs).reduce((total, val) => total + PONTO_CUSTO[val], 0);
    };

    const custoAtual = calcularCustoTotal(atributosBase);
    const pontosDisponiveis = 10 - custoAtual;

    const handleMudancaAtributo = (attr, delta) => {
        const valorAtual = atributosBase[attr];
        const novoValor = valorAtual + delta;

        if (novoValor < 0 || novoValor > 4) return;

        const novosAtributos = { ...atributosBase, [attr]: novoValor };
        
        if (calcularCustoTotal(novosAtributos) > 10) return; // Não permite gastar mais pontos

        setAtributosBase(novosAtributos);
    };
    
    return (
        <div>
            <h1 className={styles.title}>Distribua seus Pontos</h1>
            <div className={styles.pontosInfo}>
                Pontos Disponíveis: <span>{pontosDisponiveis}</span>
            </div>
            <div className={styles.atributosContainer}>
                {ATRIBUTOS_LISTA.map(attr => (
                    <Atributo
                        key={attr}
                        nome={attr}
                        bonusRacial={personagem.atributos[attr] || 0}
                        valorBase={atributosBase[attr]}
                        onAumentar={() => handleMudancaAtributo(attr, 1)}
                        onDiminuir={() => handleMudancaAtributo(attr, -1)}
                        podeAumentar={pontosDisponiveis >= (PONTO_CUSTO[atributosBase[attr] + 1] - PONTO_CUSTO[atributosBase[attr]])}
                    />
                ))}
            </div>
             <div className={styles.buttons} style={{marginTop: '40px'}}>
                <button 
                    className={styles.btnSelect} 
                    onClick={() => onComplete(atributosBase)}
                    disabled={pontosDisponiveis > 0}
                >
                    {pontosDisponiveis > 0 ? `Faltam ${pontosDisponiveis} pontos` : 'Confirmar Atributos'}
                </button>
            </div>
        </div>
    );
}

export default AtributosAllocator;