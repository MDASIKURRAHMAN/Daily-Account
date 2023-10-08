using DailyAccount.Models;
using DailyAccount.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailyAccount.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous, Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromForm] LoginDetailsViewModel loginDetails)
        {
            var result = await _accountService.LoginAndGenerateTokenAsync(loginDetails);
            return Ok(result);
        }
    }
}
