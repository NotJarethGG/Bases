import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createResponsable } from '../../services/ResponsableServicio';
import { toast, ToastContainer } from 'react-toastify';

const CrearResponsable = () => {
  const queryClient = useQueryClient();
  // const IDResponsableRef = useRef(null);
  const IDUsuarioRef = useRef(null);
  const StatusRef = useRef(null);

  const mutation = useMutation("Responsable", createResponsable, {
    onSettled: () => queryClient.invalidateQueries("Responsable"),
    mutationKey: "Responsable",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newResponsable = {
      // idResponsable: IDResponsableRef.current.value,
      userId: IDUsuarioRef.current.value,
      status: StatusRef.current.value,
    };

    await mutation.mutateAsync(newResponsable);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Responsable</h2>
      <form onSubmit={handleRegistro}>
        {/* <div className='div-input-tipo'>
          <label htmlFor="IDResponsable">ID Responsable:</label>
          <input
            type="text"
            id="IDResponsable"
            ref={IDResponsableRef}
            required
          />
        </div> */}
        <div className='div-input-tipo'>
          <label htmlFor="IDUsuario">ID Usuario:</label>
          <input
            type="text"
            id="IDUsuario"
            ref={IDUsuarioRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="Status">Status:</label>
          <input
            type="text"
            id="Status"
            ref={StatusRef}
            required
          />
        </div>
        
        <button type="submit">Guardar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearResponsable;
