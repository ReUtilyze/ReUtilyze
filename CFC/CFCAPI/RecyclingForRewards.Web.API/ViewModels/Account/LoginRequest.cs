using System.ComponentModel.DataAnnotations;

namespace RecyclingForRewards.Web.API.ViewModels.Account
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
