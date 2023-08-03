using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Admin.Application.Interfaces;
using Admin.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Admin.Application.Models;
using Admin.Domain;
using Admin.Domain.Models;
using AutoMapper;

namespace AdminAPI.Controllers
{
    public class UserController : ControllerBase
    {
        private IUserServices _userService;        

        public UserController(
            IUserServices userService
            )
        {   
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginModel model)
        {
            //var response = _userService.Authenticate(model);
            var response = 123;
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost(" register")]
        public IActionResult Register(RegisterModel model)
        {
            var response = _userService.Register(model);
            
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }
    }
}
