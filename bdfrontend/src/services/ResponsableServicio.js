import api from "../api/config";

// export const create = async (responsable) => { 
//     let data = await api.post('/Responsable', responsable).then(result => result.data);
//     return data;
// };

export const getResponsable = async () => { 
    let data = await api.get('Responsable').then(result => result.data);
    return data;
};

export const createResponsable = async (responsable) => {
    try {
      const response = await api.post('/Responsable', responsable);
      return response.data;
    } catch (error) {
      console.error("Error al crear responsable:", error);
      throw error; // Lanzar una excepción para manejar el error en el componente
    }
  };

  
export const eliminarResponsable = async (id) => {
  try {
    const response = await api.delete(`Director/${id}`);
    console.log(`Responsable con ID ${id} eliminado correctamente. Respuesta del servidor:`, response.data);

    // Puedes devolver la respuesta si es necesario
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el Responsable con ID ${id}:`, error);

    // Verifica si hay una respuesta del servidor y si hay un mensaje de error en la respuesta
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(`Error al eliminar el Responsable: ${error.response.data.message}`);
    } else {
      // Si no hay una respuesta del servidor o un mensaje de error, lanzar la excepción original
      throw error;
    }
  }
};
  