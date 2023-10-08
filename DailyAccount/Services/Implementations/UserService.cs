using DailyAccount.Domain.Models;
using DailyAccount.Repository;
using DailyAccount.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DailyAccount.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserById(long id)
        {
            var result = await _userRepository.GetByIdAsync(id);
            return result;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetAllQueryable(x => x.Email == email).FirstOrDefaultAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            return await _userRepository.UpdateAsync(user);
        }

        public async Task<IAsyncEnumerable<User>> GetAllUserAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User> CreateUserAsync(User user)
        {
            return await _userRepository.CreateAsync(user);
        }
    }
}
