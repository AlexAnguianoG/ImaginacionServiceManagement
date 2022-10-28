import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';
import { GET_IMA_SERVICES } from '../graphql/queries';
import { useQuery } from '../graphql/index';
function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const getServiceStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Por revisar';
      default:
        return 'Por revisar';
    }
  };
  useEffect(() => {
    async function fetchServices() {
      const { data, errors } = await useQuery(GET_IMA_SERVICES);
      if (data) {
        setServices(data.imaServices);
      } else if (errors) {
        console.log(errors);
      }
    }
    fetchServices();
  }, []);
  return (
    <div className="services-card">
      <h3 className="mb-4">Servicios</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Equipo</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha entrada</th>
            <th scope="col">Fecha salida</th>
            <th scope="col">Falla/Motivo</th>
            <th scope="col">Estatus</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, i) => (
            <tr key={i}>
              <th scope="row">{service.id}</th>
              <td>{service.deviceModel}</td>
              <td>{service.client.name}</td>
              <td>{service.entryDate}</td>
              <td>{service.departureDate ? service.departureDate : '-'}</td>
              <td>{service.deviceCondition}</td>
              <td>{getServiceStatus(service.status)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate(`/servicio/${service.id}`)}
                >
                  Entrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!services && <p className="mt-1 mb-5">No hay servicios regsitrados</p>}
    </div>
  );
}
export default Services;
