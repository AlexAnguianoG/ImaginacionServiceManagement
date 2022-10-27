import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/CreateService.css';
import { CREATE_IMA_SERVICE } from '../graphql/mutations';
import { useMutation } from '../graphql/index';
function CreateService() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [employeeNotes, setEmployeeNotes] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [toPickup, setToPickup] = useState(false);
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');
  const [deviceNotes, setDeviceNotes] = useState('');

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const createService = async () => {
    if (
      !clientName &&
      !clientEmail &&
      !entryDate &&
      !toPickup &&
      !deviceModel &&
      !deviceCondition
    ) {
      alert('Por favor rellene todos los campos obligatorios');
      return;
    }
    const createImaServiceInput = {
      clientName: clientName,
      clientEmail: clientEmail,
      clientComment: clientComment,
      employeeNotes: employeeNotes,
      entryDate: entryDate,
      toPickup: toPickup,
      deviceModel: deviceModel,
      deviceCondition: deviceCondition,
      deviceNotes: deviceNotes,
    };
    const { data, errors } = await useMutation(CREATE_IMA_SERVICE, {
      createImaServiceInput: createImaServiceInput,
    });
    if (data) {
      navigate('/servicios', { replace: true });
    } else if (errors) {
      console.log(errors);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/servicios', { replace: true });
  }, [user, loading]);
  return (
    <div className="create-service-card">
      <div className="create-service-form">
        <h2>Crear servicio</h2>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="form-control"
          placeholder="Nombre del cliente *"
        />
        <input
          type="text"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className="form-control"
          placeholder="Correo eletrónico del cliente *"
        />
        <input
          type="text"
          value={clientComment}
          onChange={(e) => setClientComment(e.target.value)}
          className="form-control"
          placeholder="Comentario del cliente"
        />
        <input
          type="text"
          value={employeeNotes}
          onChange={(e) => setEmployeeNotes(e.target.value)}
          className="form-control"
          placeholder="Notas del empleado"
        />
        <input
          type="text"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          className="form-control"
          placeholder="Fecha de entrada *"
        />
        <input
          type="text"
          value={deviceModel}
          onChange={(e) => setDeviceModel(e.target.value)}
          className="form-control"
          placeholder="Modelo del equipo *"
        />
        <input
          type="text"
          value={deviceCondition}
          onChange={(e) => setDeviceCondition(e.target.value)}
          className="form-control"
          placeholder="Condición del equipo *"
        />
        <input
          type="text"
          value={deviceNotes}
          onChange={(e) => setDeviceNotes(e.target.value)}
          className="form-control"
          placeholder="Notas del equipo"
        />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={toPickup}
            id="flexCheckDefault"
            onChange={() => setToPickup(!toPickup)}
          />
          <label className="form-check-label">
            El equipo se recolectó con el cliente
          </label>
        </div>
        <div className="d-grid">
          <button className="btn btn-danger" onClick={createService}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateService;
