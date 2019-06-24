using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;


namespace BaseProject.Models
{
    public class User : IdentityUser<int> //: UserEntity<int>, IEntity, IHasCreationTime
    {
        public User()
        {
            Claims = new HashSet<UserClaim>();
            Logins = new HashSet<UserLogin>();
            Tokens = new HashSet<UserToken>();
            Roles = new HashSet<UserRole>();
            //CreditCards = new HashSet<CreditCard>();
            //Notifications = new HashSet<Notification>();
        }

        public string ResetPasswordCode { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? DeactivatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime LastActive { get; set; }
        public Guid? PlantId { get; set; }
        public bool IsDeleted{ get; set; }
        public virtual Plant Plant { get; set; }

        public virtual ICollection<UserClaim> Claims { get; private set; }
        public virtual ICollection<UserLogin> Logins { get; private set; }
        public virtual ICollection<UserToken> Tokens { get; private set; }
        public virtual ICollection<UserRole> Roles { get; private set; }
    }    
}
