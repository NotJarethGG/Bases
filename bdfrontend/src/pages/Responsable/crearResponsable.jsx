import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { create } from '../../services/ResponsableServicio';
import { toast, ToastContainer } from 'react-toastify';

const Responsable = () => {
  const queryClient = useQueryClient();
  const nomRes = useRef(null);
  const apell1Res= useRef(null);
  const apell2Res = useRef(null);
  const telRes = useRef(null);
  const statusRes = useRef(null);

  const mutation = useMutation("Responsable", create, {
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
      nombre: nomRes.current.value,
      apellido1: apell1Res.current.value,
      apellido2: apell2Res.current.value,
      telefono: telRes.current.value,
      status: statusRes.current.value,
    };

    await mutation.mutateAsync(newResponsable);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Solicitud Voluntariado/Campaña</h2>
      <form onSubmit={handleRegistro}>
        <div className='div-input-tipo'>
          <label htmlFor="nombreSolicitante">Nombre:</label>
          <input
            type="text"
            id="nombreSolicitante"
            ref={nomRes}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="apellSoli1">Apellido 1:</label>
          <input
            type="text"
            id="apellSoli1"
            ref={apell1Res}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="apellSoli2">Apellido 2:</label>
          <input
            type="text"
            id="apellSoli2"
            ref={apell2Res}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="telefono">Número de Solicitud:</label>
          <input
            type="text"
            id="telefono"
            ref={telRes}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="status">Email:</label>
          <input
            type="text"
            id="status"
            ref={statusRes}
            required
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Responsable;
