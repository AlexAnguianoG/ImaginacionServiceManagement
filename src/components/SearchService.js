import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchService.css';

function SearchService() {
  const [serviceId, setServiceId] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const navigate = useNavigate();
  const searchService = async (serviceIdInput, clientPhoneInput) => {
    if (!serviceIdInput || !clientPhoneInput) {
      alert('Por favor rellene los campos');
      return;
    }
    navigate('/servicio-cliente', {state:{ serviceId: serviceIdInput, clientPhone: clientPhoneInput }});
  };
  return (
    <div className="repeated-bkg">
      <div className="search-service-card">
        <div className="search-service-form">
          <h2>Buscar servicio</h2>
          <input
            type="text"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="form-control"
            placeholder="Número de folio"
          />
          <input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="form-control"
            placeholder="Télefono"
          />
          <div className="d-grid">
            <button
              onClick={() => searchService(serviceId, clientPhone)}
              className="btn btn-danger"
            >
              Acceder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchService;
