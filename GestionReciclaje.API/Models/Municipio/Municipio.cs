using System;
using System.Collections.Generic;

namespace BaseProject.Models
{
    public class Municipio //: IHasCreationTime, ISoftDelete
    {

        public Municipio()
        {
            Plants = new List<Plant>();
        }
        public Guid MunicipioId{ get; set; }
        public string Name { get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsDeleted { get; set; }

        public virtual IList<Plant> Plants { get; set; }
       
    }
}
