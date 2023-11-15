import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateSede, getSedeID } from '../../services/SedesServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarSede = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const ciudadRef = useRef(null);
  const direccionRef = useRef(null);
  const idPaisRef = useRef(null);
  const telefonoRef = useRef(null);
  const idDirectorRef = useRef(null);
  const statusRef = useRef(null);
  const sedeIDRef = useRef(null);

  const mutationKey = `Sede/${id}`;
  const mutation = useMutation(mutationKey, updateSede, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idSede: sedeIDRef.current.value,
      ciudad: ciudadRef.current.value,
      direccion: direccionRef.current.value,
      idPais: idPaisRef.current.value,
      telefono: telefonoRef.current.value,
      idDirector: idDirectorRef.current.value,
      status: statusRef.current.value,
    };

    console.log(newData);

    mutation.mutateAsync(newData)
      .then(() => {
        toast.success('¡Guardado Exitosamente!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error('Error en la solicitud Axios:', error);
      });
  };

  useEffect(() => {
    async function cargarDatosSede() {
      try {
        const datosSede = await getSedeID(id);
        ciudadRef.current.value = datosSede.ciudad;
        direccionRef.current.value = datosSede.direccion;
        idPaisRef.current.value = datosSede.idPais;
        telefonoRef.current.value = datosSede.telefono;
        idDirectorRef.current.value = datosSede.idDirector;
        statusRef.current.value = datosSede.status;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosSede();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Sede</h1>
      <p className="edit-id">ID de la Sede a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
      <div className="edit-input">
          <label htmlFor="sede" className="edit-label">Confirme id sede a editar:</label>
          <input
            type="text"
            id="sede"
            ref={sedeIDRef}
            required
            className="edit-input-field"
          />
        </div>
       <div className="edit-input">
          <label htmlFor="ciudad" className="edit-label">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            ref={ciudadRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="direccion" className="edit-label">Dirección:</label>
          <input
            type="text"
            id="direccion"
            ref={direccionRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idPais" className="edit-label">ID del País:</label>
          <input
            type="text"
            id="idPais"
            ref={idPaisRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="telefono" className="edit-label">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            ref={telefonoRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idDirector" className="edit-label">ID del Director:</label>
          <input
            type="text"
            id="idDirector"
            ref={idDirectorRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="status" className="edit-label">Status:</label>
          <input
            type="text"
            id="status"
            ref={statusRef}
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

export default EditarSede;
