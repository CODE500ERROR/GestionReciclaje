using Microsoft.AspNetCore.Identity;

namespace BaseProject.Models
{
    public class RoleClaim : IdentityRoleClaim<int> //: RoleClaimEntity<int>
    {
        public virtual Role Role { get; set; }
    }
}
