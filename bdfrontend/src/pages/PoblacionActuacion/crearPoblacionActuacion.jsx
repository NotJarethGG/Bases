import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createPoblacionActuacion } from '../../services/PoblacionActuacionServicio';

const CrearPoblacionActuacion = () => {
  const queryClient = useQueryClient();
  
  const IdPoblacionActuacionRef = useRef(null);
  const IdPoblacionRef = useRef(null);
  const IdActuacionRef = useRef(null);

  const mutation = useMutation("poblacionActuacion", createPoblacionActuacion, {
    onSettled: () => queryClient.invalidateQueries("poblacionActuacion"),
    mutationKey: "poblacionActuacion",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newPoblacionActuacion = {
      idPoblacionActuacion: IdPoblacionActuacionRef.current.value,
      idPoblacion: IdPoblacionRef.current.value,
      idActuacion: IdActuacionRef.current.value,
    };

    await mutation.mutateAsync(newPoblacionActuacion);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Población Actuacion</h2>
      <form onSubmit={handleRegistro}>
        <div className='div-input-tipo'>
          <label htmlFor="idPoblacionActuacion">ID de la Población Actuación:</label>
          <input
            type="text"
            id="idPoblacionActuacion"
            ref={IdPoblacionActuacionRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idPoblacion">ID de la Población:</label>
          <input
            type="text"
            id="idPoblacion"
            ref={IdPoblacionRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idActuacion">ID de la Actuación:</label>
          <input
            type="text"
            id="idActuacion"
            ref={IdActuacionRef}
            required
          />
        </div>
        <button type="submit" className="btnCrearPoblacion">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearPoblacionActuacion;
