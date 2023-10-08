using DailyAccount.Domain.Models;

namespace DailyAccount.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserById(long id);
        Task<User> GetUserByEmail(string email);
        Task<IAsyncEnumerable<User>> GetAllUserAsync();
    }
}
