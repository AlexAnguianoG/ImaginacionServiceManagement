import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import Services from './components/Services';
import Service from './components/Service';
import CreateService from './components/CreateService';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/registro" element={<Register />} />
          <Route exact path="/cambiar-credenciales" element={<Reset />} />
          <Route exact path="/crear-servicio" element={<CreateService />} />
          <Route exact path="/servicios" element={<Services />} />
          <Route exact path="/servicio/:id" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
