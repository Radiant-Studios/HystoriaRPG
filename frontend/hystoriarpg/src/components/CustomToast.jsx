import React from 'react';
import styles from './CustomToast.module.css';

function CustomToast({ title, diceValue, bonus, total, critStatus }) {
    // Define a classe CSS para o título com base no status
    let titleClass = styles.title;
    if (critStatus === 'critical') {
        titleClass = styles.criticalTitle;
    } else if (critStatus === 'fumble') {
        titleClass = styles.fumbleTitle;
    }

    // Define a classe CSS para os números
    const numberClass = {
        critical: styles.criticalResult,
        fumble: styles.fumbleResult,
        normal: ''
    }[critStatus];

    return (
        <div className={styles.toastContent}>
            <div className={titleClass}>{title}</div>
            <div className={styles.rollDetails}>
                Rolagem: 1d20(<strong className={numberClass}>{diceValue}</strong>) + {bonus} = <strong className={numberClass}>{total}</strong>
            </div>
        </div>
    );
}

export default CustomToast;