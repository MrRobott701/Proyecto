using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Empleado
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string Departamento { get; set; }
        public string Puesto { get; set; }
        public string TipodeContrato { get; set; }
        public int Sueldo { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}