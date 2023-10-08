using DailyAccount.Domain.Models;
using DailyAccount.Models;
using DailyAccount.ViewModels;

namespace DailyAccount.Services.Interfaces
{
    public interface IDepositService
    {
        Task<Deposit> CreateDepositAsync(DepositViewModel depositModel);
        Task DeleteDepositAsync(long depositId);
        Task UpdateDepositAsync(DepositViewModel depositModel);
        Task<Deposit> GetDepositByIdAsync(long id);
        Task<PaginatedAndSortedDataViewModel<Deposit>> GetAllDepositAsync(GetRequestDataViewModel request);
        Task<List<Deposit>> GetLastFiveDepositsAsync();
        Task<decimal> CalculateTotalDepositsLastMonthAsync();
        Task<decimal> CalculateTotalDepositsAsync();
    }
}
