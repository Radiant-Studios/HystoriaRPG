import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/authSlice';
import styles from '../styles/AuthForm.module.css';
// 1. IMPORTAMOS O ÍCONE DE E-MAIL AQUI
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';

// Componente reutilizável para o campo de senha
const PasswordInput = ({ value, onChange, name = "senha", placeholder = "Senha" }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles.inputbox}>
            <input 
                type={showPassword ? 'text' : 'password'} 
                value={value}
                name={name}
                onChange={onChange} 
                placeholder={placeholder} 
                required 
            />
            <span className={styles.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
    );
};

// Formulário de Login
const LoginForm = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, isAuthenticated } = useSelector((state) => state.auth);

    const handleSubmit = (e) => { e.preventDefault(); dispatch(loginUser({ email, senha })); };
    
    useEffect(() => { if (isAuthenticated) navigate('/fichas'); }, [isAuthenticated, navigate]);

    return (
        <div className={styles.formBox}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {status === 'failed' && error && <p className={styles.errorMessage}>{error}</p>}
                {/* 2. ADICIONAMOS O ÍCONE NO CAMPO DE E-MAIL */}
                <div className={styles.inputbox}>
                    <FaEnvelope className={styles.inputIcon} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <PasswordInput value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type="submit" className={styles.btn} disabled={status === 'loading'}>Entrar</button>
                <div className={styles.switchLink}>
                    <p>Não tem uma conta? <a onClick={onSwitch}>Registre-se</a></p>
                </div>
            </form>
        </div>
    );
};

// Formulário de Registro
const RegistroForm = ({ onSwitch }) => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ username: '', email: '', senha: '', confirmaSenha: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); dispatch(registerUser(formData)); };
    
    useEffect(() => { if (status === 'succeeded' && !error) setSuccess(true); }, [status, error]);

    if (success) {
        return (
            <div className={styles.formBox}>
                <h1>Registro Realizado!</h1>
                <p className={styles.successMessage}>Conta criada! Volte para a tela de login para entrar.</p>
                <button className={styles.btn} onClick={onSwitch}>Ir para Login</button>
            </div>
        );
    }
    
    return (
        <div className={styles.formBox}>
            <h1>Criar Conta</h1>
            <form onSubmit={handleSubmit}>
                {status === 'failed' && error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.inputbox}><input type="text" name="username" placeholder="Nome de Usuário" onChange={handleChange} required /></div>
                {/* 3. ADICIONAMOS O ÍCONE NO CAMPO DE E-MAIL */}
                <div className={styles.inputbox}>
                    <FaEnvelope className={styles.inputIcon} />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <PasswordInput name="senha" value={formData.senha} onChange={handleChange} />
                <PasswordInput name="confirmaSenha" value={formData.confirmaSenha} onChange={handleChange} placeholder="Confirmar Senha" />
                <button type="submit" className={styles.btn} disabled={status === 'loading'}>Registrar</button>
                <div className={styles.switchLink}><p>Já tem uma conta? <a onClick={onSwitch}>Faça o login</a></p></div>
            </form>
        </div>
    );
};

// Componente principal da página de autenticação
function AuthPage() {
    const [showRegister, setShowRegister] = useState(false);
    const handleSwitch = (e) => { e.preventDefault(); setShowRegister(!showRegister); };

    return (
        <div className={styles.authPageContainer}>
            <div className={`${styles.flipContainer} ${showRegister ? styles.showRegister : ''}`}>
                <div className={styles.flipper}>
                    <div className={styles.front}>
                        <LoginForm onSwitch={handleSwitch} />
                    </div>
                    <div className={styles.back}>
                        <RegistroForm onSwitch={handleSwitch} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;