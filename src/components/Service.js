import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Service.css';
import { auth, logout } from '../firebase';
import { GET_IMA_SERVICE } from '../graphql/queries';
import { useQuery } from '../graphql/index';
function Service() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [user, loading] = useAuthState(auth);
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
    if (loading) return;
    if (!user) return navigate('/');
    async function fetchService() {
      const { data, errors } = await useQuery(GET_IMA_SERVICE, {
        id: parseInt(id),
      });
      if (data) {
        setService(data.imaService);
      } else if (errors) {
        console.log(errors);
      }
    }
    fetchService();
  }, [user, loading]);

  return (
    service && (
      <div className="services-card">
        <div className="d-grid mb-5">
          Iniciado sesión con:
          <div>{user ? user.email : ''}</div>
          <button className="btn btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
        <div scope="row">
          <span>Id del servicio:</span> {service.id}
        </div>
        <div>
          <span>Modelo del equipo:</span> {service.deviceModel}
        </div>
        <div>
          <span>Nombre del cliente:</span> {service.client.name}
        </div>
        <div>
          <span>Correo del cliente:</span> {service.client.email}
        </div>
        <div>
          <span>Comentario cliente:</span>{' '}
          {service.clientComment ? service.clientComment : '-'}
        </div>
        <div>
          <span>Notas del empleado:</span>{' '}
          {service.employeeNotes ? service.employeeNotes : '-'}
        </div>
        <div>
          <span>Fecha de entrada:</span> {service.entryDate}
        </div>
        <div>
          <span>Fecha de salida:</span>{' '}
          {service.departureDate ? service.departureDate : '-'}
        </div>
        <div>
          <span>Porcentaje de completado:</span>{' '}
          {service.completedPercent ? service.completedPercent : '-'}
        </div>
        <div>
          <span>Metodo de entrada del equipo:</span>{' '}
          {service.toPickup
            ? 'Recolección con el cliente'
            : 'Recibido en sucursal'}
        </div>
        <div>
          <span>Condición del equipo:</span> {service.deviceCondition}
        </div>
        <div>
          <span>Notas del equipo:</span>{' '}
          {service.deviceNotes ? service.deviceNotes : '-'}
        </div>
        <div>
          <span>Estatus del servicio:</span> {getServiceStatus(service.status)}
        </div>
      </div>
    )
  );
}
export default Service;
