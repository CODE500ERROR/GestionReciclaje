using GestionReciclaje.Models;
using System;
using System.Collections.Generic;


namespace BaseProject.Models
{
    public class Product //: IHasCreationTime, ISoftDelete
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Description{ get; set; }
        public Guid CategoryId{ get; set; }
        public Category Category { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
