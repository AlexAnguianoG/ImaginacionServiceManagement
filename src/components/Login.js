import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const login = async (emailInput, passwordInput) => {
    if (!emailInput || !passwordInput) {
      alert('Por favor rellene los campos');
      return;
    }
    await logInWithEmailAndPassword(emailInput, passwordInput);
  };
  useEffect(() => {
    if (loading) return;

    if (user) navigate('/servicios');
  }, [user, loading]);
  return (
    <div className="login-card">
      <div className="login-form">
        <h2>Inicio de sesión</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Contraseña"
        />
        <div>
          <Link to="/cambiar-contraseña" className="text-secondary">
            ¿Se te olvidó la contraseña?
          </Link>
        </div>
        <div className="d-grid">
          <button
            onClick={() => login(email, password)}
            className="btn btn-danger"
          >
            Ingresar
          </button>
        </div>
        <div>
          <Link to="/registro" className="text-secondary">
            Registro
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
