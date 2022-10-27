import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';
import { auth, logout } from '../firebase';
// import { useQuery } from '@apollo/client';
// import { GET_SERVICES, } from '../graphql/queries';
function Services() {
  // const { error, data } = useQuery(GET_SERVICES);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]);
  return (
    <div className="services">
      <div className="services__container">
        Logged in as
        <div>{user ? user.email : ''}</div>
        <button className="services__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Services;
