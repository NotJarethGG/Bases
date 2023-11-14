import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createDirector } from '../../services/DirectorServicio';

const CrearDirector = () => {
  const queryClient = useQueryClient();
  // const IDDirectorRef = useRef(null);
  const IDUsuarioRef = useRef(null);
  const StatusRef = useRef(null);

  const mutation = useMutation("director", createDirector, {
    onSettled: () => queryClient.invalidateQueries("director"),
    mutationKey: "director",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newDirector = {
      // idDirector: IDDirectorRef.current.value,
      userId: IDUsuarioRef.current.value,
      status: StatusRef.current.value,
    };

    await mutation.mutateAsync(newDirector);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Director</h2>
      <form onSubmit={handleRegistro}>
        {/* <div className='div-input-tipo'>
          <label htmlFor="idDirector">ID Director</label>
          <input
            type="text"
            id="idDirector"
            ref={IDDirectorRef}
            required
          />
        </div> */}
        <div className='div-input-tipo'>
          <label htmlFor="idUsuario">ID Usuario:</label>
          <input
            type="text"
            id="nombre"
            ref={IDUsuarioRef}
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
        <button type="submit" className="btnCrearActuacion">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearDirector;
