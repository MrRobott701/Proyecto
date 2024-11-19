// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Importa la instancia personalizada
import { useNavigate } from 'react-router-dom';

function Register(isCollapsed) {
  const [form, setForm] = useState({ nombre: '', correo: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/usuarios/register', form); // Usa la instancia personalizada
      alert('Registro exitoso');
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    // Formulario de registro
    <div className= {`pt-24 mr-12 mb-12 transition-all duration-300 ${
      isCollapsed ? "ml-28" : ""
    }`}>
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
