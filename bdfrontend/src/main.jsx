import React from 'react'
// import ReactDOM from 'react-dom/client'

import ReactDOM from 'react-dom/client';


import { BrowserRouter, Route, Routes } from 'react-router-dom'
//estilos
import './index.css'
import './styles/sidebar.css'
import './styles/EstilosPais.css'
//rutas
import { Layout } from './pages/_layout/layout'
import ListaResponsable from './pages/Responsable/listaResponsable';
import ListaPais from './pages/Paises/listaPaises';
import CrearPaises from './pages/Paises/crearPais';
import EditarPais from './pages/Paises/editarPaises';
import ListaSedes from './pages/Sedes/listaSedes';
import CrearSedes from './pages/Sedes/crearSede';
import EditarSede from './pages/Sedes/editarSedes';
import ListaActuacion from './pages/Actuaciones/listaActuaciones';
import CrearActuacion from './pages/Actuaciones/crearActuacion';
import ListaProyectos from './pages/Proyectos/listaProyectos';
import CrearProyecto from './pages/Proyectos/crearProyecto';
import ListaPoblacion from './pages/Poblacion/listaPoblacion';
import CrearPoblacion from './pages/Poblacion/crearPoblacion';
import ListaDirector from './pages/Director/listaDirector';
import CrearDirector from './pages/Director/crearDirector';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrearResponsable from './pages/Responsable/crearResponsable';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>

        <Routes>

        <Route path="/" element={<Layout />}>
        {/* <Route path="/home" element={<Home />}   */}
        <Route path="/listRes" element={<ListaResponsable/>}/>
        <Route path='/agregar-responsable-admin' element={<CrearResponsable/>}/>

        <Route path="/listaPais" element={<ListaPais/>}/>
        <Route path="/agregar-pais-admin" element={<CrearPaises/>}/>
        <Route path="/Pais/:id" element={<EditarPais/>}/>
        
        <Route path='/listSede' element={<ListaSedes/>}/>
        <Route path="/Sede/:id" element={<EditarSede/>}/>
        <Route path='/agregar-sede-admin' element={<CrearSedes/>}/>

        <Route path='/listActuaciones' element={<ListaActuacion/>}/>
        <Route path='/agregar-actuacion-admin' element={<CrearActuacion/>}/>

        <Route path='/listProyectos' element={<ListaProyectos/>}/>
        <Route path='/agregar-proyecto-admin' element={<CrearProyecto/>}/>

        <Route path='/listPoblacion' element={<ListaPoblacion/>}/>
        <Route path='/agregar-poblacion-admin' element={<CrearPoblacion/>}/>

        <Route path='/listDirector' element={<ListaDirector/>}/>
        <Route path='/agregar-director-admin' element={<CrearDirector/>}/>


        </Route>
        
        </Routes>
        <ToastContainer />
    </BrowserRouter>
    
  </React.StrictMode>,
)
