import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createProyecto } from '../../services/ProyectosServicio';

const CrearProyecto = () => {
  const queryClient = useQueryClient();
  const IdProyectoRef = useRef(null);
  const TituloRef = useRef(null);
  const FechaInicioRef = useRef(null);
  const FechaFinRef = useRef(null);
  const PresupuestoRef = useRef(null);
  const IdResponsableRef = useRef(null);
  const IdSede = useRef(null);
  const StatusRef = useRef(null);

  const mutation = useMutation("proyecto", createProyecto, {
    onSettled: () => queryClient.invalidateQueries("proyecto"),
    mutationKey: "proyecto",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newProyecto = {
      idProyecto: IdProyectoRef.current.value,
      titulo: TituloRef.current.value,
      fecha_Inicio: FechaInicioRef.current.value,
      fecha_Fin: FechaFinRef.current.value,
      presupuesto: PresupuestoRef.current.value,
      idResponsable: IdResponsableRef.current.value,
      idSede: IdSede.current.value,
      status: StatusRef.current.value,
    };

    await mutation.mutateAsync(newProyecto);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Proyecto</h2>
      <form onSubmit={handleRegistro}>
        <div className='div-input-tipo'>
          <label htmlFor="idProyecto">ID del Proyecto:</label>
          <input
            type="text"
            id="idProyecto"
            ref={IdProyectoRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            ref={TituloRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            ref={FechaInicioRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="fechaFin">Fecha de Fin:</label>
          <input
            type="date"
            id="fechaFin"
            ref={FechaFinRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="presupuesto">Presupuesto:</label>
          <input
            type="text"
            id="presupuesto"
            ref={PresupuestoRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idResponsable">ID del Responsable:</label>
          <input
            type="text"
            id="idResponsable"
            ref={IdResponsableRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idSede">ID de la Sede:</label>
          <input
            type="text"
            id="idSede"
            ref={IdSede}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            ref={StatusRef}
            required
          />
        </div>
        <button type="submit" className="btnCrearProyecto">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearProyecto;
