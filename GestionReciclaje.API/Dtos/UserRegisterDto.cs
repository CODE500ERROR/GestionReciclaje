using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }
            
        public DateTime LastActive { get; set; }

        public UserRegisterDto()
        {
            LastActive = DateTime.Now;
        }
    }
}