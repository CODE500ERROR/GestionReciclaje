using BaseProject.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GestionReciclaje.Models
{
    public class Category  //: IHasCreationTime, ISoftDelete
    {
        public Category()
        {
            Children = new List<Category>();
            Products = new List<Product>();
        }
        public Guid CategoryId { get; set; }
        public string Name{ get; set; }
        public bool IsDeleted { get ; set; }
        public DateTime CreationTime { get; set; }
        public Guid? ParentId{ get; set; }
        public virtual Category Parent { get; set; }

        public ICollection<Category> Children { get; set; }
        public ICollection<Product> Products{ get; set; }
    }
}
