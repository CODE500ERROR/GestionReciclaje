using System;
using System.Collections.Generic;

namespace GestionReciclaje.API.Dtos
{
    public class UserDetailDto
    {
       public int Id { get; set; }
       public string Email { get; set; }
       public string PhoneNumber { get; set; }
       public IList<string> Roles { get; set; }
       public DateTime? LastActive { get; set; }
       public Guid?  PlantId{ get; set; }
       public string FirstName { get; set; }
       public string LastName { get; set; }
    }
}