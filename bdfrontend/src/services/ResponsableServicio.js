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
  