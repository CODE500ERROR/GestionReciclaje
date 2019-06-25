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
    public interface IProductService
    {
        Task<ProductDto> GetById(Guid ProdcutId);       
        Task<PagedList<Product>> GetAll(ProductParamsDto ProdcutParams);
        Task<int> Create(ProductDto ProdcutDto);
        Task<int> Delete(Guid ProdcutId);
        Task<int> Update(ProductDto ProdcutDto);

    }
}