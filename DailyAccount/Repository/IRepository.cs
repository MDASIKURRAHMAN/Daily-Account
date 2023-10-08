using System.Linq.Expressions;

namespace DailyAccount.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(long id);
        Task<T> GetByIdAsync(long id);
        Task<IAsyncEnumerable<T>> GetAllAsync();
        IQueryable<T> GetAllQueryable(Expression<Func<T, bool>> predicate);
    }
}
