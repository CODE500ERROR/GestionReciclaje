using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BaseProject.Models;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using GestionReciclaje.API.Models.Separation;
using GestionReciclaje.Dtos;
using GestionReciclaje.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Interfaces
{
    public interface ISeparationService
    {
        Task<SeparationDto> GetById(Guid separationId);       
        Task<PagedList<Separation>> GetAll(SeparationParamsDto separationParams);
        Task<int> Create(SeparationDto separationDto);
        Task<int> Delete(Guid separationId);
        Task<int> Update(SeparationDto separationDto);

    }
}