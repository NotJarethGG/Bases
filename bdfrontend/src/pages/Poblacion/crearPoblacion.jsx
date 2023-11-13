import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createPoblacion } from '../../services/PoblacionServicio';

const CrearPoblacion = () => {
  const queryClient = useQueryClient();
  const IdPoblacionRef = useRef(null);
  const NombreRef = useRef(null);
  const IdPaisRef = useRef(null);
  const NumHabitantesRef = useRef(null);
  const DescripcionRef = useRef(null);
  const StatusRef = useRef(null);

  const mutation = useMutation("poblacion", createPoblacion, {
    onSettled: () => queryClient.invalidateQueries("poblacion"),
    mutationKey: "poblacion",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newPoblacion = {
      idPoblacion: IdPoblacionRef.current.value,
      nombre: NombreRef.current.value,
      idPais: IdPaisRef.current.value,
      numHabitantes: NumHabitantesRef.current.value,
      descripcion: DescripcionRef.current.value,
      status: StatusRef.current.value,
    };

    await mutation.mutateAsync(newPoblacion);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Población</h2>
      <form onSubmit={handleRegistro}>
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
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            ref={NombreRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idPais">ID del País:</label>
          <input
            type="text"
            id="idPais"
            ref={IdPaisRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="numHabitantes">Número de Habitantes:</label>
          <input
            type="text"
            id="numHabitantes"
            ref={NumHabitantesRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            ref={DescripcionRef}
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
        <button type="submit" className="btnCrearPoblacion">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearPoblacion;
