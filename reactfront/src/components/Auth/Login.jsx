import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Configuración global del Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del correo
    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, introduce un correo electrónico válido.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const response = await axiosInstance.post('/usuarios/login', form);
      const { token, user } = response.data;

      setAuthToken(token);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Mostrar notificación de éxito
      Toast.fire({
        icon: 'success',
        title: 'Inició sesión',
        timer: 2000,
      });

      navigate('/');
    } catch (error) {
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error en el inicio de sesión',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleShowRegisterInfo = () => {
    Swal.fire({
      icon: 'info',
      title: 'Registrarse',
      html: '<p>Para registrarse, contacte al administrador en <a href="mailto:jorge.perez56@uabc.edu.mx" class="text-blue-500">jorge.perez56@uabc.edu.mx</a>.</p>',
      confirmButtonColor: '#3085d6',
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-violet-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Inicio de Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <button
              onClick={handleShowRegisterInfo}
              className="text-blue-500 font-medium hover:underline"
            >
              Registrarse
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
