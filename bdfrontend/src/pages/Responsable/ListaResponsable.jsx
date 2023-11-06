
import { useState } from "react";
import { useQuery } from "react-query";


import { useNavigate , Link} from "react-router-dom";
//import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getResponsable } from "../../services/ResponsableServicio";
import ReactPaginate from "react-paginate";

const ListaResponsable = () => {
  const { data, isLoading, isError,  } = useQuery(
    "Responsable",
    getResponsable,
    { enabled: true }
  );
  const navigate = useNavigate();
 
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

//   const handleDeleteCandidate = async (id) => {
//     try {
//       await eliminarTipo(id);
//       await refetch();
//       toast.success("¡Eliminado Exitosamente!", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } catch (error) {
//       console.error("Error en la solicitud Axios:", error);
//     }
//     setDeleteConfirm(null);
//   };

  

  const handleEditTipo = (id) => {
    navigate(`/update-tipo/${id}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        
        
        <h1 className="Namelist">Registro de Tipos</h1>
        <Link to="/agregar-tipo-admin">
        <button className="btnAgregarDesdeAdmin">Crear Tipo</button>
        </Link>
        <div className="Div-Table">
          <table className="TableTipo">
            <thead>
              <tr>
                <th>ID Res</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Apellido</th>
                <th>telefono</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((tipo) => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.apellido1}</td>
                  <td>{tipo.apellido2}</td>
                  <td>{tipo.telefono}</td>
                  <td>{tipo.status}</td>
                  <td>
                    <button
                      onClick={() => (tipo.id)}
                      className="btnEliminar"
                    >
                       Borrar
                    </button>
                    <button
                      onClick={() => handleEditTipo(tipo.id)}
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
        {/* <ToastContainer /> */}
      </div>

      {/* {deleteConfirm !== null && (
        <div className="overlay">
          <div className="delete-confirm">
            <p>¿Estás seguro de que quieres eliminar este tipo?</p>
            <button onClick={() => handleDeleteCandidate(deleteConfirm)}>
              Sí
            </button>
            <button onClick={() => setDeleteConfirm(null)}>No</button>
          </div>
        </div>
      )} */}

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

export default ListaResponsable;
