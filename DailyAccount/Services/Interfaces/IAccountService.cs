using DailyAccount.Models;
using DailyAccount.ViewModels;

namespace DailyAccount.Services.Interfaces
{
    public interface IAccountService
    {
        Task<LoginReturnViewModel?> LoginAndGenerateTokenAsync(LoginDetailsViewModel loginDetails);
    }
}
