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
    public interface ICategoryService
    {
        Task<CategoryDto> GetById(Guid categoryId);
        List<CategoryDto> GetAllParent();
        Task<PagedList<Category>> GetAll(CategoryParamsDto catParams);
        Task<int> Create(CategoryDto categoryDto);
        Task<int> Delete(Guid catId);
        Task<int> Update(CategoryDto categoryDto);

    }
}