using Admin.Domain;
using Admin.Domain.Models;
using Admin.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Repository.Repositorys
{
    public class UserRepository : IUserRepository
    {
        public async Task<bool> Login(string mobile, string password)
        {
            using (var context = new WebContext())
            {
                return true;
            }
        }

        public async Task<bool> Register(User user)
        {
            using (var context = new WebContext())
            {
                var request = context.Add(user);
                context.SaveChanges();
                return true;
            }
        }
    }
}
