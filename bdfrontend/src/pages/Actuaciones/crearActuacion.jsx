// import { useRef } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import { toast, ToastContainer } from 'react-toastify';
// import { createActuacion } from '../../services/ActuacionesServicio';

// const CrearActuacion = () => {
//   const queryClient = useQueryClient();
//   const PresupuestoRef = useRef(null);
//   const NombreRef = useRef(null);
//   const DescripcionRef = useRef(null);
//   const IdProyectoRef = useRef(null);
//   const StatusRef = useRef(null);

//   const mutation = useMutation("actuacion", createActuacion, {
//     onSettled: () => queryClient.invalidateQueries("actuacion"),
//     mutationKey: "actuacion",
//     onError: (error) => {
//       toast.error('Error al guardar: ' + error.message, {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     }
//   });

//   const handleRegistro = async (e) => {
//     e.preventDefault();

//     // Realiza la validación del formulario aquí

//     let newActuacion = {
//       presupuesto: PresupuestoRef.current.value,
//       nombre: NombreRef.current.value,
//       descripcion: DescripcionRef.current.value, // Agregado campo Descripcion
//       idProyecto: IdProyectoRef.current.value, // Agregado campo IdProyecto
//       status: StatusRef.current.value,
//     };

//     await mutation.mutateAsync(newActuacion);

//     toast.success('¡Guardado Exitosamente!', {
//       position: toast.POSITION.TOP_RIGHT
//     });
//   };

//   return (
//     <div className="CrearSoli">
//       <h2>Crear Actuación</h2>
//       <form onSubmit={handleRegistro}>
//         <div className='div-input-tipo'>
//           <label htmlFor="presupuesto">Presupuesto:</label>
//           <input
//             type="text"
//             id="presupuesto"
//             ref={PresupuestoRef}
//             required
//           />
//         </div>
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
//           <label htmlFor="descripcion">Descripción:</label>
//           <input
//             type="text"
//             id="descripcion"
//             ref={DescripcionRef}
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="idProyecto">ID del Proyecto:</label>
//           <input
//             type="text"
//             id="idProyecto"
//             ref={IdProyectoRef}
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
//         <button type="submit" className="btnCrearActuacion">
//           Crear
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CrearActuacion;


import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { createActuacion } from '../../services/ActuacionesServicio';
import { getProyecto} from "../../services/ProyectosServicio";

const CrearActuacion = () => {
  const queryClient = useQueryClient();
  const NombreRef = useRef(null);
  const DescripcionRef = useRef(null);
  const IdProyectoRef = useRef(null);
  const StatusRef = useRef(null);

  const [proyectos, setProyectos] = useState([]);

  const mutation = useMutation("actuacion", createActuacion, {
    onSettled: () => queryClient.invalidateQueries("actuacion"),
    mutationKey: "actuacion",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const data = await getProyecto();
        setProyectos(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchProyectos();
      // Llama a la función para obtener la lista de directores al montar el componente
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario aquí

    let newActuacion = {
      nombre: NombreRef.current.value,
      descripcion: DescripcionRef.current.value, // Agregado campo Descripcion
      idProyecto: IdProyectoRef.current.value, // Agregado campo IdProyecto
      status: StatusRef.current.value,
    };

    await mutation.mutateAsync(newActuacion);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Actuación</h2>
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
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            ref={DescripcionRef}
          />
        </div>
        <div className='div-input-tipo'>
          <label htmlFor="idProyecto">Proyecto:</label>
          <select id="idProyecto" ref={IdProyectoRef} required>
            {proyectos.map((proyecto) => (
              <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                {proyecto.titulo}
              </option>
            ))}
          </select>
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

export default CrearActuacion;