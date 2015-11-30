
using System.Web.Http;

using MoviesApi.DAL;
using MoviesApi.Models;

namespace MoviesApi.Controllers
{
    [Authorize]
    public class MoviesController : ApiController
    {

        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            return Ok(MovieDal.GetAll());
        }

        [AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            return Ok(MovieDal.GetById(id));
        }

        public IHttpActionResult Put(int id, [FromBody]Movie movie)
        {
            return Ok(MovieDal.Update(movie));
        }

    }
}