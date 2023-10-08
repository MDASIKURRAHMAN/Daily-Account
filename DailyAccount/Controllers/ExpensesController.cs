using DailyAccount.Models;
using DailyAccount.Services.Interfaces;
using DailyAccount.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DailyAccount.Controllers
{
    public class ExpensesController : BaseApiController
    {
        private readonly IExpensesService _expensesService;
        public ExpensesController(IExpensesService expensesService)
        {
            _expensesService = expensesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] GetRequestDataViewModel request)
        {
            var response = await _expensesService.GetAllExpensesAsync(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] ExpensesViewModel expensesModel)
        {
            var expenses = await _expensesService.CreateExpensesAsync(expensesModel);
            return Ok(expenses);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] ExpensesViewModel expensesModel)
        {
            await _expensesService.UpdateExpensesAsync(expensesModel);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(long expensesID)
        {
            await _expensesService.DeleteExpensesAsync(expensesID);
            return Ok();
        }
    }
}
