import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import styles from '../styles/AuthForm.module.css'; // Importa o novo estilo

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, senha }));
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/fichas');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.formBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {status === 'failed' && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.inputbox}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className={styles.inputbox}>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
          </div>
          <button type="submit" className={styles.btn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Entrando...' : 'Entrar'}
          </button>
          <div className={styles.switchLink}>
            <p>Não tem uma conta? <Link to="/registrar">Registre-se</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;