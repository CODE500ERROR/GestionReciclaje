using BaseProject.Models;
using Microsoft.AspNetCore.Identity;

namespace BaseProject.Models
{
    public class UserLogin : IdentityUserLogin<int>
    {
        public virtual User User { get; set; }
    }
}
