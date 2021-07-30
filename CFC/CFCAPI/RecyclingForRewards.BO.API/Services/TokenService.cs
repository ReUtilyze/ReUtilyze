using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.BO.API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RecyclingForRewards.BO.API.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        public string CreateToken(BackOfficeUser bouser)
        {
            try
            {

                var claims = new List<Claim>
                            {
                                new Claim(JwtRegisteredClaimNames.AuthTime,DateTime.Now.ToString()),
                                new Claim(ClaimTypes.Name,bouser.UserName) ,
                                new Claim("MobileNo",bouser.MobileNo),
                                new Claim("Email",bouser.Email),
                                new Claim("FullName",bouser.Name),
                                new Claim("Id",bouser.Id),
                                new Claim("Role",bouser.Role)
                            };

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["JWTAuth:TokenKey"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);

            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to generate the token due to {ex.Message}");
            }
        }
    }
}
