import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createSede } from '../../services/SedesServicio';
import { getPais} from "../../services/PaisServicio";
import { getDirector} from "../../services/DirectorServicio";
import { toast, ToastContainer } from 'react-toastify';

const CrearSedes = () => {
  const queryClient = useQueryClient();
  const ciudadRef = useRef(null);
  const direccionRef = useRef(null);
  const idPaisRef = useRef(null);
  const telefonoRef = useRef(null);
  const idDirectorRef = useRef(null);
  const statusRef = useRef(null);

  const [paises, setPaises] = useState([]);
  const [directores, setDirectores] = useState([]);

  const mutation = useMutation("sede", createSede, {
    onSettled: () => queryClient.invalidateQueries("sede"),
    mutationKey: "sede",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const data = await getPais();
        setPaises(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    const fetchDirectores = async () => {
      try {
        const data = await getDirector();  // Llama a la función que obtiene la lista de directores
        setDirectores(data);
      } catch (error) {
        console.error('Error al obtener la lista de directores:', error);
      }
    };

    fetchPaises();
    fetchDirectores();  // Llama a la función para obtener la lista de directores al montar el componente
  }, []);

 


  const handleRegistro = async (e) => {
    e.preventDefault();

    let newSede = {
      ciudad: ciudadRef.current.value,
      direccion: direccionRef.current.value,
      idPais: idPaisRef.current.value,
      telefono: telefonoRef.current.value,
      idDirector: idDirectorRef.current.value,
      status: statusRef.current.value,
    };

    await mutation.mutateAsync(newSede);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSede">
      <h2>Crear Sede</h2>
      <form onSubmit={handleRegistro}>
        <div className='div-input-tipo'>
          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" ref={ciudadRef} required />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" ref={direccionRef} required />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idPais">País:</label>
          <select id="idPais" ref={idPaisRef} required>
            {paises.map((pais) => (
              <option key={pais.idPais} value={pais.idPais}>
                {pais.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" ref={telefonoRef} required />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idDirector">Director:</label>
          <select id="idDirector" ref={idDirectorRef} required>
            {directores.map((director) => (
              <option key={director.idDirector} value={director.idDirector}>
                {director.userId}
              </option>
            ))}
          </select>
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="status">Status:</label>
          <input type="text" id="status" ref={statusRef} required />
        </div>
        <button type="submit" className="btnCrearPais">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearSedes;