using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.ViewModels.Account;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly CurrentUserInfo _currentUserInfo;

        public ProfileController(CFCDatabaseSettings databaseSettings, CurrentUserInfo currentUserInfo)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _users = database.GetCollection<User>(databaseSettings.UsersCollection);
            _currentUserInfo = currentUserInfo;
        }

        [HttpGet("")]
        public async Task<ActionResult<GetProfileResponse>> GetProfile()
        {
            var model = await _users.Find(x => x.Id == _currentUserInfo.Id).Project(x => new GetProfileResponse
            {
                Id = x.Id,
                Name = x.Name,
                UserName = x.UserName,
                Email = x.Email,
                MobileNo = x.MobileNo,
                WalletBalance = x.WalletBalance
            }).FirstOrDefaultAsync();

            return model;
        }

    }
}
