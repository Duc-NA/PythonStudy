using Admin.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Application.Interfaces
{
    public interface IUserServices
    {
        Task<bool> Login(string mobile, string password);
        Task<bool> Register(User user);
    }
}
