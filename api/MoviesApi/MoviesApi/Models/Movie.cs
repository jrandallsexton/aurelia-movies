using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Models
{
    public class Movie
    {
        public int id { get; set; }
        public string title { get; set; }
        public int releaseYear { get; set; }
    }
}