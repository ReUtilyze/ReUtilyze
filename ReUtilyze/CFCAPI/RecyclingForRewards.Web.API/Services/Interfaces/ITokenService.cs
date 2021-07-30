using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.Web.API.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
