// import { useRef } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import { createPais } from '../../services/PaisServicio';
// import { toast, ToastContainer } from 'react-toastify';

// const CrearPaises = () => {
//   const queryClient = useQueryClient();
//   const nomPaisRef = useRef(null);
//   const statusRef= useRef(null);
 

//   const mutation = useMutation("pais", createPais, {
//     onSettled: () => queryClient.invalidateQueries("pais"),
//     mutationKey: "pais",
//     onError: (error) => {
//       toast.error('Error al guardar: ' + error.message, {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     }
//   });

//   const handleRegistro = async (e) => {
//     e.preventDefault();

//     // Realiza la validación del formulario aquí

//     let newResponsable = {
//       nombre: nomPaisRef.current.value,
//       status: statusRef.current.value,
     
//     };

//     await mutation.mutateAsync(newResponsable);

//     toast.success('¡Guardado Exitosamente!', {
//       position: toast.POSITION.TOP_RIGHT
//     });
//   };

//   return (
//     <div className="CrearSoli">
//       <h2>Crear Pais</h2>
//       <form onSubmit={handleRegistro}>
//         <div className='div-input-tipo'>
//           <label htmlFor="nombreSolicitante">Nombre:</label>
//           <input
//             type="text"
//             id="nombreSolicitante"
//             ref={nomPaisRef}
//             required
//           />
//         </div>
//         <div className='div-input-tipo'>
//           <label htmlFor="status">status:</label>
//           <input
//             type="text"
//             id="status"
//             ref={statusRef}
//             required
//           />
//         </div>
//         <button type="submit" className="btnCrearPais">
//           Crear
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CrearPaises;



import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createPais } from '../../services/PaisServicio';
import { toast, ToastContainer } from 'react-toastify';

const CrearPaises = () => {
  const queryClient = useQueryClient();
  const nomPaisRef = useRef(null);
  const statusRef = useRef(null);

  const mutation = useMutation("pais", createPais, {
    onSettled: () => queryClient.invalidateQueries("pais"),
    mutationKey: "pais",
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
      nombre: nomPaisRef.current.value,
      status: statusRef.current.value,
    };

    const token = localStorage.getItem('token');

    await mutation.mutateAsync(newResponsable, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="CrearSoli">
      <h2>Crear Pais</h2>
      <form onSubmit={handleRegistro}>
      <div className='div-input-tipo'>
          <label htmlFor="nombreSolicitante">Nombre:</label>
           <input
            type="text"
            id="nombreSolicitante"
            ref={nomPaisRef}
            required
          />
         </div>
         <div className='div-input-tipo'>
           <label htmlFor="status">status:</label>
           <input
            type="text"
            id="status"
            ref={statusRef}
            required
          />
        </div> 
        <button type="submit" className="btnCrearPais">
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearPaises;
