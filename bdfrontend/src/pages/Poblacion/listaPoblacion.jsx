import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getPoblacion, eliminarPoblacion } from "../../services/PoblacionServicio";
import { getPais } from "../../services/PaisServicio";
import { toast } from "react-toastify";

const ListaPoblacion = () => {
  const { data, isLoading, isError, refetch } = useQuery("Poblacion", getPoblacion, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [poblacionAEliminar, setPoblacionAEliminar] = useState(null);
  const itemsPerPage = 10;

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const paisesData = await getPais();
        setPaises(paisesData);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchPaises();
  }, []);


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPoblacion = (id) => {
    navigate(`/Poblacion/${id}`);
  };

  const handleShowConfirmar = (poblacion) => {
    setPoblacionAEliminar(poblacion);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setPoblacionAEliminar(null);
  };

  const handleDeletePoblacion = async () => {
    try {
      await eliminarPoblacion(poblacionAEliminar.idPoblacion);
      await refetch();
      toast.success("Población eliminada correctamente");
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
    ? data.filter((poblacion) => String(poblacion.idPoblacion) === searchId)
    : data;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = searchId ? filteredData : data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Poblaciones</h1>
        
        <Link to="/agregar-poblacion-admin">
          <button className="btnAgregarDesdeAdmin">Crear Poblacion</button>
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
                <th>ID Poblacion</th>
                <th>Nombre</th>
                <th>Pais</th>
                <th>Numero Habitantes</th>
                <th>Descripcion</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((poblacion) => (
                <tr key={poblacion.idPoblacion}>
                  <td>{poblacion.idPoblacion}</td>
                  <td>{poblacion.nombre}</td>
                  <td>{paises.find((pais) => pais.idPais === poblacion.idPais)?.nombre || "NombrePaisNoEncontrado"}</td>
                  <td>{poblacion.numHabitantes}</td>
                  <td>{poblacion.descripcion}</td>
                  <td>{poblacion.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(poblacion)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditPoblacion(poblacion.idPoblacion)}
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
            <p>¿Estás seguro de que deseas eliminar esta Población?</p>
            <button
              onClick={handleDeletePoblacion}
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

export default ListaPoblacion;
