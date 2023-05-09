using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class EmpleadoController : ApiController
    {

        public List<Empleado> Get()
        {
            return EmpleadoData.Listar();
        }

        public Empleado Get(int id)
        {
            return EmpleadoData.Obtener(id);
        }
        public bool Post([FromBody] Empleado oEmpleado)
        {
            return EmpleadoData.Registrar(oEmpleado);
        }

        public bool Put([FromBody] Empleado oEmpleado)
        {
            return EmpleadoData.Modificar(oEmpleado);
        }

        public bool Delete(int id)
        {
            return EmpleadoData.Eliminar(id);
        }
    }
}