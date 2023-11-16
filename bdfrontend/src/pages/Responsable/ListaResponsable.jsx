import  { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getResponsable, eliminarResponsable } from "../../services/ResponsableServicio";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaResponsables = () => {
  const { data, isLoading, isError, refetch } = useQuery("responsable", getResponsable, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [responsableAEliminar, setResponsableAEliminar] = useState(null);

  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditResponsable = (idResponsable) => {
    navigate(`/Responsable/${idResponsable}`);
  };

  const handleShowConfirmar = (responsable) => {
    setResponsableAEliminar(responsable);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setConfirmarVisible(false);
    setResponsableAEliminar(null);
  };

  const handleDeleteResponsable = async () => {
    try {
      await eliminarResponsable(responsableAEliminar.idResponsable);
      await refetch();
      toast.success("Responsable eliminado correctamente");
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);


    } finally {
      handleHideConfirmar();
    }
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const filteredData = data.filter((responsable) => {
    return String(responsable.idResponsable) === searchId;
  });

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = searchId ? filteredData : data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Registro de Responsables</h1>
       
        <Link to="/agregar-responsable-admin">
          <button className="btnAgregarDesdeAdmin">Crear Responsable</button>
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
                <th>ID Responsable</th>
                <th>ID Usuario</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((responsable) => (
                <tr key={responsable.idResponsable}>
                  <td>{responsable.idResponsable}</td>
                  <td>{responsable.userId}</td>
                  <td>{responsable.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmar(responsable)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditResponsable(responsable.idResponsable)}
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
            <p>¿Estás seguro de que deseas eliminar este Responsable?</p>
            <button
              onClick={handleDeleteResponsable}
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

export default ListaResponsables;
