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
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-black to-violet-900">
      {/* Contenedor del Formulario de Login */}
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-white p-8 rounded-lg hover:scale-x-105 hover:scale-y-105 transition-transform"
                        style={{
                          boxShadow:
                          "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"}}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Inicio de Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo para el correo */}
            <div>
              <label className="block text-lg font-bold text-gray-700">
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

            {/* Campo para la contraseña */}
            <div>
              <label className="block text-lg font-bold text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-8 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xl flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`fa-regular ${
                      showPassword ? 'fa-eye-slash' : 'fa-eye'
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white text-lg py-2 rounded-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Iniciar Sesión
            </button>
          </form>
          {/* Información de registro */}
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

      {/* Footer con Datos de Contacto */}
      <footer className="bg-gray-800 text-white py-2">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className=" md:mb-0">
<a className="text-lg font-semibold">Contacto:</a>
            <div className="rounded-full border border-white/20 flex justify-center items-center gap-x-3 py-1 px-2 md:py-2 md:px-4 text-xs md:text-base bg-white/5 hover:scale-110 hover:bg-white/10 transition">
            <i class="fa-solid fa-envelope-circle-check"></i>
              <p className="text-sm">jorge.perez56@uabc.edu.mx</p>
          </div>
          <div className="rounded-full border border-white/20 flex justify-center items-center gap-x-2 py-1 md:py-2 text-xs md:text-base bg-white/5 hover:scale-110 hover:bg-white/10 transition mt-2">
          <i class="fa-solid fa-phone"></i>
              <h3 className="text-sm font-semibold">+52 646-160-9694</h3>
            </div>

            </div>
            
{/* Información Personal */}
<div className="text-center">
  <h3 className="text-xl font-semibold">Jorge Ivan Pérez Hernández</h3>
  <p className="text-sm">Web Developer desde México</p>
  <div className="text-sm text-gray-500 flex">
    &copy; {new Date().getFullYear()} Jorge Ivan Pérez Hernández. Todos los
    derechos reservados.

    <div className='flex'>
    <i class="ml-2 fa-solid fa-briefcase my-1"></i>
    <a 
      href="https://staging.costaensenada.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold ml-1 text-blue-500 underline hover:text-blue-700"
    >
      Portafolio
    </a>
    </div>
  </div>
</div>


{/* Redes de Contacto */}
<div className="flex space-x-6">
  {/* Correo Electrónico */}
  <a
    href="mailto:jorge.perez56@uabc.edu.mx"
    className="text-black hover:text-white text-3xl hover:scale-110"
    style={{ textShadow: '0 0 10px white' }}
  >
    <i className="text-4xl fas fa-envelope"></i>
  </a>
  {/* WhatsApp */}
  {/* WhatsApp */}
  <a
    href="https://api.whatsapp.com/send?phone=6461609694"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black hover:text-white text-3xl hover:scale-110 transition duration-300"
  style={{ textShadow: '0 0 10px white' }}
  >
<i class="text-4xl fa-brands fa-square-whatsapp"></i>
  </a>
  {/* Discord */}
  <a
    href="https://discord.gg/B9PCwpSM"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black hover:text-white text-3xl hover:scale-110"
    style={{ textShadow: '0 0 10px white' }}
  >
    <i className="text-4xl fab fa-discord"></i>
  </a>
</div>


          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
