import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => {
  const [sidebarVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en el localStorage al cargar el componente
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const navLinks = [
    { to: 'home', text: 'Home' },
    { to: 'login', text: 'Iniciar Sesión', visible: !isAuthenticated },
    { to: 'listRes', text: 'Responsable', visible: isAuthenticated },
    { to: 'listaPais', text: 'Paises', visible: isAuthenticated },
    { to: 'listSede', text: 'Sedes', visible: isAuthenticated },
    { to: 'listActuaciones', text: 'Actuaciones', visible: isAuthenticated },
    { to: 'listProyectos', text: 'Proyectos', visible: isAuthenticated },
    { to: 'listPoblacion', text: 'Poblacion', visible: isAuthenticated },
    { to: 'listDirector', text: 'Director', visible: isAuthenticated },
  ];

  return (
    <div className="container">
      <div style={{ width: sidebarVisible ? '200px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: sidebarVisible ? 'block' : 'none' }} className="logo"></h1>
          <div style={{ marginLeft: sidebarVisible ? '50px' : '0px' }} className="bars"></div>
        </div>
        {navLinks
          .filter((link) => link.visible === undefined || link.visible)
          .map((item, index) => (
            <NavLink to={item.to} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: sidebarVisible ? 'block' : 'none' }} className="link_text">
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
  children: PropTypes.node.isRequired,
};

export default Sidebar;
