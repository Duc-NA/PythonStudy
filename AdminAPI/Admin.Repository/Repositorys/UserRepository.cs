using Admin.Domain;
using Admin.Domain.Models;
using Admin.Repository.Interfaces;
using Admin.Repository.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Repository.Repositorys
{
    public class UserRepository : IUserRepository
    {
        private WebContext _context;
        public UserRepository(
            WebContext context
            )
        {
            _context = context;
        }
        public User GetById(int id)
        {
            var result = _context.User.FirstOrDefault(x => x.Id == id);
            return result == null ? null : result;
        }

        public bool GetByUserName(string userName)
        {
            var result = _context.User.FirstOrDefault(x => x.UserName == userName);            
            if ( result == null ) { return false; }
            return true;
        }

        public async Task<bool> Login(string mobile, string password)
        {
            return true;
        }

        public async Task<bool> Register(User user)
        {
            var request = _context.Add(user);            
            return _context.SaveChanges() > 0;
        }
    }
}
