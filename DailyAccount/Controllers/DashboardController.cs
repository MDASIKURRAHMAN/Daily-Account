using DailyAccount.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailyAccount.Controllers
{

    public class DashboardController : BaseApiController
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        /// <summary>
        /// Return dashboard elements
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var dashBoardElements = await _dashboardService.GetDashboardElement();
            return Ok(dashBoardElements);
        }
    }
}
