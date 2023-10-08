namespace DailyAccount.ViewModels
{
    public class PaginatedAndSortedDataViewModel<T>
    {
        public bool Success { get; set; }
        public int LastRow { get; set; }
        public List<T> Data { get; set; }
    }
}
