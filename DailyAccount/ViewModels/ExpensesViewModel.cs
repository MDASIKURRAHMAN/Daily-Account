namespace DailyAccount.Models
{
    public class ExpensesViewModel
    {
        public long ExpensesId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
    }
}
