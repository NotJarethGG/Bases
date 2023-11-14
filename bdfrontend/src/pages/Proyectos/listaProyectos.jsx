
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getProyecto, eliminarProyecto } from "../../services/ProyectosServicio";
import ReactPaginate from "react-paginate";

const ListaProyectos = () => {
  const { data, isLoading, isError, refetch } = useQuery("Proyecto", getProyecto, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState(""); // Nuevo estado para el filtro por ID
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditProyecto = (id) => {
    navigate(`/Proyecto/${id}`);
  };

  const handleDeleteProyecto = async (id) => {
    try {
      await eliminarProyecto(id);
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
  const filteredData = searchId
    ? data.filter((proyecto) => String(proyecto.idProyecto) === searchId)
    : data;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Proyectos</h1>
        
        <Link to="/agregar-proyecto-admin">
          <button className="btnAgregarDesdeAdmin">Crear Proyecto</button>
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
                <th>ID Proyecto</th>
                <th>Titulo</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Presupuesto</th>
                <th>Id Responsable</th>
                <th>Id Sede</th>
                <th>Status</th>
                <th>Acciones</th> 
              </tr>
            </thead>
            <tbody>
              {currentData.map((proyecto) => (
                <tr key={proyecto.idProyecto}>
                  <td>{proyecto.idProyecto}</td>
                  <td>{proyecto.titulo}</td>
                  <td>{proyecto.fecha_Inicio}</td>
                  <td>{proyecto.fecha_Fin}</td>
                  <td>{proyecto.presupuesto}</td>
                  <td>{proyecto.idResponsable}</td>
                  <td>{proyecto.idSede}</td>
                  <td>{proyecto.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteProyecto(proyecto.idProyecto)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditProyecto(proyecto.idProyecto)}
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

export default ListaProyectos;
