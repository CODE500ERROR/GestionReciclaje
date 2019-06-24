using BaseProject.Models;
using Microsoft.AspNetCore.Identity;

namespace BaseProject.Models
{
    public class UserClaim : IdentityUserClaim<int> //UserClaimEntity<int>
    {
        public virtual User User { get; set; }
    }
}
