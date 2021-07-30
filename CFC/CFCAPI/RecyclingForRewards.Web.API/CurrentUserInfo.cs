using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API
{
    public class CurrentUserInfo
    {

        IHttpContextAccessor _httpContextAccessor;
        public CurrentUserInfo(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            this.UserName = _httpContextAccessor.HttpContext.User.Identity.Name;
            this.MobileNo = _httpContextAccessor.HttpContext.User.Claims.Where(x=>x.Type == "MobileNo").Select(y=>y.Value).FirstOrDefault();
            this.Email = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "Email").Select(y => y.Value).FirstOrDefault();
            this.FullName = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "FullName").Select(y => y.Value).FirstOrDefault();
            this.Id = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "Id").Select(y => y.Value).FirstOrDefault();
        }

        public string UserName { get; set; }

        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }

        public string Id { get; set; }

    }
}
