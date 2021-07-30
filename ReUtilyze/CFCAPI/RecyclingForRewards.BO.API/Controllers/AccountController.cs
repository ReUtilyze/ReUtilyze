using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.BO.API.Data;
using RecyclingForRewards.BO.API.Services.Interfaces;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using RecyclingForRewards.BO.API.ViewModels;

namespace RecyclingForRewards.BO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMongoCollection<BackOfficeUser> _bousers;
        private readonly ITokenService _tokenService;

        public AccountController(CFCDatabaseSettings databaseSettings, ITokenService tokenService)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _bousers = database.GetCollection<BackOfficeUser>(databaseSettings.BackOfficeUsersCollection);
            _tokenService = tokenService;
        }
        
        private BackOfficeUser UserExists(string useremail)
        {
            return (_bousers.AsQueryable<BackOfficeUser>().Where(e => e.Email == useremail)).FirstOrDefault();
        }

        [HttpPost("Login")]
        public ActionResult<string> Login(LoginRequest loginDto)
        {
            try
            {
                var bouser = UserExists(loginDto.UserName);
                if (bouser == null)
                {
                    return Unauthorized("Invalid username");
                }

                if(bouser.Password != loginDto.Password)
                {
                    return Unauthorized("Invalid Username or Password");
                }
                //using var hmac = new HMACSHA512(user.PasswordSalt);
                //var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                //for (int i = 0; i < computeHash.Length; i++)
                //{
                //    if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
                //}

                return Ok(new {token= _tokenService.CreateToken(bouser) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
