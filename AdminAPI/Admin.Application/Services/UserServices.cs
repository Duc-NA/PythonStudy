using Admin.Application.Interfaces;
using Admin.Application.Models;
using Admin.Domain.Models;
using Admin.Repository.Interfaces;
using Admin.Repository.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Admin.Application.Services
{
    public class UserServices : IUserServices
    {
        private readonly AppSettings _appSettings;
        private readonly IUserRepository _userRepository;
        public UserServices(
            IOptions<AppSettings> appSettings,
            IUserRepository userRepository
            )
        {
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
        }


        public Task<bool> Login(string mobile, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Register(User user)
        {
            throw new NotImplementedException();
        }

        public AuthenticateResponse Authenticate(LoginModel model)
        {
            // get user id with identity

            // generate token
            var token = generateJwtToken(123);
            //login with identity            
            var result = new AuthenticateResponse();
            return result;
        }

        private string generateJwtToken(int userID)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", userID.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
