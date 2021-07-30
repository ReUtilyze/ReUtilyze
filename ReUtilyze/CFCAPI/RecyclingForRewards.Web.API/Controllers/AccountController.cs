using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Account;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly ITokenService _tokenService;

        public AccountController(CFCDatabaseSettings databaseSettings, ITokenService tokenService)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _users = database.GetCollection<User>(databaseSettings.UsersCollection);
            _tokenService = tokenService;
        }

        [HttpPost("Register")]
        public ActionResult<string> Create(RegisterRequest userDto)
        {
            if (UserExists(userDto.Email) != null) return BadRequest("user already exists.");

            try
            {
                using var hmac = new HMACSHA512();
                var user = new User()
                {
                    Name = userDto.Name,
                    Email = userDto.Email,
                    UserName = userDto.Email,
                    MobileNo = userDto.MobileNo,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
                    PasswordSalt = hmac.Key,
                    IsActive = true
                };
                _users.InsertOne(user);

                return Ok(new {token= _tokenService.CreateToken(user) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        private User UserExists(string useremail)
        {
            return (_users.AsQueryable<User>().Where(e => e.Email == useremail)).FirstOrDefault();
        }

        [HttpPost("Login")]
        public ActionResult<string> Login(LoginRequest loginDto)
        {
            try
            {
                var user = UserExists(loginDto.UserName);
                if (user == null)
                {
                    return Unauthorized("Invalid username");
                }
                using var hmac = new HMACSHA512(user.PasswordSalt);
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
                }

                return Ok(new {token= _tokenService.CreateToken(user) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
