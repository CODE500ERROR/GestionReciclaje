using System;

namespace GestionReciclaje.Dtos
{
    public class SeparationDto
    {
        public Guid  SeparationId{ get; set; }
        public string Description { get; set; }
        public Guid? PlantId { get; set; }
        public string PlantName { get; set; }
        public Guid ProductId { get; set; }        
        public double  Quantity{ get; set; }
        public string MeasuresUnit { get; set; }
        public string ProductName { get; set; }
    }
}