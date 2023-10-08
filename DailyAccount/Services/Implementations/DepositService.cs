using DailyAccount.Domain.Models;
using DailyAccount.Models;
using DailyAccount.Repository;
using DailyAccount.Services.Interfaces;
using DailyAccount.Utility;
using DailyAccount.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace DailyAccount.Services.Implementations
{
    public class DepositService : IDepositService
    {
        private readonly IRepository<Deposit> _depositRepository;
        private readonly UserHelper _loggedInUser;
        public DepositService(IRepository<Deposit> depositRepository, UserHelper loggedInUser)
        {
            _depositRepository = depositRepository;
            _loggedInUser = loggedInUser;
        }

        public async Task<Deposit> CreateDepositAsync(DepositViewModel depositModel)
        {
            Deposit deposit = new Deposit();
            deposit.Description = depositModel.Description;
            deposit.Amount = depositModel.Amount;
            deposit.Date = depositModel.Date;
            deposit.UserID = _loggedInUser.GetLoggedInUserId();
            var result = await _depositRepository.CreateAsync(deposit);
            return result;
        }

        public async Task UpdateDepositAsync(DepositViewModel depositModel)
        {
            Deposit deposit = await _depositRepository.GetByIdAsync(depositModel.DepositId);
            deposit.Description = depositModel.Description;
            deposit.Amount = depositModel.Amount;
            deposit.Date = depositModel.Date;
            await _depositRepository.UpdateAsync(deposit);
            return;
        }

        public async Task DeleteDepositAsync(long depositId)
        {
            await _depositRepository.DeleteAsync(depositId);
        }

        public async Task<Deposit> GetDepositByIdAsync(long id)
        {
            var result = await _depositRepository.GetByIdAsync(id);
            return result;
        }

        public async Task<PaginatedAndSortedDataViewModel<Deposit>> GetAllDepositAsync(GetRequestDataViewModel request)
        {
            var depositQueryable = _depositRepository.GetAllQueryable(deposit => deposit.UserID == _loggedInUser.GetLoggedInUserId());
            var result = await GridUtility.GetPaginatedAndSortedDataAsync(depositQueryable, request.ElementPerPage, request.Page, request.Sort);
            return result;
        }

        public async Task<List<Deposit>> GetLastFiveDepositsAsync()
        {
            var depositQuery = _depositRepository.GetAllQueryable(deposit => deposit.UserID == _loggedInUser.GetLoggedInUserId());
            depositQuery = depositQuery.OrderByDescending(deposit => deposit.Date);
            var lastFiveDeposits = await depositQuery.Take(5).ToListAsync();
            return lastFiveDeposits;
        }

        public async Task<decimal> CalculateTotalDepositsLastMonthAsync()
        {
            DateTime currentDate = DateTime.UtcNow;
            DateTime lastMonthStartDate = currentDate.AddMonths(-1).Date;
            decimal totalDeposits = await _depositRepository
                .GetAllQueryable(deposit => deposit.UserID == _loggedInUser.GetLoggedInUserId())
                .Where(d => d.Date >= lastMonthStartDate && d.Date <= currentDate.Date)
                .SumAsync(d => d.Amount);
            return totalDeposits;
        }

        public async Task<decimal> CalculateTotalDepositsAsync()
        {
            var depositQuery = _depositRepository.GetAllQueryable(deposit => deposit.UserID == _loggedInUser.GetLoggedInUserId());
            decimal totalDeposits = await depositQuery.SumAsync(d => d.Amount);
            return totalDeposits;
        }
    }
}
