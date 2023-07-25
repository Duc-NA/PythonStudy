using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Repository.Models
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string ApiUrl { get; set; }
        public string ApiLogin { get; set; }
        public string ClientID { get; set; }
        public string ClientSecret { get; set; }
        public string MapKey { get; set; }
        public string MapEndpoint { get; set; }
        public int PageSize { get; set; }
    }
}
