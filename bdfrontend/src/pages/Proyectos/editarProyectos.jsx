import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateProyecto, getProyectoID } from '../../services/ProyectosServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarProyecto = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdProyectoRef = useRef(null);
  const TituloRef = useRef(null);
  const FechaInicioRef = useRef(null);
  const FechaFinRef = useRef(null);
  const PresupuestoRef = useRef(null);
  const IdResponsableRef = useRef(null);
  const IdSedeRef = useRef(null);
  const StatusRef = useRef(null);

  const mutationKey = `Proyecto/${id}`;
  const mutation = useMutation(mutationKey, updateProyecto, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idProyecto: IdProyectoRef.current.value,
      titulo: TituloRef.current.value,
      fecha_Inicio: FechaInicioRef.current.value,
      fecha_Fin: FechaFinRef.current.value,
      presupuesto: PresupuestoRef.current.value,
      idResponsable: IdResponsableRef.current.value,
      idSede: IdSedeRef.current.value,
      status: StatusRef.current.value,
    };

    console.log(newData);

    mutation.mutateAsync(newData)
      .then(() => {
        toast.success('¡Guardado Exitosamente!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error('Error en la solicitud Axios:', error);
      });
  };

  useEffect(() => {
    async function cargarDatosProyecto() {
      try {
        const datosProyecto = await getProyectoID(id);
        IdProyectoRef.current.value = datosProyecto.idProyecto;
        TituloRef.current.value = datosProyecto.titulo;
        FechaInicioRef.current.value = datosProyecto.fecha_Inicio;
        FechaFinRef.current.value = datosProyecto.fecha_Fin;
        PresupuestoRef.current.value = datosProyecto.presupuesto;
        IdResponsableRef.current.value = datosProyecto.idResponsable;
        IdSedeRef.current.value = datosProyecto.idSede;
        StatusRef.current.value = datosProyecto.status;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosProyecto();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Proyecto</h1>
      <p className="edit-id">ID del Proyecto a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idProyecto" className="edit-label">ID del Proyecto:</label>
          <input
            type="text"
            id="idProyecto"
            ref={IdProyectoRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="titulo" className="edit-label">Título:</label>
          <input
            type="text"
            id="titulo"
            ref={TituloRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="fechaInicio" className="edit-label">Fecha de Inicio:</label>
          <input
            type="datetime-local"
            id="fechaInicio"
            ref={FechaInicioRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="fechaFin" className="edit-label">Fecha de Fin:</label>
          <input
            type="datetime-local"
            id="fechaFin"
            ref={FechaFinRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="presupuesto" className="edit-label">Presupuesto:</label>
          <input
            type="text"
            id="presupuesto"
            ref={PresupuestoRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idResponsable" className="edit-label">ID del Responsable:</label>
          <input
            type="text"
            id="idResponsable"
            ref={IdResponsableRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idSede" className="edit-label">ID de la Sede:</label>
          <input
            type="text"
            id="idSede"
            ref={IdSedeRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="status" className="edit-label">Status:</label>
          <input
            type="text"
            id="status"
            ref={StatusRef}
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

export default EditarProyecto;
