import  { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getActuacion, eliminarActuacion } from "../../services/ActuacionesServicio";
import { getProyecto } from "../../services/ProyectosServicio";
import { toast } from "react-toastify";

const ListaActuacion = () => {
  const { data, isLoading, isError, refetch } = useQuery("Actuacion", getActuacion, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [actuacionAEliminar, setActuacionAEliminar] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const data = await getProyecto();
        setProyectos(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchProyectos();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditActuacion = (id) => {
    navigate(`/Actuacion/${id}`);
  };

  const handleShowConfirmar = (actuacion) => {
    setActuacionAEliminar(actuacion);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setActuacionAEliminar(null);
  };

  const handleDeleteActuacion = async () => {
    try {
      await eliminarActuacion(actuacionAEliminar.idActuacion);
      await refetch();
      toast.success("Actuación eliminada correctamente");
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);

      // Agregar lógica para mostrar una notificación de error si lo deseas
    } finally {
      handleHideConfirmar();
    }
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  // Aplicar el filtro por ID
  const filteredData = data.filter((actuacion) => {
    return String(actuacion.idActuacion) === searchId;
  });

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = searchId ? filteredData : data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Actuaciones</h1>
        
        <Link to="/agregar-actuacion-admin">
          <button className="btnAgregarDesdeAdmin">Crear Actuacion</button>
        </Link>
        
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
                <th>ID Actuacion</th>
                <th>Presupuesto</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Proyecto</th>
                <th>Status</th>
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
                  <td>{proyectos.find((proyecto) => proyecto.idProyecto === actuacion.idProyecto)?.titulo || "ProyectoNoEncontrado"}</td>
                  <td>{actuacion.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(actuacion)}
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

      {confirmarVisible && (
        <div className="overlay">
          <div className="delete-confirm">
            <p>¿Estás seguro de que deseas eliminar esta Actuación?</p>
            <button
              onClick={handleDeleteActuacion}
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

export default ListaActuacion;
