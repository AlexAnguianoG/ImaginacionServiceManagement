import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/Login.css';
// import { useQuery } from '@apollo/client';
// import { GET_IMA_SERVICES } from '../graphql/queries';
function Login() {
  // const { error, data } = useQuery(GET_IMA_SERVICES);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/servicios');
    // if (error) return <p>Error :(</p>;
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
            onClick={() => logInWithEmailAndPassword(email, password)}
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
