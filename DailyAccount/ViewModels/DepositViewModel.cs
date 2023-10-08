namespace DailyAccount.Models
{
    public class DepositViewModel
    {
        public long DepositId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
    }
}
