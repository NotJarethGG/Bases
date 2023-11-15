// import { useRef } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import { toast, ToastContainer } from 'react-toastify';
// import { createPoblacion } from '../../services/PoblacionServicio';

// const CrearPoblacion = () => {
//   const queryClient = useQueryClient();
//   const NombreRef = useRef(null);
//   const IdPaisRef = useRef(null);
//   const NumHabitantesRef = useRef(null);
//   const DescripcionRef = useRef(null);
//   const StatusRef = useRef(null);

//   const mutation = useMutation("poblacion", createPoblacion, {
//     onSettled: () => queryClient.invalidateQueries("poblacion"),
//     mutationKey: "poblacion",
//     onError: (error) => {
//       toast.error('Error al guardar: ' + error.message, {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     }
//   });

//   const handleRegistro = async (e) => {
//     e.preventDefault();

//     // Realiza la validación del formulario aquí

//     let newPoblacion = {
//       nombre: NombreRef.current.value,
//       idPais: IdPaisRef.current.value,
//       numHabitantes: NumHabitantesRef.current.value,
//       descripcion: DescripcionRef.current.value,
//       status: StatusRef.current.value,
//     };

//     await mutation.mutateAsync(newPoblacion);

//     toast.success('¡Guardado Exitosamente!', {
//       position: toast.POSITION.TOP_RIGHT
//     });
//   };

//   return (
//     <div className="CrearSoli">
//       <h2>Crear Población</h2>
//       <form onSubmit={handleRegistro}>
//         <div className='div-input-tipo'>
//           <label htmlFor="nombre">Nombre:</label>
//           <input
//             type="text"
//             id="nombre"
//             ref={NombreRef}
//             required
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="idPais">ID del País:</label>
//           <input
//             type="text"
//             id="idPais"
//             ref={IdPaisRef}
//             required
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="numHabitantes">Número de Habitantes:</label>
//           <input
//             type="text"
//             id="numHabitantes"
//             ref={NumHabitantesRef}
//             required
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="descripcion">Descripción:</label>
//           <input
//             type="text"
//             id="descripcion"
//             ref={DescripcionRef}
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="status">Status:</label>
//           <input
//             type="text"
//             id="status"
//             ref={StatusRef}
//             required
//           />
//         </div>
//         <button type="submit" className="btnCrearPoblacion">
//           Crear
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CrearPoblacion;
import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createPoblacion } from '../../services/PoblacionServicio';
import { getPais} from "../../services/PaisServicio";


const CrearPoblacion = () => {
  const queryClient = useQueryClient();
  const NombreRef = useRef(null);
  const IdPaisRef = useRef(null);
  const NumHabitantesRef = useRef(null);
  const DescripcionRef = useRef(null);
  const StatusRef = useRef(null);

  const [paises, setPaises] = useState([]);

  const mutation = useMutation("poblacion", createPoblacion, {
    onSettled: () => queryClient.invalidateQueries("poblacion"),
    mutationKey: "poblacion",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const data = await getPais();
        setPaises(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchPaises();
      // Llama a la función para obtener la lista de directores al montar el componente
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newPoblacion = {
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
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            ref={NombreRef}
            required
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idPais">País:</label>
          <select id="idPais" ref={IdPaisRef} required>
            {paises.map((pais) => (
              <option key={pais.idPais} value={pais.idPais}>
                {pais.nombre}
              </option>
            ))}
          </select>
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