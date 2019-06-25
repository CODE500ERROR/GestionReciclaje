
using System;
using Microsoft.AspNetCore.Http;

namespace GestionReciclaje.Dtos
{
    public class PlantDto
    {
        public Guid PlantId{ get; set; }
        public string Name{ get; set; }
        public string Address{ get; set; }
        public string MunicipioName{ get; set; }
        public int OperatorsQuantity{ get; set; }
        public Guid MunicipioId { get; set; }
        
    }
}