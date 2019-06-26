using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserLoginDto
    {
        [Required]
        public string Email { get; set; }

        [StringLength(20,MinimumLength=4,ErrorMessage="You must specify password between 4 and 8 character")]
        [Required]
        public string Password { get; set; }
    }
}