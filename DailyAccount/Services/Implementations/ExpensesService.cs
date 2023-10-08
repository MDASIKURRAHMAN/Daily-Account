using DailyAccount.Domain.Models;
using DailyAccount.Models;
using DailyAccount.Repository;
using DailyAccount.Services.Interfaces;
using DailyAccount.Utility;
using DailyAccount.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace DailyAccount.Services.Implementations
{
    public class ExpensesService : IExpensesService
    {
        private readonly IRepository<Expenses> _expensesRepository;
        private readonly UserHelper _loggedInUser;
        public ExpensesService(IRepository<Expenses> expensesRepository, UserHelper loggedInUser)
        {
            _expensesRepository = expensesRepository;
            _loggedInUser = loggedInUser;
        }

        public async Task<Expenses> CreateExpensesAsync(ExpensesViewModel expensesModel)
        {
            Expenses expenses = new Expenses();
            expenses.Description = expensesModel.Description;
            expenses.Amount = expensesModel.Amount;
            expenses.Date= expensesModel.Date;
            expenses.UserID = _loggedInUser.GetLoggedInUserId();
            var result = await _expensesRepository.CreateAsync(expenses);
            return result;
        }

        public async Task UpdateExpensesAsync(ExpensesViewModel expensesModel)
        {
            Expenses expenses = await _expensesRepository.GetByIdAsync(expensesModel.ExpensesId);
            expenses.Description = expensesModel.Description;
            expenses.Amount = expensesModel.Amount;
            expenses.Date = expensesModel.Date;
            await _expensesRepository.UpdateAsync(expenses);
            return;
        }
        public async Task DeleteExpensesAsync(long expensesId)
        {
            await _expensesRepository.DeleteAsync(expensesId);
        }

        public async Task<Expenses> GetExpensesByIdAsync(long id)
        {
            var result = await _expensesRepository.GetByIdAsync(id);
            return result;
        }

        public async Task<PaginatedAndSortedDataViewModel<Expenses>> GetAllExpensesAsync(GetRequestDataViewModel request)
        {
            var expensesQuerible = _expensesRepository.GetAllQueryable(expenses => expenses.UserID == _loggedInUser.GetLoggedInUserId());
            var result = await GridUtility.GetPaginatedAndSortedDataAsync(expensesQuerible, request.ElementPerPage, request.Page, request.Sort);
            return result;
        }

        public async Task<List<Expenses>> GetLastFiveExpensesAsync()
        {
            var expensesQuerible = _expensesRepository.GetAllQueryable(expenses => expenses.UserID == _loggedInUser.GetLoggedInUserId());
            expensesQuerible = expensesQuerible.OrderByDescending(expenses => expenses.Date);
            var lastFiveExpenses = await expensesQuerible.Take(5).ToListAsync();
            return lastFiveExpenses;
        }

        public async Task<decimal> CalculateTotalExpensesLastMonthAsync()
        {
            DateTime currentDate = DateTime.UtcNow;
            DateTime lastMonthStartDate = currentDate.AddMonths(-1).Date;
            decimal totalExpenses = await _expensesRepository
                .GetAllQueryable(expenses => expenses.UserID == _loggedInUser.GetLoggedInUserId())
                .Where(expenses => expenses.Date >= lastMonthStartDate && expenses.Date <= currentDate.Date)
                .SumAsync(expenses => expenses.Amount);
            return totalExpenses;
        }

        public async Task<decimal> CalculateTotalExpensesAsync()
        {
            var expensesQuery = _expensesRepository.GetAllQueryable(expenses => expenses.UserID == _loggedInUser.GetLoggedInUserId());
            decimal totalExpenses = await expensesQuery.SumAsync(expenses => expenses.Amount);
            return totalExpenses;
        }
    }
}
