using System.ComponentModel.DataAnnotations;

namespace RecyclingForRewards.Web.API.ViewModels.Account
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string MobileNo { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
