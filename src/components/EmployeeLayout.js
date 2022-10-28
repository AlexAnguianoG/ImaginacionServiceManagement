import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
import '../styles/EmployeeLayout.css';

function EmployeeLayout() {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
  }, [user, loading]);
  const handleServices = () => {
    navigate('/servicios');
  };
  const handleCreateService = () => {
    navigate('/crear-servicio');
  };
  return (
    <>
      <nav className="navbar">
        <h3 className="navbar-logo-text">Imaginación</h3>
        <nav className="navbar-menu">
          <div>
            <button
              type="button"
              className={
                location.pathname === '/servicios'
                  ? 'btn link active'
                  : 'btn link'
              }
              onClick={() => handleServices()}
            >
              Servicios
            </button>
          </div>
          <div>
            <button
              type="button"
              className={
                location.pathname === '/crear-servicio'
                  ? 'btn link active'
                  : 'btn link'
              }
              onClick={() => handleCreateService()}
            >
              Crear servicio
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      </nav>
      <div className="not-repeated-bkg">
        <Outlet />
      </div>
    </>
  );
}

export default EmployeeLayout;
