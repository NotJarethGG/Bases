import api from "../api/config";

// export const create = async (responsable) => { 
//     let data = await api.post('/Responsable', responsable).then(result => result.data);
//     return data;
// };

export const getResponsable = async () => { 
    let data = await api.get('Responsable').then(result => result.data);
    return data;
};