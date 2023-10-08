using DailyAccount.Domain.Models;

namespace DailyAccount.ViewModels
{
    public class DashboardElementViewModel
    {
        public decimal TotalDepositForLastMonth { get; set; }
        public decimal TotalExpensesForLastMonth { get; set; }
        public decimal CurrentBalance { get; set; }
        public List<Deposit> LastFiveDeposits { get; set; }
        public List<Expenses> LastFiveExpenses { get; set; }
    }
}
