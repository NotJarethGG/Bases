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
        console.log("ID del país a cargar:", id);
  
        if (id === undefined) {
          console.error("ID es undefined. Asegúrate de proporcionar un valor de ID válido.");
          return;
        }
  
        const datosPais = await getPaisID(id);
       // Verificar si 'datosPais' es definido
      if (datosPais) {
        console.log("Datos del país cargados:", datosPais);

        // Verificar cada propiedad individualmente
        if (datosPais.idPais !== undefined) {
          IdPais.current.value = datosPais.idPais.toString();
        } else {
          console.error("idPais es undefined en datosPais.");
        }

        if (datosPais.nombre !== undefined) {
          NombrePais.current.value = datosPais.nombre;
        } else {
          console.error("nombre es undefined en datosPais.");
        }

        if (datosPais.status !== undefined) {
          StatusPais.current.value = datosPais.status.toString();
        } else {
          console.error("status es undefined en datosPais.");
        }

      } else {
        console.error("Los datos del país son undefined.");
      }
    } catch (error) {
      console.error("Error al cargar datos del país:", error);
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
          <label htmlFor="idPais" className="edit-label">Confirmar ID Pais a editar:</label>
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

