using Admin.Application.Models;
using Admin.Domain.Models;
using AutoMapper;

namespace Admin.Application.Helper
{
    internal class AutoMapper : Profile
    {
        public AutoMapper()
        {
            // User -> AuthenticateResponse
            CreateMap<User, AuthenticateResponse>();

            // RegisterRequest -> User
            CreateMap<RegisterModel, User>();
            
        }
    }
}
