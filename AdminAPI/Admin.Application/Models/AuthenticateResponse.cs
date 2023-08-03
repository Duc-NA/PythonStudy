using Admin.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Application.Models
{
    public class AuthenticateResponse
    {        
        public int Id { get; set; }
        public string FullName { get; set; }        
        public string Mobile { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Avatar { get; set; }

        //public AuthenticateResponse(User user, string token)
        //{
        //    Id = user.Id;
        //    FullName = user.FullName;
        //    Token = token;
        //}
    }
}
