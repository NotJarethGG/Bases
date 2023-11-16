import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getSedes, eliminarSede } from "../../services/SedesServicio";
import { getPais } from "../../services/PaisServicio";
import { getDirector } from "../../services/DirectorServicio";
import { toast } from "react-toastify";

const ListaSedes = () => {
  const { data: sedes, isLoading, isError, refetch } = useQuery("Sede", getSedes, {
    enabled: true,
  });

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [sedeAEliminar, setSedeAEliminar] = useState(null);
  const itemsPerPage = 10;

  const [paises, setPaises] = useState([]);
  const [directores, setDirectores] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const paisesData = await getPais();
        setPaises(paisesData);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    const fetchDirectores = async () => {
      try {
        const directoresData = await getDirector();
        setDirectores(directoresData);
      } catch (error) {
        console.error('Error al obtener la lista de directores:', error);
      }
    };

    fetchPaises();
    fetchDirectores(); 
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditSede = (id) => {
    navigate(`/Sede/${id}`);
  };

  const handleShowConfirmar = (sede) => {
    setSedeAEliminar(sede);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setSedeAEliminar(null);
  };

  const handleDeleteSede = async () => {
    try {
      await eliminarSede(sedeAEliminar.idSede);
      await refetch();
      toast.success("Sede eliminada correctamente");
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

  const renderData = () => {
    return searchId ? sedes.filter((sede) => String(sede.idSede) === searchId) : sedes;
  };

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(renderData().length / itemsPerPage);
  const currentData = renderData().slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de sedes</h1>
        
        <Link to="/agregar-sede-admin">
          <button className="btnAgregarDesdeAdmin">Crear Sede</button>
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
                <th>ID sede</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>País</th>
                <th>Telefono</th>
                <th>Identificacion Director</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((sede) => (
                <tr key={sede.idSede}>
                  <td>{sede.idSede}</td>
                  <td>{sede.ciudad}</td>
                  <td>{sede.direccion}</td>
                  <td>{paises.find((pais) => pais.idPais === sede.idPais)?.nombre || "NombrePaisNoEncontrado"}</td>
                  <td>{sede.telefono}</td>
                  <td>{directores.find((director) => director.idDirector === sede.idDirector)?.userId || "UsuarioDirectorNoEncontrado"}</td>
                  <td>{sede.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(sede)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditSede(sede.idSede)}
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
            <p>¿Estás seguro de que deseas eliminar esta Sede?</p>
            <button
              onClick={handleDeleteSede}
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

export default ListaSedes;
