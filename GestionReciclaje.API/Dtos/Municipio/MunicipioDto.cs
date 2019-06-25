using System;
using Microsoft.AspNetCore.Http;

namespace GestionReciclaje.Dtos.Municipio
{
    public class MunicipioDto
    {
         public Guid MunicipioId{ get; set; }
        public string Name{ get; set; }
    }
}