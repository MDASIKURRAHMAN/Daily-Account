using DailyAccount.Domain.Models;
using DailyAccount.Models;
using DailyAccount.ViewModels;

namespace DailyAccount.Services.Interfaces
{
    public interface IExpensesService
    {
        Task<Expenses> CreateExpensesAsync(ExpensesViewModel expenses);
        Task DeleteExpensesAsync(long expensesId);
        Task UpdateExpensesAsync(ExpensesViewModel expenses);
        Task<Expenses> GetExpensesByIdAsync(long id);
        Task<PaginatedAndSortedDataViewModel<Expenses>> GetAllExpensesAsync(GetRequestDataViewModel request);
        Task<List<Expenses>> GetLastFiveExpensesAsync();
        Task<decimal> CalculateTotalExpensesLastMonthAsync();
        Task<decimal> CalculateTotalExpensesAsync();

    }
}
