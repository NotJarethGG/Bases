import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [showContent, setShowContent] = useState(true); // Estado para mostrar/ocultar contenido
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.baseURL = 'https://localhost:7293/api/Authentication/';

      const response = await axios.post('login', {
        username,
        password,
      });

      if (response.data.status === 1) {
        localStorage.setItem('token', JSON.stringify(response.data));
        setToken(response.data.token);
        setLoginMessage('Logueado exitosamente');

        // Establecer un temporizador para ocultar el contenido después de 1 segundo
        setTimeout(() => {
          setShowContent(false);
          navigate('/dashboard', { replace: true, state: { logged: true, username } });
        }, 1000);
      } else {
        setLoginMessage('Credenciales incorrectas');
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="Login" style={styles.container}>
      {showContent && token === null ? (
        <>
          <h2 style={styles.title}>Iniciar Sesión</h2>
          {loginMessage && (
            <p
              style={{
                color: loginMessage === 'Logueado exitosamente' ? 'green' : 'red',
                marginBottom: '10px',
              }}
            >
              {loginMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                id="email"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <div>
                <button type="submit" style={styles.button}>
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#black',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
