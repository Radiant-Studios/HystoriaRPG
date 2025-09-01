import React, { useState } from 'react';
import styles from './EditableField.module.css';

function EditableField({ initialValue, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        // Só salva se o valor realmente mudou
        if (value !== initialValue) {
            onSave(value);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            // Cancela a edição, revertendo para o valor inicial
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave} // Salva quando o campo perde o foco
                onKeyDown={handleKeyDown} // Salva com Enter, cancela com Esc
                autoFocus // Foca no input assim que ele aparece
                className={styles.input}
            />
        );
    }

    return (
        <span onClick={() => setIsEditing(true)} className={styles.span}>
            {initialValue}
        </span>
    );
}

export default EditableField;