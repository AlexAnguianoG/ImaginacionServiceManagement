import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationLayout from './components/AuthenticationLayout';
import EmployeeLayout from './components/EmployeeLayout';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Services from './components/Services';
import Service from './components/Service';
import CreateService from './components/CreateService';
import SearchService from "./components/SearchService";
import ClientService from "./components/ClientService";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthenticationLayout />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Register />} />
          <Route exact path="/cambiar-contraseña" element={<ResetPassword />} />
        </Route>
        <Route element={<EmployeeLayout />}>
          <Route exact path="/crear-servicio" element={<CreateService />} />
          <Route exact path="/servicios" element={<Services />} />
          <Route exact path="/servicio/:id" element={<Service />} />
        </Route>
        <Route exact path="/buscar-servicio" element={<SearchService />} />
        <Route exact path="/servicio-cliente" element={<ClientService />} />
      </Routes>
    </Router>
  );
}

export default App;
