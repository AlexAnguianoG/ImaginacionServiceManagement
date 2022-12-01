import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Service.css';
import { auth } from '../firebase';
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
      <div className="service-card">
        <h3 className="mb-4">Servicio #{service.id}</h3>
        <div>
          <span>Estatus del servicio:</span> {getServiceStatus(service.status)}
        </div>
        <div>
          <span>Id del empleado:</span> {(service.employeeId)}
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
          <span>Condición del equipo:</span> {service.deviceCondition}
        </div>
        <div>
          <span>Notas del equipo:</span>{' '}
          {service.deviceNotes ? service.deviceNotes : '-'}
        </div>
        <div>
          <span>Comentario del cliente:</span>{' '}
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
          <span>Porcentaje de completado:</span> {service.completedPercent}%
        </div>
        <div>
          <span>Metodo de entrada del equipo:</span>{' '}
          {service.toPickup
            ? 'Recolección con el cliente'
            : 'Recibido en sucursal'}
        </div>
      </div>
    )
  );
}
export default Service;
