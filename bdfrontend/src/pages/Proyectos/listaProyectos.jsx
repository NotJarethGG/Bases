import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getProyecto, eliminarProyecto } from "../../services/ProyectosServicio";
import { getSedes } from "../../services/SedesServicio";
import { getResponsable } from "../../services/ResponsableServicio";
import { toast } from "react-toastify";

const ListaProyectos = () => {
  const { data, isLoading, isError, refetch } = useQuery("Proyecto", getProyecto, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [sedes, setSedes] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [proyectoAEliminar, setProyectoAEliminar] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const data = await getSedes();
        setSedes(data);
      } catch (error) {
        console.error('Error al obtener la lista de sedes:', error);
      }
    };

    const fetchResponsables = async () => {
      try {
        const data = await getResponsable();
        setResponsables(data);
      } catch (error) {
        console.error('Error al obtener la lista de responsables:', error);
      }
    };

    fetchSedes();
    fetchResponsables();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditProyecto = (id) => {
    navigate(`/Proyecto/${id}`);
  };

  const handleShowConfirmar = (proyecto) => {
    setProyectoAEliminar(proyecto);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setProyectoAEliminar(null);
  };

  const handleDeleteProyecto = async () => {
    try {
      await eliminarProyecto(proyectoAEliminar.idProyecto);
      await refetch();
      toast.success("Proyecto eliminado correctamente");
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
                <th>Identificación Responsable</th>
                <th>Ciudad Sede</th>
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
                  <td>{responsables.find((responsable) => responsable.idResponsable === proyecto.idResponsable)?.userId || "ResponsableNoEncontrado"}</td>
                  <td>{sedes.find((sede) => sede.idSede === proyecto.idSede)?.ciudad || "CiudadSedeNoEncontrada"}</td>
                  <td>{proyecto.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(proyecto)}
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

      {confirmarVisible && (
        <div className="overlay">
          <div className="delete-confirm">
            <p>¿Estás seguro de que deseas eliminar este Proyecto?</p>
            <button
              onClick={handleDeleteProyecto}
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

export default ListaProyectos;
