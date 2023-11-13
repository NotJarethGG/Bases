import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getDirector, eliminarDirector } from "../../services/DirectorServicio";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaDirector = () => {
  const { data, isLoading, isError, refetch } = useQuery("Director", getDirector, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditDirector = (id) => {
    navigate(`/Director/${id}`);
  };

  const handleDeleteDirector = async (id) => {
    try {
      await eliminarDirector(id);
      await refetch();
      toast.success("Director eliminado correctamente");
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);
  
      if (error.response) {
        // El servidor respondió, pero con un código de estado que indica un error
        const { status, data } = error.response;
  
        if (status === 400) {
          toast.error(`Error al eliminar el director: ${data.message}`);
        } else {
          toast.error(`Error al eliminar el director esta ligado a otras tablas.`);
        }
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta del servidor
        toast.error("No se recibió respuesta del servidor al intentar eliminar el director.");
      } else {
        // Algo más salió mal
        toast.error("Error al realizar la solicitud de eliminación. Consulta la consola para más detalles.");
      }
    }
  };

  // const handleDeleteDirector = async (id) => {
  //   try {
  //     await eliminarDirector(id);
  //     await refetch();
  //     // Agregar lógica para mostrar una notificación de éxito si lo deseas
  //   } catch (error) {
  //     console.error("Error en la solicitud Axios:", error);
  //     // Agregar lógica para mostrar una notificación de error si lo deseas
  //   }
  // };
  
  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Directores</h1>
        <Link to="/agregar-director-admin">
          <button className="btnAgregarDesdeAdmin">Crear Director</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID Director</th>
                <th>ID Usuario</th>
                <th>Status</th>
                <th>Acciones</th> {/* Asegúrate de que el nombre del campo sea "Status" */}
              </tr>
            </thead>
            <tbody>
              {currentData.map((director) => (
                <tr key={director.idDirector}>
                  <td>{director.idDirector}</td>
                  <td>{director.userId}</td>
                  <td>{director.status}</td>
                  <td>
                  <button
                      onClick={() => {
                        console.log("ID a eliminar:", director.idDirector);
                        handleDeleteDirector(director.idDirector);
                      }}
                      className="btnEliminar"
                      >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditDirector(director.idDirector)}
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

export default ListaDirector;
