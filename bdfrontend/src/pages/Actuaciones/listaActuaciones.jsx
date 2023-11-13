import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getActuacion, eliminarActuacion } from "../../services/ActuacionesServicio";
import ReactPaginate from "react-paginate";

const ListaActuacion = () => {
  const { data, isLoading, isError, refetch } = useQuery("Actuacion", getActuacion, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditActuacion = (id) => {
    navigate(`/Actuacion/${id}`);
  };

  const handleDeleteActuacion = async (id) => {
    try {
      await eliminarActuacion(id);
      await refetch();
      // Agregar lógica para mostrar una notificación de éxito si lo deseas
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);
      // Agregar lógica para mostrar una notificación de error si lo deseas
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
        <h1 className="Namelist">Registro de Actuaciones</h1>
        <Link to="/agregar-actuacion-admin">
          <button className="btnAgregarDesdeAdmin">Crear Actuacion</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID Actuacion</th>
                <th>Presupuesto</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>ID Proyecto</th>
                <th>Status</th> {/* Asegúrate de que el nombre del campo sea "Status" */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((actuacion) => (
                <tr key={actuacion.idActuacion}>
                  <td>{actuacion.idActuacion}</td>
                  <td>{actuacion.presupuesto}</td>
                  <td>{actuacion.nombre}</td>
                  <td>{actuacion.descripcion}</td>
                  <td>{actuacion.idProyecto}</td>
                  <td>{actuacion.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteActuacion(actuacion.idActuacion)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditActuacion(actuacion.idActuacion)}
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

export default ListaActuacion;
