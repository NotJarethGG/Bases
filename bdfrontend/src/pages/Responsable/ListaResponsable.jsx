import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getResponsable, eliminarResponsable } from "../../services/ResponsableServicio";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaResponsables = () => {
  const { data, isLoading, isError, refetch } = useQuery("Responsable", getResponsable, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
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
          toast.error(`Error al eliminar el responsable esta ligado a otras tablas.`);
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

  
  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Responsables</h1>
        <Link to="/agregar-director-admin">
          <button className="btnAgregarDesdeAdmin">Crear responsable</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID Responsable</th>
                <th>ID Usuario</th>
                <th>Status</th>
                <th>Acciones</th> {/* Asegúrate de que el nombre del campo sea "Status" */}
              </tr>
            </thead>
            <tbody>
              {currentData.map((director) => (
                <tr key={director.idResponsable}>
                  <td>{director.idResponsable}</td>
                  <td>{director.userId}</td>
                  <td>{director.status}</td>
                  <td>
                  <button
                      onClick={() => {
                        handleDeleteResponsable(director.idResponsable);
                      }}
                      className="btnEliminar"
                      >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditResponsable(director.idResponsable)}
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
