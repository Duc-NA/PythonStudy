using Admin.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> Login(string mobile, string password);        
        Task<bool> Register(User user);
        User GetById(int id);
        bool GetByUserName(string userName);
    }
}
