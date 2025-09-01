import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './ConfiguracoesPage.module.css';
import { checkAuthStatus } from '../redux/authSlice'; // Importamos para atualizar os dados do utilizador

function ConfiguracoesPage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Estados para controlar a UI (qual secção está a ser editada)
    const [editingSection, setEditingSection] = useState(null); // 'username', 'email', ou null
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    // Estados para os valores dos formulários
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState({ newPass: '', confirmPass: '' });
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicName, setProfilePicName] = useState('Nenhum ficheiro escolhido');

    // Atualiza os formulários se os dados do utilizador no Redux mudarem
    useEffect(() => {
        setUsername(user?.username || '');
        setEmail(user?.email || '');
    }, [user]);

    // Função para mostrar feedback (mensagens de sucesso/erro)
    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
    };

    // --- LÓGICA DE SUBMISSÃO DOS FORMULÁRIOS ---

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/usuario/atualizar_username', { username }, { withCredentials: true });
            showFeedback('Nome de utilizador atualizado com sucesso!', 'success');
            dispatch(checkAuthStatus()); // Atualiza os dados em toda a app
            setEditingSection(null); // Fecha o formulário
        } catch (err) {
            showFeedback(err.response?.data?.erro || 'Erro ao atualizar.', 'error');
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/usuario/atualizar_email', { email }, { withCredentials: true });
            showFeedback(response.data.sucesso || 'Email atualizado! Verifique a sua caixa de entrada.', 'success');
            dispatch(checkAuthStatus());
            setEditingSection(null);
        } catch (err) {
            showFeedback(err.response?.data?.erro || 'Erro ao atualizar e-mail.', 'error');
        }
    };
    
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password.newPass.length < 6) {
            return showFeedback('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        }
        if (password.newPass !== password.confirmPass) {
            return showFeedback('As senhas não coincidem.', 'error');
        }
        try {
            await axios.post('http://localhost:5000/api/usuario/atualizar_senha', { password: password.newPass }, { withCredentials: true });
            showFeedback('Senha atualizada com sucesso!', 'success');
            setPassword({ newPass: '', confirmPass: '' }); // Limpa os campos
        } catch (err) {
            showFeedback(err.response?.data?.erro || 'Erro ao atualizar a senha.', 'error');
        }
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        if (!profilePic) return;
        
        const formData = new FormData();
        formData.append('uploadFotodePerfil', profilePic);

        try {
            await axios.post('http://localhost:5000/api/usuario/atualizar_foto_perfil', formData, { withCredentials: true });
            showFeedback('Foto de perfil atualizada!', 'success');
            dispatch(checkAuthStatus());
            setProfilePic(null);
            setProfilePicName('Nenhum ficheiro escolhido');
        } catch (err) {
            showFeedback(err.response?.data?.erro || 'Erro no upload.', 'error');
        }
    };

    return (
        <main className={styles.main}>
            <h1>Configurações da Conta</h1>
            {feedback.message && <div className={styles[feedback.type]}>{feedback.message}</div>}

            {/* Secção da Foto de Perfil */}
            <section className={styles.configSection}>
                <div className={styles.sectionHeader}><h2>Foto de Perfil</h2></div>
                <div className={styles.profilePicContainer}>
                    <img src={user?.foto_perfil_url || '/images/default-avatar.jpg'} alt="Foto de Perfil" className={styles.profilePic} />
                    <form onSubmit={handlePhotoSubmit} className={styles.photoForm}>
                        <label htmlFor="file-upload" className={styles.fileUploadLabel}>{profilePicName}</label>
                        <input id="file-upload" type="file" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setProfilePic(file);
                                setProfilePicName(file.name);
                            }
                        }} accept="image/*" style={{ display: 'none' }} />
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={!profilePic}>Salvar Foto</button>
                    </form>
                </div>
            </section>

            {/* Secção de Nome de Utilizador */}
            <section className={styles.configSection}>
                <div className={styles.sectionHeader}>
                    <h2>Nome de Utilizador</h2>
                    {editingSection !== 'username' && <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => setEditingSection('username')}>Editar</button>}
                </div>
                {editingSection === 'username' ? (
                    <form className={styles.editForm} onSubmit={handleUsernameSubmit}>
                        <div className={styles.formGroup}><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                        <div className={styles.formActions}>
                            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Salvar</button>
                            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => { setEditingSection(null); setUsername(user.username); }}>Cancelar</button>
                        </div>
                    </form>
                ) : (
                    <div className={styles.displayInfo}><p>{user?.username}</p></div>
                )}
            </section>
            
            {/* Secção de Email */}
            <section className={styles.configSection}>
                 <div className={styles.sectionHeader}>
                    <h2>Email</h2>
                    {editingSection !== 'email' && <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => setEditingSection('email')}>Editar</button>}
                </div>
                {editingSection === 'email' ? (
                    <form className={styles.editForm} onSubmit={handleEmailSubmit}>
                        <div className={styles.formGroup}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className={styles.formActions}>
                            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Salvar</button>
                            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => { setEditingSection(null); setEmail(user.email); }}>Cancelar</button>
                        </div>
                    </form>
                ) : (
                    <div className={styles.displayInfo}><p>{user?.email}</p></div>
                )}
            </section>

            {/* Secção de Senha */}
            <section className={styles.configSection}>
                <div className={styles.sectionHeader}><h2>Alterar Senha</h2></div>
                <form className={styles.editForm} onSubmit={handlePasswordSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nova Senha</label>
                        <input type="password" value={password.newPass} onChange={(e) => setPassword({...password, newPass: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Confirmar Nova Senha</label>
                        <input type="password" value={password.confirmPass} onChange={(e) => setPassword({...password, confirmPass: e.target.value})} />
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Alterar Senha</button>
                    </div>
                </form>
            </section>

        </main>
    );
}

export default ConfiguracoesPage;