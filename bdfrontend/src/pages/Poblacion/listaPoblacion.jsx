// import { useState } from "react";
// import { useQuery } from "react-query";
// import { useNavigate, Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { getPoblacion, eliminarPoblacion } from "../../services/PoblacionServicio";
// import ReactPaginate from "react-paginate";

// const ListaPoblacion = () => {
//   const { data, isLoading, isError, refetch } = useQuery("Poblacion", getPoblacion, {
//     enabled: true,
//   });
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const handleEditPoblacion = (id) => {
//     navigate(`/Poblacion/${id}`);
//   };

//   const handleDeletePoblacion = async (id) => {
//     try {
//       await eliminarPoblacion(id);
//       await refetch();
//       // Agregar lógica para mostrar una notificación de éxito si lo deseas
//     } catch (error) {
//       console.error("Error en la solicitud Axios:", error);
//       // Agregar lógica para mostrar una notificación de error si lo deseas
//     }
//   };

//   if (isLoading) return <div className="loading">Loading...</div>;

//   if (isError) return <div className="error">Error</div>;

//   const offset = currentPage * itemsPerPage;
//   const pageCount = Math.ceil(data.length / itemsPerPage);
//   const currentData = data.slice(offset, offset + itemsPerPage);

//   return (
//     <>
//       <div className="type-registration">
//         <h1 className="Namelist">Registro de Poblacion</h1>
//         <Link to="/agregar-poblacion-admin">
//           <button className="btnAgregarDesdeAdmin">Crear Poblacion</button>
//         </Link>
//         <div className="Div-Table">
//           <table className="Table">
//             <thead>
//               <tr>
//                 <th>ID Poblacion</th>
//                 <th>Nombre</th>
//                 <th>ID Pais</th>
//                 <th>Numero Habitantes</th>
//                 <th>Descripcion</th>
//                 <th>Status</th>
//                 <th>Acciones</th> 
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((poblacion) => (
//                 <tr key={poblacion.idPoblacion}>
//                   <td>{poblacion.idPoblacion}</td>
//                   <td>{poblacion.nombre}</td>
//                   <td>{poblacion.idPais}</td>
//                   <td>{poblacion.numHabitantes}</td>
//                   <td>{poblacion.descripcion}</td>
//                   <td>{poblacion.status}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDeletePoblacion(poblacion.idPoblacion)}
//                       className="btnEliminar"
//                     >
//                       Borrar
//                     </button>
//                     <button
//                       onClick={() => handleEditPoblacion(poblacion.idPoblacion)}
//                       className="btnModificar"
//                     >
//                       Editar
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <ReactPaginate
//         previousLabel={"Anterior"}
//         nextLabel={"Siguiente"}
//         breakLabel={"..."}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageChange}
//         containerClassName={"pagination"}
//         activeClassName={"active"}
//       />
//     </>
//   );
// };

// export default ListaPoblacion;

import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getPoblacion, eliminarPoblacion } from "../../services/PoblacionServicio";

const ListaPoblacion = () => {
  const { data, isLoading, isError, refetch } = useQuery("Poblacion", getPoblacion, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState(""); // Nuevo estado para el filtro por ID
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPoblacion = (id) => {
    navigate(`/Poblacion/${id}`);
  };

  const handleDeletePoblacion = async (id) => {
    try {
      await eliminarPoblacion(id);
      await refetch();
      // Agregar lógica para mostrar una notificación de éxito si lo deseas
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);
      // Agregar lógica para mostrar una notificación de error si lo deseas
    }
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  // Aplicar el filtro por ID
  const filteredData = data.filter((poblacion) => {
    return String(poblacion.idPoblacion) === searchId;
  });

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = searchId ? filteredData : data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Poblaciones</h1>
        
        <Link to="/agregar-poblacion-admin">
          <button className="btnAgregarDesdeAdmin">Crear Poblacion</button>
        </Link>
        {/* Input para filtrar por ID */}
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID Poblacion</th>
                <th>Nombre</th>
                <th>ID Pais</th>
                <th>Numero Habitantes</th>
                <th>Descripcion</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((poblacion) => (
                <tr key={poblacion.idPoblacion}>
                  <td>{poblacion.idPoblacion}</td>
                  <td>{poblacion.nombre}</td>
                  <td>{poblacion.idPais}</td>
                  <td>{poblacion.numHabitantes}</td>
                  <td>{poblacion.descripcion}</td>
                  <td>{poblacion.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeletePoblacion(poblacion.idPoblacion)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditPoblacion(poblacion.idPoblacion)}
                      className="btnModificar"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default ListaPoblacion;
