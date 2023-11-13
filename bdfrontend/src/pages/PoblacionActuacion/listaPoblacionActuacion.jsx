import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getPoblacionActuacion, eliminarPoblacionActuacion } from "../../services/PoblacionActuacionServicio";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ListaPoblacionActuacion = () => {
    const { data, isLoading, isError, refetch } = useQuery("PoblacionActuacion", getPoblacionActuacion, {
        enabled: true,
    });
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleEditPoblacionActuacion = (id) => {
        navigate(`/PoblacionActuacion/${id}`);
    };

    const handleDeletePoblacionActuacion = async (id) => {
        try {
        await eliminarPoblacionActuacion(id);
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
            toast.error("No se recibió respuesta del servidor al intentar eliminar la informacion.");
        } else {
            // Algo más salió mal
            toast.error("Error al realizar la solicitud de eliminación. Consulta la consola para más detalles.");
        }
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
            <Link to="/agregar-director-admin">
            <button className="btnAgregarDesdeAdmin">Crear PoblacionActuacion</button>
            </Link>
            <div className="Div-Table">
            <table className="Table">
                <thead>
                <tr>
                    <th>ID PoblacionActuacion</th>
                    <th>ID Poblacion</th>
                    <th>ID Actuacion</th>
                    <th>Acciones</th> {/* Asegúrate de que el nombre del campo sea "Status" */}
                </tr>
                </thead>
                <tbody>
                {currentData.map((poblacionActuacion) => (
                    <tr key={poblacionActuacion.idPoblacionActuacion}>
                    <td>{poblacionActuacion.idPoblacionActuacion}</td>
                    <td>{poblacionActuacion.idPoblacion}</td>
                    <td>{poblacionActuacion.idActuacion}</td>
                    <td>
                    <button
                        onClick={() => {
                            
                            handleDeletePoblacionActuacion(poblacionActuacion.idPoblacionActuacion);
                        }}
                        className="btnEliminar"
                        >
                        Borrar
                        </button>
                        <button
                        onClick={() =>handleEditPoblacionActuacion(poblacionActuacion.idPoblacionActuacion)}
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

export default ListaPoblacionActuacion;
