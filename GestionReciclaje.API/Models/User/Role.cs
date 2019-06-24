using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BaseProject.Models
{
    public class Role : IdentityRole<int>
    {
        public Role()
        {
            Users = new HashSet<UserRole>();
            Claims = new HashSet<RoleClaim>();
        }

        public virtual ICollection<UserRole> Users { get; private set; }
        public virtual ICollection<RoleClaim> Claims { get; private set; }

    }
}
