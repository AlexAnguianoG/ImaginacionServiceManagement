import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../firebase';
import '../styles/Register.css';
import { CREATE_EMPLOYEE } from '../graphql/mutations';
import { useMutation } from '../graphql/index';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = async () => {
    if (!name) {
      alert('Por favor ingrese un nombre');
      return;
    }
    const user_data = await registerWithEmailAndPassword(email, password);
    if (user_data != null) {
      const createEmployeeInput = {
        name: name,
        authId: user_data.uid,
        email: email,
      };
      const { data, errors } = await useMutation(CREATE_EMPLOYEE, {
        createEmployeeInput: createEmployeeInput,
      });
      if (data) {
        navigate('/servicios', { replace: true });
      } else if (errors) {
        console.log(errors);
      }
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/servicios', { replace: true });
  }, [user, loading]);
  return (
    <div className="register-card">
      <div className="register-form">
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
          <button className="btn btn-danger" onClick={register}>
            Registrar
          </button>
        </div>
        <div className="text-secondary">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-secondary">
            Ingresa
          </Link>{' '}
          ahora.
        </div>
      </div>
    </div>
  );
}
export default Register;
