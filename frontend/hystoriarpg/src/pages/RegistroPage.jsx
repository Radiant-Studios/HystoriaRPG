import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import styles from '../styles/AuthForm.module.css'; // Importa o mesmo estilo

function RegistroPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: '', email: '', senha: '', confirmaSenha: '' });
  const [registroSucesso, setRegistroSucesso] = useState(false);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    dispatch(registerUser(formData));
  };
  
  useEffect(() => {
    if (status === 'succeeded' && !error) {
        setRegistroSucesso(true);
        setTimeout(() => navigate('/login'), 3000);
    }
  }, [status, error, navigate]);

  if (registroSucesso) {
    return (
        <div className={styles.authPageContainer}>
            <div className={styles.formBox}>
                <h1>Registro Realizado!</h1>
                <p className={styles.successMessage}>Seu usuário foi criado com sucesso. Redirecionando para a página de login...</p>
            </div>
        </div>
    );
  }

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.formBox}>
        <h1>Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          {status === 'failed' && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.inputbox}>
            <input type="text" name="username" placeholder="Nome de Usuário" onChange={handleChange} required />
          </div>
          <div className={styles.inputbox}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className={styles.inputbox}>
            <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
          </div>
          <div className={styles.inputbox}>
            <input type="password" name="confirmaSenha" placeholder="Confirmar Senha" onChange={handleChange} required />
          </div>
          <button type="submit" className={styles.btn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Registrando...' : 'Registrar'}
          </button>
          <div className={styles.switchLink}>
            <p>Já tem uma conta? <Link to="/login">Faça o login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegistroPage;