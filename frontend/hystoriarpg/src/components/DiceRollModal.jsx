import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DiceRollModal.module.css';

function DiceRollModal({ isOpen, onClose, rollResult }) {
    if (!isOpen || !rollResult) {
        return null;
    }

    // Usamos um Portal para garantir que o modal sempre fique por cima de tudo
    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                
                <h2 className={styles.title}>Teste de {rollResult.skillName}</h2>

                <div className={styles.resultGrid}>
                    <div className={styles.resultBox}>
                        <span className={styles.resultLabel}>Resultado do Dado</span>
                        <span className={styles.diceValue}>{rollResult.diceValue}</span>
                    </div>
                    <div className={styles.resultBox}>
                        <span className={styles.resultLabel}>Modificadores</span>
                        <span className={styles.bonusValue}>
                            {rollResult.bonus >= 0 ? `+${rollResult.bonus}` : rollResult.bonus}
                        </span>
                    </div>
                </div>

                <div className={styles.finalResultBox}>
                    <span className={styles.resultLabel}>Resultado Final</span>
                    <span className={styles.finalValue}>{rollResult.total}</span>
                </div>

                <button className={styles.closeButton} onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default DiceRollModal;