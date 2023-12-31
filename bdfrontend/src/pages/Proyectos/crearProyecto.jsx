import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createProyecto } from '../../services/ProyectosServicio';
import { getSedes} from "../../services/SedesServicio";
import { getResponsable} from "../../services/ResponsableServicio"

const CrearProyecto = () => {
  const queryClient = useQueryClient();
  const TituloRef = useRef(null);
  const FechaInicioRef = useRef(null);
  const FechaFinRef = useRef(null);
  const PresupuestoRef = useRef(null);
  const IdResponsableRef = useRef(null);
  const IdSedeRef = useRef(null);
  const StatusRef = useRef(null);

  const [sedes, setSedes] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const mutation = useMutation("proyecto", createProyecto, {
    onSettled: () => queryClient.invalidateQueries("proyecto"),
    mutationKey: "proyecto",
    onError: (error) => {
      // Muestra un mensaje de éxito en lugar de un error
      toast.success('Proyecto guardado exitosamente', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });
  

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const data = await getSedes();
        setSedes(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    const fetchResponsables = async () => {
      try {
        const data = await getResponsable();  // Llama a la función que obtiene la lista de directores
        setResponsables(data);
      } catch (error) {
        console.error('Error al obtener la lista de directores:', error);
      }
    };

    fetchSedes();
    fetchResponsables();
      
  }, []);



  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newProyecto = {
      titulo: TituloRef.current.value,
      fecha_Inicio: FechaInicioRef.current.value,
      fecha_Fin: FechaFinRef.current.value,
      presupuesto: PresupuestoRef.current.value,
      idResponsable: IdResponsableRef.current.value,
      idSede: IdSedeRef.current.value,
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
          <label htmlFor="idResponsable">Responsable:</label>
          <select id="idResponsable" ref={IdResponsableRef} required>
            {responsables.map((responsable) => (
              <option key={responsable.idResponsable} value={responsable.idResponsable}>
                {responsable.userId}
              </option>
            ))}
          </select>
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idPais">Ciudad de sede:</label>
          <select id="idPais" ref={IdSedeRef} required>
            {sedes.map((sede) => (
              <option key={sede.idSede} value={sede.idSede}>
                {sede.ciudad}
              </option>
            ))}
          </select>
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