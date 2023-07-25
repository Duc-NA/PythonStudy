using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Admin.Application.Interfaces;
using Admin.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Admin.Application.Models;
using Admin.Domain;
using Admin.Domain.Models;

namespace AdminAPI.Controllers
{
    public class UserController : ControllerBase
    {
        private IUserServices _userService;
        private readonly UserManager<User> _userManager;        
        private readonly IConfiguration _configuration;

        public UserController(
            UserServices userService,
            UserManager<User> userManager,            
            IConfiguration configuration            
            )
        {
            _userService = userService;            
            _userManager = userManager;        
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginModel model)
        {
            //var response = _userService.Authenticate(model);
            var response = 123;
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost(" register")]
        public IActionResult Register(RegisterModel model)
        {
            //var response = _userService.Register(model);
            var response = 123;
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

    }
}
