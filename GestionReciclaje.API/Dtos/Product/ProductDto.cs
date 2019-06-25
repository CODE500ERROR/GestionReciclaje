using System;

namespace GestionReciclaje.Dtos
{
    public class ProductDto
    {
        public Guid  ProductId{ get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public Guid? ParentId { get; set; }
        
    }
}