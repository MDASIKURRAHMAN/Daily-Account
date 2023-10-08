using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace DailyAccount.Domain.Models
{
    public class User
    {
        [Key]
        public long UserID { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string? Username { get; set; }
    }
}
