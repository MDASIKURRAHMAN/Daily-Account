using DailyAccount.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DailyAccount.Domain.ApplicationDbContext
{
    public class DailyAccountDbContext : DbContext
    {
        public DailyAccountDbContext(DbContextOptions<DailyAccountDbContext> options) : base(options) 
        {
        
        }
        public DbSet<User> Users  { get; set; }
        public DbSet<Deposit> Deposits { get; set; }
        public DbSet<Expenses> Expenses { get; set; }

    }
}
