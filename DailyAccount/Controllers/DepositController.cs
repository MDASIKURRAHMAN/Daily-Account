using DailyAccount.Models;
using DailyAccount.Services.Interfaces;
using DailyAccount.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DailyAccount.Controllers
{
    public class DepositController : BaseApiController
    {
        private readonly IDepositService _depositService;
        public DepositController(IDepositService depositService)
        {
            _depositService = depositService;
        }
    
        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] GetRequestDataViewModel request)
        {
            var response = await _depositService.GetAllDepositAsync(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] DepositViewModel depositModel)
        {
            var deposit = await _depositService.CreateDepositAsync(depositModel);
            return Ok(deposit);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] DepositViewModel depositModel)
        {
            await _depositService.UpdateDepositAsync(depositModel);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(long depositID)
        {
            await _depositService.DeleteDepositAsync(depositID);
            return Ok();
        }
    }
}
