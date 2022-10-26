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
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/inicio');
  }, [user, loading]);
  return (
    <div className="login-card">
      <form className="login-form">
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
          <Link to="/cambiar-credenciales">¿Se te olvidó la contraseña?</Link>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            onClick={() => logInWithEmailAndPassword(email, password)}
            className="btn btn-primary"
          >
            Ingresar
          </button>
        </div>
        <div className="mt-2">
          <Link to="/registro">Registro</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
