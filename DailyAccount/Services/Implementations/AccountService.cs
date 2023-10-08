using DailyAccount.Domain.Models;
using DailyAccount.Models;
using DailyAccount.Services.Interfaces;
using DailyAccount.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DailyAccount.Services.Implementations
{
    public class AccountService : IAccountService
    {

        private const string ORGANIZATION_DOMAIN = "Your Organizational Domain";
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public AccountService(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }
        public async Task<LoginReturnViewModel?> LoginAndGenerateTokenAsync(LoginDetailsViewModel loginDetails)
        {
            string email = loginDetails.Email;
            if (!IsOrganizationalEmail(email, ORGANIZATION_DOMAIN))
            {
                return null;
            }

            User user = await _userService.GetUserByEmail(email);
            if (user != null)
            {
                string jwtToken = CreateJwtToken(user);
                return new LoginReturnViewModel { Token = jwtToken, NewUser = false };
            }
            else
            {
                User newuser = new User();
                newuser.Email = email;
                newuser.Username = loginDetails.Name;
                User registerNewUser = await _userService.CreateUserAsync(newuser);
                string jwtToken = CreateJwtToken(newuser);
                return new LoginReturnViewModel { Token = jwtToken, NewUser = true };
            }
        }

        private bool IsOrganizationalEmail(string email, string ORGANIZATION_DOMAIN)
        {
            var parts = email.Split('@');
            if (parts.Length != 2) return false;
            return parts[1].Equals(ORGANIZATION_DOMAIN, StringComparison.OrdinalIgnoreCase);
        }

        private string CreateJwtToken(User user)
        {
            JwtSecurityTokenHandler jwtTokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SigningKey"]);
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
            });

            SigningCredentials signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = signingCredentials
            };
            SecurityToken token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal GetClaimsPrincipalFromJwtToken(string token)
        {
            byte[] key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SigningKey"]);

            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            ClaimsPrincipal principal = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            JwtSecurityToken? jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("The token is invalid");
            }
            return principal;
        }
    }
}
