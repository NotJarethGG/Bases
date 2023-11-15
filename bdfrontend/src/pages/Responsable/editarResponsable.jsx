import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateResponsable, getResponsableID } from '../../services/ResponsableServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarResponsable = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdResponsableRef = useRef(null);
  const IDUsuRef = useRef(null); // Cambiado el nombre de la referencia
  const StatusRef = useRef(null); // Cambiado el nombre de la referencia

  const mutationKey = `Responsable/${id}`; // Cambiado el nombre del mutationKey
  const mutation = useMutation(mutationKey, updateResponsable, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idDirector: IdResponsableRef.current.value,
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
    async function cargarDatosResponsable() {
      try {
        const datosResponsable = await getResponsableID(id);
        IdResponsableRef.current.value = datosResponsable.idDirector;
        IDUsuRef.current.value = datosResponsable.userId; // Cambiado el nombre del campo
        StatusRef.current.value = datosResponsable.status; // Cambiado el nombre del campo

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosResponsable();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Responsable</h1>
      <p className="edit-id">ID del Responsable a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idResponsable" className="edit-label">Confirme el ID del Responsable:</label>
          <input
            type="text"
            id="idResponsable"
            ref={IdResponsableRef}
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

export default EditarResponsable;
