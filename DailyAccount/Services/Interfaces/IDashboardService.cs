using DailyAccount.ViewModels;

namespace DailyAccount.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardElementViewModel> GetDashboardElement();
    }
}
