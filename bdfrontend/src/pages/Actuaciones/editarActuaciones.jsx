import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateActuacion, getActuacionID } from '../../services/ActuacionesServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarActuacion = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdActuacionRef = useRef(null); // Agregado el campo IdActuacion
  const PresupuestoRef = useRef(null);
  const NombreActuacionRef = useRef(null);
  const DescripcionRef = useRef(null);
  const IdProyectoRef = useRef(null);
  const StatusActuacionRef = useRef(null);

  const mutationKey = `Actuacion/${id}`;
  const mutation = useMutation(mutationKey, updateActuacion, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idActuacion: IdActuacionRef.current.value,
      presupuesto: PresupuestoRef.current.value,
      nombre: NombreActuacionRef.current.value,
      descripcion: DescripcionRef.current.value,
      idProyecto: IdProyectoRef.current.value,
      status: StatusActuacionRef.current.value,
    };

    // Enviar la solicitud de actualización al servidor
    mutation.mutateAsync(newData)
      .catch((error) => {
        console.error('Error en la solicitud Axios:', error);
      });

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    async function cargarDatosActuacion() {
      try {
        const datosActuacion = await getActuacionById(id);
        IdActuacionRef.current.value = datosActuacion.idActuacion;
        PresupuestoRef.current.value = datosActuacion.presupuesto;
        NombreActuacionRef.current.value = datosActuacion.nombre;
        DescripcionRef.current.value = datosActuacion.descripcion;
        IdProyectoRef.current.value = datosActuacion.idProyecto;
        StatusActuacionRef.current.value = datosActuacion.status;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosActuacion();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Actuacion</h1>
      <p className="edit-id">ID de la Actuacion a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idActuacion" className="edit-label">ID de la Actuacion:</label>
          <input
            type="text"
            id="idActuacion"
            ref={IdActuacionRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="presupuesto" className="edit-label">
            Presupuesto:
          </label>
          <input
            type="text"
            id="presupuesto"
            ref={PresupuestoRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="nombreActuacion" className="edit-label">
            Nombre de la Actuacion:
          </label>
          <input
            type="text"
            id="nombreActuacion"
            ref={NombreActuacionRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="descripcion" className="edit-label">
            Descripción:
          </label>
          <input
            type="text"
            id="descripcion"
            ref={DescripcionRef}
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idProyecto" className="edit-label">
            ID del Proyecto:
          </label>
          <input
            type="text"
            id="idProyecto"
            ref={IdProyectoRef}
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="statusActuacion" className="edit-label">
            Status de la Actuacion:
          </label>
          <input
            type="text"
            id="statusActuacion"
            ref={StatusActuacionRef}
            required
            className="edit-input-field"
          />
        </div>
        <button className="btnGuardar" type="submit">
          Guardar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditarActuacion;
