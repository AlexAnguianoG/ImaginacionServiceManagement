import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/ClientService.css';
import { GET_IMA_SERVICE } from '../graphql/queries';
import { useQuery } from '../graphql/index';
function ClientService() {
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const getServiceStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Por revisar';
      case 'diagnosis':
        return 'En diagnóstico';
      case 'valued':
        return 'Cotizado';
      case 'client authorized':
        return 'Autorizado por el cliente';
      case 'in repair':
        return 'En reparación';
      case 'completed':
        return 'Completado';
      default:
        return 'Por revisar';
    }
  };
  useEffect(() => {
    async function fetchService() {
      try {
        const { data, errors } = await useQuery(GET_IMA_SERVICE, {
          id: parseInt(location.state.serviceId),
        });
        if (data) {
          if(data.imaService.client.phone !== location.state.clientPhone){
            throw Error;
          }
          setService(data.imaService);
        } else if (errors) {
          console.log(errors);
        }
      } catch {
        navigate("/buscar-servicio")
        alert("Información incorrecta")
      }
    }
    fetchService();
  }, [location.state]);

  return (
    service && (
      <div className="repeated-bkg">
        <div className="client-service-card">
          <h3 className="mb-4">Servicio #{service.id}</h3>
          <div>
            <span>Estatus del servicio:</span> {getServiceStatus(service.status)}
          </div>
          <div>
            <span>Nombre del cliente:</span> {service.client.name}
          </div>
          <div>
            <span>Teléfono del cliente:</span> {service.client.phone}
          </div>
          <div>
            <span>Correo electrónico del cliente:</span> {service.client.email}
          </div>
          <div>
            <span>Número de serie del equipo:</span> {service.deviceSerialNumber}
          </div>
          <div>
            <span>Modelo del equipo:</span> {service.deviceModel}
          </div>
          <div>
            <span>Fecha de entrada:</span> {service.entryDate}
          </div>
          <div>
            <span>Fecha de salida:</span>{' '}
            {service.departureDate ? service.departureDate : '-'}
          </div>
          <div>
            <span>Porcentaje de completado:</span> {service.completedPercent}%
          </div>
          <div>
            <span>Costo:</span> {' '}
            {service.cost !== 0 ? '$' + service.cost : 'Esperando diagnóstico'}
          </div>
          <div className="mt-4 text-center">
            <Link to="/buscar-servicio" className="text-secondary">
              Buscar otro servicio
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
export default ClientService;
