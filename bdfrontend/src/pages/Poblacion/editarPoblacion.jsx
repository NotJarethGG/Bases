import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updatePoblacion, getPoblacionID } from '../../services/PoblacionServicio';
import { toast, ToastContainer } from 'react-toastify';

const EditarPoblacion = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const IdPoblacionRef = useRef(null);
  const NombreRef = useRef(null);
  const IdPaisRef = useRef(null);
  const NumHabitantesRef = useRef(null);
  const DescripcionRef = useRef(null);
  const IdActuacionRef = useRef(null);
  const StatusRef = useRef(null);

  const mutationKey = `Poblacion/${id}`;
  const mutation = useMutation(mutationKey, updatePoblacion, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      idPoblacion: IdPoblacionRef.current.value,
      nombre: NombreRef.current.value,
      idPais: IdPaisRef.current.value,
      numHabitantes: NumHabitantesRef.current.value,
      descripcion: DescripcionRef.current.value,
      idActuacion: IdActuacionRef.current.value,
      status: StatusRef.current.value,
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
    async function cargarDatosPoblacion() {
      try {
        const datosPoblacion = await getPoblacionID(id);
        IdPoblacionRef.current.value = datosPoblacion.idPoblacion;
        NombreRef.current.value = datosPoblacion.nombre;
        IdPaisRef.current.value = datosPoblacion.idPais;
        NumHabitantesRef.current.value = datosPoblacion.numHabitantes;
        DescripcionRef.current.value = datosPoblacion.descripcion;
        IdActuacionRef.current.value = datosPoblacion.idActuacion;
        StatusRef.current.value = datosPoblacion.status;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosPoblacion();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Población</h1>
      <p className="edit-id">ID de la Población a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="idPoblacion" className="edit-label">ID de la Población:</label>
          <input
            type="text"
            id="idPoblacion"
            ref={IdPoblacionRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="nombre" className="edit-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            ref={NombreRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idPais" className="edit-label">ID del País:</label>
          <input
            type="text"
            id="idPais"
            ref={IdPaisRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="numHabitantes" className="edit-label">Número de Habitantes:</label>
          <input
            type="text"
            id="numHabitantes"
            ref={NumHabitantesRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="descripcion" className="edit-label">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            ref={DescripcionRef}
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="idActuacion" className="edit-label">ID de la Actuación:</label>
          <input
            type="text"
            id="idActuacion"
            ref={IdActuacionRef}
            required
            className="edit-input-field"
          />
        </div>
        <div className="edit-input">
          <label htmlFor="status" className="edit-label">Status:</label>
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

export default EditarPoblacion;
