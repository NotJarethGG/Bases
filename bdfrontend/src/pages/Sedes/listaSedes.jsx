import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getSedes,  eliminarSede } from "../../services/SedesServicio";

const ListaSedes = () => {
  const { data, isLoading, isError, refetch } = useQuery("Sede", getSedes, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPais = (id) => {
    navigate(`/Sede/${id}`);
  };

  const handleDeleteSede = async (id) => {
    try {
      await eliminarSede(id);
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
        <h1 className="Namelist">Registro de sedes</h1>
        <Link to="/agregar-sede-admin">
          <button className="btnAgregarDesdeAdmin">Crear Sede</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID sede</th>
                <th>Ciudad</th>
                <th>Direccion</th> 
                <th>ID Pais</th>
                <th>Telefono</th>
                <th>ID Director</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((sede) => (
                <tr key={sede.idSede}>
                  <td>{sede.idSede}</td>
                  <td>{sede.ciudad}</td>
                  <td>{sede.direccion}</td>
                  <td>{sede.idPais}</td>
                  <td>{sede.telefono}</td>
                  <td>{sede.idDirector}</td>
                  <td>{sede.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteSede(sede.idSede)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditPais(sede.idSede)}
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

export default ListaSedes;
