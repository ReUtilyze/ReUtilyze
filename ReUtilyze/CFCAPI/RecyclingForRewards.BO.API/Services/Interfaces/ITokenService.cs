using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.BO.API.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(BackOfficeUser bouser);
    }
}
