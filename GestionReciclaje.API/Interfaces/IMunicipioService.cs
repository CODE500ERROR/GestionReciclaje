using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BaseProject.Models;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using GestionReciclaje.Dtos;
using GestionReciclaje.Dtos.Municipio;
using GestionReciclaje.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Interfaces
{
    public interface IMunicipioService
    {
      
       List<MunicipioDto> GetAll();
        

    }
}