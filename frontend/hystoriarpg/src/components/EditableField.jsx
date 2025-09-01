import React, { useState } from 'react';
import styles from './EditableField.module.css';

function EditableField({ initialValue, onSave, isTitle = false }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        if (String(value) !== String(initialValue)) {
            onSave(value);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setValue(initialValue);
            setIsEditing(false);
        }
    };
    
    const spanClass = isTitle ? styles.titleSpan : styles.span;
    const inputClass = isTitle ? styles.titleInput : styles.input;

    if (isEditing) {
        return (
            <input
                type={typeof initialValue === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
                className={inputClass}
            />
        );
    }

    return (
        <span onClick={() => setIsEditing(true)} className={spanClass}>
            {initialValue}
        </span>
    );
}

export default EditableField;