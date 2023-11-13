import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createSede } from '../../services/SedesServicio';
import { toast, ToastContainer } from 'react-toastify';

const CrearSedes = () => {
  const queryClient = useQueryClient();
  const ciudadRef = useRef(null);
  const direccionRef = useRef(null);
  const idPaisRef = useRef(null);
  const telefonoRef= useRef(null);
  const idDirectorRef= useRef(null);
  const statusRef= useRef(null);


  const mutation = useMutation("sede", createSede, {
    onSettled: () => queryClient.invalidateQueries("sede"),
    mutationKey: "sede",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

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
        <input
          type="text"
          id="ciudad"
          ref={ciudadRef}
          required
        />
      </div>
      <div className='div-input-tipo'>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          ref={direccionRef}
          required
        />
      </div>
      <div className='div-input-tipo'>
        <label htmlFor="idPais">ID del País:</label>
        <input
          type="text"
          id="idPais"
          ref={idPaisRef}
          required
        />
      </div>
      <div className='div-input-tipo'>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          ref={telefonoRef}
          required
        />
      </div>
      <div className='div-input-tipo'>
        <label htmlFor="idDirector">ID del Director:</label>
        <input
          type="text"
          id="idDirector"
          ref={idDirectorRef}
          required
        />
      </div>
      <div className='div-input-tipo'>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          ref={statusRef}
          required
        />
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
