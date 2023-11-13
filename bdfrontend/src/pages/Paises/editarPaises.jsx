import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updatePais, getPaisID } from '../../services/PaisServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarPais = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdPais = useRef(null); // Agregado el campo IdPais
  const NombrePais = useRef(null);
  const StatusPais = useRef(null);

  const mutationKey = `Pais/${id}`;
  const mutation = useMutation(mutationKey, updatePais, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idPais: IdPais.current.value, // Campo IdPais
      nombre: NombrePais.current.value,
      status: StatusPais.current.value,
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
    async function cargarDatosPais() {
      try {
        const datosPais = await getPaisID(id);
        IdPais.current.value = datosPais.idPais; // Campo IdPais
        NombrePais.current.value = datosPais.nombre;
        StatusPais.current.value = datosPais.status;

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosPais();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Pais</h1>
      <p className="edit-id">ID del Pais a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idPais" className="edit-label">IdPais:</label>
          <input
            type="text"
            id="idPais"
            ref={IdPais}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="nombrePais" className="edit-label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombrePais"
            ref={NombrePais}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="statusPais" className="edit-label">
            Status:
          </label>
          <input
            type="text"
            id="statusPais"
            ref={StatusPais}
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

export default EditarPais;
