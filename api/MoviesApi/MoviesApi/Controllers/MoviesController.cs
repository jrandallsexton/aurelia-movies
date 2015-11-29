using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MoviesApi.Models;

namespace MoviesApi.Controllers
{
    [Authorize]
    public class MoviesController : ApiController
    {
        private const string connString = "Server=(local)\\devsql;Database=movies;User Id=sa;Password=sesame1?";

        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            const string sql = "SELECT [Id], [Title], [ReleaseYear] FROM [Movies] ORDER BY [Title]";
            var movies = new List<Movie>();

            using (var connection = new SqlConnection(connString))
            {

                using (var cmdSql = new SqlCommand(sql, connection))
                {

                    cmdSql.CommandTimeout = 3000;
                    cmdSql.CommandType = CommandType.Text;
                    connection.Open();
                    using (var rdr = cmdSql.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            movies.Add(new Movie
                            {
                                id = rdr.GetInt32(0),
                                title = rdr.GetString(1),
                                releaseYear = rdr.GetInt32(2)
                            });
                        }
                    }
                }

            }

            return Ok(movies);
        }

        public IHttpActionResult GetById(int id)
        {
            var sql = "SELECT [Id], [Title], [ReleaseYear] FROM [Movies] WHERE [Id] = " + id;

            using (var connection = new SqlConnection(connString))
            {

                using (var cmdSql = new SqlCommand(sql, connection))
                {

                    cmdSql.CommandTimeout = 3000;
                    cmdSql.CommandType = CommandType.Text;
                    connection.Open();
                    using (var rdr = cmdSql.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            var movie = new Movie
                            {
                                id = rdr.GetInt32(0),
                                title = rdr.GetString(1),
                                releaseYear = rdr.GetInt32(2)
                            };
                            return Ok(movie);
                        }
                    }
                }

            }

            return Ok();
        }

        public IHttpActionResult Put(int id, [FromBody]Movie value)
        {
            const string sql = "UPDATE [Movies] SET [Title] = @Title, [ReleaseYear] = @RYear WHERE [Id] = @Id";

            var paramList = new List<SqlParameter>
            {
                new SqlParameter("@Title", value.title),
                new SqlParameter("@RYear", value.releaseYear),
                new SqlParameter("@Id", value.id)
            };

            if (ExecuteInLineSql(sql, paramList))
            {
                return Ok(value);
            }

            return InternalServerError();
        }

        private static bool ExecuteInLineSql(string sqlStatement, IEnumerable<SqlParameter> paramList)
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
