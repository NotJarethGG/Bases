import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getPoblacionActuacion, eliminarPoblacionActuacion } from "../../services/PoblacionActuacion";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaPoblacionActuacion = () => {
  const { data, isLoading, isError, refetch } = useQuery("Poblacion_Actuacion", getPoblacionActuacion, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [poblacionActuacionAEliminar, setPoblacionActuacionAEliminar] = useState(null);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPoblacionActuacion = (id) => {
    navigate(`/Poblacion_Actuacion/${id}`);
  };

  const handleShowConfirmar = (poblacionActuacion) => {
    setPoblacionActuacionAEliminar(poblacionActuacion);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setPoblacionActuacionAEliminar(null);
  };

  const handleDeletePoblacionActuacion = async () => {
    try {
      await eliminarPoblacionActuacion(poblacionActuacionAEliminar.idPoblacion_Actuacion);
      await refetch();
      toast.success("PoblacionActuacion eliminado correctamente");
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);

      if (error.response) {
        // El servidor respondió, pero con un código de estado que indica un error
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(`Error al eliminar la poblacionActuacion: ${data.message}`);
        } else {
          toast.error(`Error al eliminar.`);
        }
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta del servidor
        toast.error("No se recibió respuesta del servidor al intentar eliminar la información.");
      } else {
        // Algo más salió mal
        toast.error("Error al realizar la solicitud de eliminación. Consulta la consola para más detalles.");
      }
    } finally {
      handleHideConfirmar();
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
        <h1 className="Namelist">Registro de PoblacionActuacion</h1>
        <Link to="/agregar-poblacionActuacion-admin">
          <button className="btnAgregarDesdeAdmin">Crear PoblacionActuacion</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID PoblacionActuacion</th>
                <th>ID Poblacion</th>
                <th>ID Actuacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((poblacionActuacion) => (
                <tr key={poblacionActuacion.idPoblacionActuacion}>
                  <td>{poblacionActuacion.idPoblacion_Actuacion}</td>
                  <td>{poblacionActuacion.idPoblacion}</td>
                  <td>{poblacionActuacion.idActuacion}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(poblacionActuacion)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditPoblacionActuacion(poblacionActuacion.idPoblacion_Actuacion)}
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

      {confirmarVisible && (
        <div className="overlay">
          <div className="delete-confirm">
            <p>¿Estás seguro de que deseas eliminar esta PoblacionActuacion?</p>
            <button
              onClick={handleDeletePoblacionActuacion}
              className="btn-confirm btn-yes"
            >
              Sí
            </button>
            <button
              onClick={handleHideConfirmar}
              className="btn-confirm btn-no"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListaPoblacionActuacion;
