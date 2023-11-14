import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getResponsable, eliminarResponsable } from "../../services/ResponsableServicio";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaResponsables = () => {
  const { data, isLoading, isError, refetch } = useQuery("responsable", getResponsable, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState(""); // Nuevo estado para el filtro por ID
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditResponsable = (idResponsable) => {
    navigate(`/Responsable/${idResponsable}`);
  };

  const handleDeleteResponsable = async (id) => {
    try {
      await eliminarResponsable(id);
      await refetch();
      toast.success("Responsable eliminado correctamente");
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);

      if (error.response) {
        // El servidor respondió, pero con un código de estado que indica un error
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(`Error al eliminar el responsable: ${data.message}`);
        } else {
          toast.error(`Error al eliminar el responsable; está vinculado a otras tablas.`);
        }
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta del servidor
        toast.error("No se recibió respuesta del servidor al intentar eliminar el responsable.");
      } else {
        // Algo más salió mal
        toast.error("Error al realizar la solicitud de eliminación. Consulta la consola para más detalles.");
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  // Aplicar el filtro por ID
  const filteredData = data.filter((responsable) => {
    return String(responsable.idResponsable) === searchId;
  });

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = searchId ? filteredData : data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Responsables</h1>
       
        <Link to="/agregar-responsable-admin">
          <button className="btnAgregarDesdeAdmin">Crear Responsable</button>
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
                <th>ID Responsable</th>
                <th>ID Usuario</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((responsable) => (
                <tr key={responsable.idResponsable}>
                  <td>{responsable.idResponsable}</td>
                  <td>{responsable.userId}</td>
                  <td>{responsable.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteResponsable(responsable.idResponsable)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditResponsable(responsable.idResponsable)}
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

export default ListaResponsables;
