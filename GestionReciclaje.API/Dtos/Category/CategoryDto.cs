using System;
using Microsoft.AspNetCore.Http;

namespace GestionReciclaje.Dtos
{
    public class CategoryDto
    {
        public Guid CategoryId { get; set; }
        public Guid? ParentId { get; set; }
        public string Name { get; set; }
    }
}