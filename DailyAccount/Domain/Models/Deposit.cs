using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DailyAccount.Domain.Models
{
    public class Deposit
    {
        [Key]
        public long DepositID { get; set; }
        [Required]
        public long UserID { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [StringLength(255)]
        public string? Description { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
