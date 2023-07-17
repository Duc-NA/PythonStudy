using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Admin.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Admin.Domain
{
    public class CustomUserRole : IdentityUserRole<int> { }
    public class CustomUserClaim : IdentityUserClaim<int> { }
    public class CustomUserLogin : IdentityUserLogin<int> { }
    public class CustomRole : IdentityRole<int>
    {
    }
    public class WebContext : IdentityDbContext<User, CustomRole, int>
    {
        public WebContext()
        {
        }

        public WebContext(DbContextOptions<WebContext> options) : base(options)
        {

        }
        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);            
        }
    }
}
