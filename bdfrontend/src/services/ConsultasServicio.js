import api from "../api/config";


export const getConsultaPAP = async () => { 
    let data = await api.get('Consultas/consulta-proyecto-actuaciones-en-poblacion').then(result => result.data);
    return data;
};

export const getConsultaIPP = async () => { 
    let data = await api.get('Consultas/Consulta_Inversion_Proyecto_Poblacion').then(result => result.data);
    return data;
};

export const getConsultaPPH = async () => { 
    let data = await api.get('Consultas/Consulta_ProyectoPoblacionHabitantes').then(result => result.data);
    return data;
};

export const getConsultaCSP = async () => { 
    let data = await api.get('Consultas/Consulta_ContarSedesPorPais').then(result => result.data);
    return data;
};

export const getConsultaCSPN = async (searchTerm) => {
    
        let data = await api.get(`Consultas/Consulta_ContarSedesPorPaisPorNombrePais/${searchTerm}`);
        return data;
};

export const getConsultaCPP = async () => { 
    let data = await api.get('Consultas/Consulta_ContarProyectosEnTodosLosPaises').then(result => result.data);
    return data;
};

export const getConsultaCPS = async () => { 
    let data = await api.get('Consultas/Consulta_ContarProyectosPorTodasSedes').then(result => result.data);
    return data;
};