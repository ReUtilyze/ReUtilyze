using System.ComponentModel.DataAnnotations;

namespace RecyclingForRewards.BO.API.ViewModels
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
