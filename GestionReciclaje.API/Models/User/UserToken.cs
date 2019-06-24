using Microsoft.AspNetCore.Identity;

namespace BaseProject.Models
{
    public class UserToken : IdentityUserToken<int>
    {
        public virtual User User { get; set; }
    }
}
