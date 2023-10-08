using DailyAccount.Domain.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DailyAccount.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DailyAccountDbContext _context;
        private readonly DbSet<T> _entities;

        public Repository(DailyAccountDbContext dailyAccountDbContext)
        {
            _context = dailyAccountDbContext;
            _entities = _context.Set<T>();
        }
        public async Task<T> CreateAsync(T entity)
        {
            await _entities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(long id)
        {
            var result = await GetByIdAsync(id);
            _entities.Remove(result);
            await _context.SaveChangesAsync();
        }

        public async Task<T> GetByIdAsync(long id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _entities.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public IQueryable<T> GetAllQueryable(Expression<Func<T, bool>> predicate)
        {
            return _entities.Where(predicate);
        }

        public async Task<IAsyncEnumerable<T>> GetAllAsync()
        {
            return (IAsyncEnumerable<T>)_entities.AsAsyncEnumerable();
        }
    }
}
