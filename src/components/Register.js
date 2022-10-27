import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../firebase';
import '../styles/Register.css';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/inicio', { replace: true });
  }, [user, loading]);
  return (
    <div className="register-card">
      <form className="register-form">
        <h2>Registro</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Nombre completo"
        />
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
        <div className="d-grid">
          <button type="submit" className="btn btn-danger" onClick={register}>
            Register
          </button>
        </div>
        <div className="text-secondary">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-secondary">
            Ingresa
          </Link>{' '}
          ahora.
        </div>
      </form>
    </div>
  );
}
export default Register;
