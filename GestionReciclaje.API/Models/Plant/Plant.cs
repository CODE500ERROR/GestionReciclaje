using System;
using System.Collections.Generic;
using System.Text;
using GestionReciclaje.API.Models.Separation;

namespace BaseProject.Models
{
    public class Plant //: IHasCreationTime, ISoftDelete
    {
        public Plant()
        {
            Users = new List<User>();
        }
        public Guid PlantId { get; set; }
        public string Name{ get; set; }
        public string Address{ get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsDeleted { get; set; }
        public int OperatorsQuantity { get; set; }
        public Guid MunicipioId { get; set; }
        public virtual Municipio Municipio { get; set; }
        public virtual ICollection<User> Users{ get; set; }
        public virtual ICollection<Separation> Separations{ get; set; }

    }
}
