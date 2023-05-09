using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApi.Models;
namespace WebApi.Data
{
    //Aqui se llevan a cabo todos los procedimientos de la DB (CRUD)
    public class EmpleadoData
    {
        //Empleado es un parametro de entrada de la clase Registrar
        public static bool Registrar(Empleado oEmpleado)
        {
            //Hacemos la conexion con SQL, le pasamos la variable que tiene la cadena de conexion
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SQLComand para utilizar el procedimiento de registrar
                SqlCommand cmd = new SqlCommand("usp_registrar", oConexion);
                //Indicamos que es un procedimiento almacenado
                cmd.CommandType = CommandType.StoredProcedure;
                //Pasamos los parametros y le asignamos el valor
                cmd.Parameters.AddWithValue("@nombres", oEmpleado.Nombres);
                cmd.Parameters.AddWithValue("@apellido", oEmpleado.Apellido);
                cmd.Parameters.AddWithValue("@telefono", oEmpleado.Telefono);
                cmd.Parameters.AddWithValue("@departamento", oEmpleado.Departamento);
                cmd.Parameters.AddWithValue("@puesto", oEmpleado.Puesto);
                cmd.Parameters.AddWithValue("@tipodecontrato", oEmpleado.TipodeContrato);
                cmd.Parameters.AddWithValue("@sueldo", oEmpleado.Sueldo);

                try
                {
                    //Abrimos la cadena de conexion, ejecutamos el Query, retorna true o false
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static bool Modificar(Empleado oEmpleado)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("usp_modificar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idusuario", oEmpleado.IdUsuario);
                cmd.Parameters.AddWithValue("@nombres", oEmpleado.Nombres);
                cmd.Parameters.AddWithValue("@apellido", oEmpleado.Apellido);
                cmd.Parameters.AddWithValue("@telefono", oEmpleado.Telefono);
                cmd.Parameters.AddWithValue("@departamento", oEmpleado.Departamento);
                cmd.Parameters.AddWithValue("@puesto", oEmpleado.Puesto);
                cmd.Parameters.AddWithValue("@tipodecontrato", oEmpleado.TipodeContrato);
                cmd.Parameters.AddWithValue("@sueldo", oEmpleado.Sueldo);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        //Devuelve una lista de clases Empelado
        public static List<Empleado> Listar()
        {
            //Declaramos lo que va a devolver
            List<Empleado> oListaEmpleado = new List<Empleado>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //Llamamod al procedimiento, le decimos que es un procedimiento almacenado
                SqlCommand cmd = new SqlCommand("usp_listar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                //Abrimos la cadena de conexion
                try
                {
                    oConexion.Open();
                    //Leemos todo el resultado, la variable dr toma los valores de lo que esta ejecutandose en l procedimiento
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        //While nos ayuda a leer cada una de ls filas, cada vez que lee, añade cada uno de los valores a la lisa
                        while (dr.Read())
                        {
                            oListaEmpleado.Add(new Empleado()
                            {
                                IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                Nombres = dr["Nombres"].ToString(),
                                Apellido = dr["Apellido"].ToString(),
                                Telefono = dr["Telefono"].ToString(),
                                Departamento = dr["Departamento"].ToString(),
                                Puesto = dr["Puesto"].ToString(),
                                TipodeContrato = dr["TipodeContrato"].ToString(),
                                Sueldo = Convert.ToInt32(dr["Sueldo"]),
                                FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                            });
                        }

                    }


                    //Retorna la lista
                    return oListaEmpleado;
                }
                //Si hay una exepcion, la lista retorna vacia
                catch (Exception ex)
                {
                    return oListaEmpleado;
                }
            }
        }

        //Obtenemos un usuario en especifico, le pasamos el ID
        public static Empleado Obtener(int idempleado)
        {
            Empleado oEmpleado = new Empleado();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("usp_obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idusuario", idempleado);

                try
                {
                    oConexion.Open();
                    //Leemos la respuesta de la bd si coinciden las ID, y se almacena en dr
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oEmpleado = new Empleado()
                            {
                                IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                Nombres = dr["Nombres"].ToString(),
                                Apellido = dr["Apellido"].ToString(),
                                Telefono = dr["Telefono"].ToString(),
                                Departamento = dr["Departamento"].ToString(),
                                Puesto = dr["Puesto"].ToString(),
                                TipodeContrato = dr["TipodeContrato"].ToString(),
                                Sueldo = Convert.ToInt32(dr["Sueldo"]),
                                FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                            };
                        }

                    }



                    return oEmpleado;
                }
                catch (Exception ex)
                {
                    return oEmpleado;
                }
            }
        }

 
        public static bool Eliminar(int id)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("usp_eliminar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idusuario", id);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }


    }
}