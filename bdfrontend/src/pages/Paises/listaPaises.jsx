import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getPais, eliminarPais } from "../../services/PaisServicio";
import ReactPaginate from "react-paginate";

const ListaPais = () => {
  const { data, isLoading, isError, refetch } = useQuery("Pais", getPais, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPais = (id) => {
    navigate(`/Pais/${id}`);
  };

  const handleDeletePais = async (id) => {
    try {
      await eliminarPais(id);
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
        <h1 className="Namelist">Registro de Paises</h1>
        <Link to="/agregar-pais-admin">
          <button className="btnAgregarDesdeAdmin">Crear Pais</button>
        </Link>
        <div className="Div-Table">
          <table className="Table">
            <thead>
              <tr>
                <th>ID Pais</th>
                <th>Nombre</th>
                <th>Status</th>
                <th>Acciones</th> {/* Asegúrate de que el nombre del campo sea "Status" */}
              </tr>
            </thead>
            <tbody>
              {currentData.map((pais) => (
                <tr key={pais.idPais}>
                  <td>{pais.idPais}</td>
                  <td>{pais.nombre}</td>
                  <td>{pais.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeletePais(pais.idPais)}
                      className="btnEliminar"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handleEditPais(pais.idPais)}
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

export default ListaPais;
