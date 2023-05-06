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

        // GET api/<controller>
        //Listar Todo
        //Retorna una lista de clases Empleados
        public List<Empleado> Get()
        {
            return EmpleadoData.Listar();
        }

        // GET api/<controller>/5
        //Obtener uno en Especifico
        //Retorna un usuario especifico de un id especifico
        public Empleado Get(int id)
        {
            return EmpleadoData.Obtener(id);
        }

        // POST api/<controller>
        //Registrar
        //Recibe un parametro de tipo clase Empelado y devuelve un bool
        public bool Post([FromBody] Empleado oEmpleado)
        {
            return EmpleadoData.Registrar(oEmpleado);
        }

        // PUT api/<controller>/5
        //Modificar
        //Recibe un parametro de tipo clase Empleado y regresa un bool
        public bool Put([FromBody] Empleado oEmpleado)
        {
            return EmpleadoData.Modificar(oEmpleado);
        }

        // DELETE api/<controller>/5
        //Eliminar
        //Recibe un ID, llama al metodo Eliminar, regresa un bool
        public bool Delete(int id)
        {
            return EmpleadoData.Eliminar(id);
        }
    }
}