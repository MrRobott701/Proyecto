import React, { useState, useContext } from 'react';
import axiosInstance from '../../axiosConfig'; // Importa la instancia personalizada
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/usuarios/login', form); // Usa la instancia personalizada
      const { token, user } = response.data;

      setAuthToken(token); // Guarda el token en el contexto
      localStorage.setItem('authToken', token); // Opcional: guardar token en localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en localStorage

      console.log(user); // Para depuración
      navigate('/'); // Redirige al inicio después del login
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input 
            type="email" 
            name="correo" 
            value={form.correo} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
