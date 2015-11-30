using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoviesApi.Models;

namespace MoviesApi.DAL
{
    public class MovieDal : BaseDal
    {

        public static IEnumerable<Movie> GetAll()
        {
            var movies = new List<Movie>();

            using (var connection = new SqlConnection(connString))
            {

                using (var cmdSql = new SqlCommand(Queries.Movies_GetAll, connection))
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

            return movies;

        }

        public static Movie GetById(int id)
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
                            return movie;
                        }
                    }
                }

            }

            return null;
        }

        public static Movie Update(Movie movie)
        {
            const string sql = "UPDATE [Movies] SET [Title] = @Title, [ReleaseYear] = @RYear WHERE [Id] = @Id";

            var paramList = new List<SqlParameter>
            {
                new SqlParameter("@Title", movie.title),
                new SqlParameter("@RYear", movie.releaseYear),
                new SqlParameter("@Id", movie.id)
            };

            if (ExecuteInLineSql(sql, paramList))
            {
                return movie;
            }
            else
            {
                return null;
            }

        }

    }
}
