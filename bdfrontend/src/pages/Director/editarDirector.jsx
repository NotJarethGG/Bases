import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateDirector, getDirectorID } from '../../services/DirectorServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarDirector = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdDirectorRef = useRef(null);
  const IDUsuRef = useRef(null); // Cambiado el nombre de la referencia
  const StatusRef = useRef(null); // Cambiado el nombre de la referencia

  const mutationKey = `Director/${id}`; // Cambiado el nombre del mutationKey
  const mutation = useMutation(mutationKey, updateDirector, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idDirector: IdDirectorRef.current.value,
      userId: IDUsuRef.current.value, // Cambiado el nombre del campo
      status: StatusRef.current.value, // Cambiado el nombre del campo
    };

    console.log(newData);
    // Enviar la solicitud de actualización al servidor
    mutation.mutateAsync(newData)
      .catch((error) => {
        console.error('Error en la solicitud Axios:', error);
      });

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    async function cargarDatosDirector() {
      try {
        const datosDirector = await getDirectorID(id);
        IdDirectorRef.current.value = datosDirector.idDirector;
        IDUsuRef.current.value = datosDirector.userId; // Cambiado el nombre del campo
        StatusRef.current.value = datosDirector.status; // Cambiado el nombre del campo

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosDirector();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Director</h1>
      <p className="edit-id">ID del Director a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idDirector" className="edit-label">Confirme el ID del Director:</label>
          <input
            type="text"
            id="idDirector"
            ref={IdDirectorRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="userId" className="edit-label">
            UserId:
          </label>
          <input
            type="text"
            id="userId"
            ref={IDUsuRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="status" className="edit-label">
            Status:
          </label>
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

export default EditarDirector;
