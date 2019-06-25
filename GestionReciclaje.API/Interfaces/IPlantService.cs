using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BaseProject.Models;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using GestionReciclaje.Dtos;
using GestionReciclaje.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Interfaces
{
    public interface IPlantService
    {
        Task<PlantDto> GetById(Guid plantId);
        List<PlantDto> GetAllParent();
        Task<PagedList<Plant>> GetAll(PlantParamsDto plantParams);
        Task<int> Create(PlantDto plantDto);
        Task<int> Delete(Guid plantId);
        Task<int> Update(PlantDto plantDto);

    }
}