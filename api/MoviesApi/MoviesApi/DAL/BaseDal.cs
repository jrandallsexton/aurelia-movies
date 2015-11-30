using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.DAL
{
    public class BaseDal
    {
        protected const string connString = "Server=(local)\\devsql;Database=movies;User Id=sa;Password=sesame1?";

        public static bool ExecuteInLineSql(string sqlStatement, IEnumerable<SqlParameter> paramList)
        {
            using (var connection = new SqlConnection(connString))
            {

                using (var cmdSql = new SqlCommand(sqlStatement, connection))
                {

                    cmdSql.CommandTimeout = 3000;
                    cmdSql.CommandType = CommandType.Text;

                    foreach (var p in paramList) { cmdSql.Parameters.Add(p); }

                    connection.Open();
                    cmdSql.ExecuteNonQuery();

                    return true;
                }

            }
        }
    }
}
