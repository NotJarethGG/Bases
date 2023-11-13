import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes
// import {
//     // FaUserAlt,
//     // FaBars,
//     // FaCampground,
//     // FaCalendarCheck,
//     // FaTag 
// }from "react-icons/fa";

const Sidebar = ({ children }) => {
    const [sidebarVisible, ] = useState(true);

    // const toggleSidebar = () => {
    //     setSidebarVisible(!sidebarVisible);
    // };

    const navLinks = [
        { to: 'home', text: 'Home',  },
        
        { to: 'Login', text: 'Iniciar Sesion' },

        { to: 'listRes', text: 'Responsable'},

        { to: 'listaPais', text: 'Paises'},
        
        { to: 'listSede', text: 'Sedes'},

        { to: 'listActuaciones', text: 'Actuaciones'},

        { to: 'listProyectos', text: 'Proyectos'},

        { to: 'listPoblacion', text: 'Poblacion'},

        { to: 'listDirector', text: 'Director'}
    ];

    return (
        <div className="container">
            <div style={{ width: sidebarVisible ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: sidebarVisible ? "block" : "none" }} className="logo">
                    

                    </h1>
                    <div style={{ marginLeft: sidebarVisible ? "50px" : "0px" }} className="bars">
                        {/* <button className='btnSidebar' onClick={toggleSidebar}>
                            {sidebarVisible ? "Cerrar" : "Abrir"}
                        </button> */}
                    </div>
                </div>
                {navLinks.map((item, index) => (
                    <NavLink to={item.to} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: sidebarVisible ? "block" : "none" }} className="link_text">
                            {item.text}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

Sidebar.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea requerido y sea de tipo nodo
};

export default Sidebar;

