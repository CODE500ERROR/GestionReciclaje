using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BaseProject.Models;
using DatingApp.API.Data;
using GestionReciclaje.Dtos;
using GestionReciclaje.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto> GetById(Guid categoryId);
        List<CategoryDto> GetAllParent();
        List<CategoryDto> GetAll();
        Task<int> Create(CategoryDto categoryDto);
        Task<int> Delete(CategoryDto categoryDto);
        Task<int> Update(CategoryDto categoryDto);

    }
}