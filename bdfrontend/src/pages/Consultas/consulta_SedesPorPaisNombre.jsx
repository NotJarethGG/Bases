// import { useState } from "react";
// import { useQuery } from "react-query";
// import "react-toastify/dist/ReactToastify.css";
// import { getConsultaCSPN } from "../../services/ConsultasServicio";
// import ReactPaginate from "react-paginate";

// const ListaConsultaCSPN = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data, isLoading, isError, refetch } = useQuery(
//     ["consultaCSPN", data],
//     () => getConsultaCSPN(data),
//     {
//       enabled: false, // No ejecutar automáticamente la consulta al cargar la página
//     }
//   );
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const handleSearch = async () => {
//     try {
//       await refetch(); // Intenta refetch solo si está disponible
//     } catch (error) {
//       console.error("Error al recargar la consulta:", error);
//     }
//   };

//   if (isLoading) return <div className="loading">Loading...</div>;

//   if (isError) return <div className="error">Error</div>;

//   const offset = currentPage * itemsPerPage;
// // ...

// const pageCount = Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;

// const currentData = data && Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];

// // ...

// console.log("Data:", data);


//   return (
//     <>
//       <div className="type-registration">
//         <h1 className="Namelist">Consultas sedes por pais</h1>
//         {/* Agregar el input de búsqueda */}
//         <div>
//           <input
//             type="text"
//             placeholder="Buscar por nombre"
//             value={data}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={handleSearch}>Buscar</button>
//         </div>
//         <div className="Div-Table">
//           <table className="Table">
//             <thead>
//               <tr>
//                 <th>Nombre Pais</th>
//                 <th>Cantidad de sedes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((consultaCSPN) => (
//                 <tr key={consultaCSPN.nombrePais}>
//                   <td>{consultaCSPN.nombrePais}</td>
//                   <td>{consultaCSPN.cantidadSedes}</td>
                  
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

// export default ListaConsultaCSPN;
