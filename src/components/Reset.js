import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../firebase';
import '../styles/Reset.css';
function Reset() {
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/inicio');
  }, [user, loading]);
  return (
    <div className="reset-card">
      <form className="reset-form">
        <h2>Restablecimiento de contraseña</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Correo electrónico"
        />

        <div className="d-grid">
          <button
            className="btn btn-danger"
            onClick={() => sendPasswordReset(email)}
          >
            Enviar
          </button>
        </div>
        <div className="text-secondary">
          ¿No tienes una cuenta?
          <Link to="/registro" className="text-secondary">
            Registrate
          </Link>
          ahora.
        </div>
      </form>
    </div>
  );
}
export default Reset;
