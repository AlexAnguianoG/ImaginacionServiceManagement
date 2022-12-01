import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Service.css';
import { auth } from '../firebase';
import { GET_IMA_SERVICE } from '../graphql/queries';
import { UPDATE_IMA_SERVICE } from '../graphql/mutations';
import { useQuery, useMutation } from '../graphql/index';
function Service() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [clientComment, setClientComment] = useState('');
  const [employeeNotes, setEmployeeNotes] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [toPickup, setToPickup] = useState(false);
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');
  const [deviceNotes, setDeviceNotes] = useState('');
  const [deviceSerialNumber, setDeviceSerialNumber] = useState('');
  const [completedPercent, setCompletedPercent] = useState('');
  const [cost, setCost] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceNote, setInvoiceNote] = useState('');
  const [status, setStatus] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
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
  const updateService = async () => {
    if (
      !entryDate ||
      !deviceModel ||
      !deviceCondition ||
      !deviceSerialNumber || 
      !status
    ) {
      alert('Por favor rellene todos los campos obligatorios');
      return;
    }
    const updateImaServiceInput = {
      id: parseInt(id),
      clientComment: clientComment,
      employeeNotes: employeeNotes,
      entryDate: entryDate,
      departureDate: departureDate,
      toPickup: toPickup,
      deviceCondition: deviceCondition,
      deviceModel: deviceModel,
      deviceNotes: deviceNotes,
      deviceSerialNumber: deviceSerialNumber,
      completedPercent: parseInt(completedPercent),
      cost: parseFloat(cost),
      diagnosis: diagnosis,
      invoiceId: invoiceId,
      invoiceNote: invoiceNote,
      status: status,
    };
    const { data, errors } = await useMutation(UPDATE_IMA_SERVICE, {
      updateImaServiceInput: updateImaServiceInput,
    });
    if (data) {
      navigate(0);
    } else if (errors) {
      console.log(errors);
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
        setClientComment(data.imaService.clientComment)
        setEmployeeNotes(data.imaService.employeeNotes)
        setEntryDate(data.imaService.entryDate)
        setDepartureDate(data.imaService.departureDate)
        setToPickup(data.imaService.toPickup)
        setDeviceModel(data.imaService.deviceModel)
        setDeviceCondition(data.imaService.deviceCondition)
        setDeviceNotes(data.imaService.deviceNotes)
        setDeviceSerialNumber(data.imaService.deviceSerialNumber)
        setCompletedPercent(data.imaService.completedPercent)
        setCost(data.imaService.cost)
        setDiagnosis(data.imaService.diagnosis)
        setInvoiceId(data.imaService.invoiceId)
        setInvoiceNote(data.imaService.invoiceNote)
        setStatus(data.imaService.status)
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
        {
          isEditing 
            ? 
              <div className="service-form">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <select class="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option selected>Estatus</option>
                        <option value="pending">Por revisar</option>
                        <option value="diagnosis">En diagnóstico</option>
                        <option value="valued">Cotizado</option>
                        <option value="client authorized">Autorizado por el cliente</option>
                        <option value="in repair">En reparación</option>
                        <option value="completed">Completado</option>
                      </select>
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <input
                        type="text"
                        value={completedPercent}
                        onChange={(e) => setCompletedPercent(e.target.value)}
                        className="form-control"
                        placeholder="Porcentaje de completado *"
                      />
                    </div>
                    <div className="col">
                      <textarea
                        rows="2"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="form-control"
                        placeholder="Diagnóstico"
                      />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <input
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className="form-control"
                        placeholder="Fecha de entrada *"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="form-control"
                        placeholder="Fecha de salida *"
                      />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <input
                        type="text"
                        value={invoiceId}
                        onChange={(e) => setInvoiceId(e.target.value)}
                        className="form-control"
                        placeholder="Folio de cotización"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        className="form-control"
                        placeholder="Costo *"
                      />
                    </div>
                    <div className="col">
                      <textarea
                        rows="2"
                        value={invoiceNote}
                        onChange={(e) => setInvoiceNote(e.target.value)}
                        className="form-control"
                        placeholder="Nota de cotización"
                      />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <input
                        type="text"
                        value={deviceSerialNumber}
                        onChange={(e) => setDeviceSerialNumber(e.target.value)}
                        className="form-control"
                        placeholder="Número de serie del equipo *"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        value={deviceModel}
                        onChange={(e) => setDeviceModel(e.target.value)}
                        className="form-control"
                        placeholder="Modelo del equipo *"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        value={deviceCondition}
                        onChange={(e) => setDeviceCondition(e.target.value)}
                        className="form-control"
                        placeholder="Condición del equipo *"
                      />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <textarea
                        rows="2"
                        value={deviceNotes}
                        onChange={(e) => setDeviceNotes(e.target.value)}
                        className="form-control"
                        placeholder="Notas del equipo"
                      />
                    </div>
                    <div className="col">
                      <textarea
                        rows="2"
                        value={clientComment}
                        onChange={(e) => setClientComment(e.target.value)}
                        className="form-control"
                        placeholder="Comentario del cliente"
                      />
                    </div>
                    <div className="col">
                      <textarea
                        rows="2"
                        value={employeeNotes}
                        onChange={(e) => setEmployeeNotes(e.target.value)}
                        className="form-control"
                        placeholder="Notas del empleado"
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={toPickup}
                          onChange={() => setToPickup(!toPickup)}
                        />
                        <label className="form-check-label">
                          El equipo se recolectó con el cliente
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid mt-3">
                        <button className="btn btn-danger" onClick={updateService}>
                          Actualizar
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid mt-3">
                        <button
                          className="btn btn-text"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </button>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            : 
              <div>
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
                {
                  (service.status == 'diagnosis'  || service.status == 'in repair' || service.status == 'completed') && (
                    <div>
                      <div>
                        <span>Diagnóstico:</span> {service.diagnosis}
                      </div>
                      <div>
                        <span>Costo:</span> {' '}
                        {service.cost !== 0 ? '$' + service.cost : 'Esperando diagnóstico'}
                      </div>
                    </div>
                  )
                }
                {
                  (service.status == 'valued' || service.status == 'in repair' || service.status == 'completed') && (
                    <div>
                      <div>
                        <span>Folio de cotización:</span> {service.invoiceId}
                      </div>
                      <div>
                        <span>Nota de cotización:</span> {service.invoiceNote}
                      </div>
                    </div>
                  )
                }
                <div>
                  <span>Metodo de entrada del equipo:</span>{' '}
                  {service.toPickup
                    ? 'Recolección con el cliente'
                    : 'Recibido en sucursal'}
                </div>
                <div className="col-12">
                  <div className="d-grid mt-3">
                    <button
                      className="btn btn-text"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </button>  
                  </div>
                </div>
              </div> 
        }
        
      </div>
    )
  );
}
export default Service;
