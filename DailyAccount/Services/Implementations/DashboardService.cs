using DailyAccount.Services.Interfaces;
using DailyAccount.ViewModels;

namespace DailyAccount.Services.Implementations
{
    public class DashboardService: IDashboardService
    {
        private readonly IDepositService _depositService;
        private readonly IExpensesService _expensesService;
        public DashboardService(IDepositService depositService, IExpensesService expensesService)
        {
            _depositService = depositService;
            _expensesService = expensesService;
        }

        public async Task<DashboardElementViewModel> GetDashboardElement()
        {
            var totalDepositForLastMonth = await _depositService.CalculateTotalDepositsLastMonthAsync();
            var totalExpensesForLastMonth = await _expensesService.CalculateTotalExpensesLastMonthAsync();
            var totalDeposits = await _depositService.CalculateTotalDepositsAsync();
            var totalExpenses = await _expensesService.CalculateTotalExpensesAsync();
            decimal currentBalance = totalDeposits - totalExpenses;
            var lastFiveDeposits = await _depositService.GetLastFiveDepositsAsync();
            var lastFiveExpenses = await _expensesService.GetLastFiveExpensesAsync();

            var viewModel = new DashboardElementViewModel
            {
                TotalDepositForLastMonth = totalDepositForLastMonth,
                TotalExpensesForLastMonth = totalExpensesForLastMonth,
                CurrentBalance = currentBalance,
                LastFiveDeposits = lastFiveDeposits,
                LastFiveExpenses = lastFiveExpenses
            };

            return viewModel;
        }
    }
}
