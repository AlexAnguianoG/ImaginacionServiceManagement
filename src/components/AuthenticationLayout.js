import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthenticationLayout() {
  return (
    <>
      <div className="repeated-bkg">
        <Outlet />
      </div>
    </>
  );
}

export default AuthenticationLayout;
