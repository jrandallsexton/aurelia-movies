
using System.Web.Http;

namespace MoviesApi.Controllers
{
    [Authorize]
    public class PeopleController : ApiController
    {
        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            return Ok();
        }
    }
}