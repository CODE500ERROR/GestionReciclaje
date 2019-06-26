using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BaseProject.Models;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using GestionReciclaje.Dtos;
using GestionReciclaje.Interfaces;
using GestionReciclaje.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Services
{
    public class ProductService : IProductService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProductService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductDto> GetById(Guid productId)
        {
            var product = await _context.Products.Include(x => x.Category).FirstAsync(x=>x.ProductId==productId);  

            return new ProductDto {
                ProductId= product.ProductId,
                Name= product.Name,
                Description= product.Description,
                CategoryId= product.CategoryId,
                ParentId=product.Category.ParentId                
            };
        }

       

        public async Task<PagedList<Product>> GetAll(ProductParamsDto ProdcutParams)
        {
            var data = _context.Products .Include(x=>x.Category)
                                         .OrderByDescending(x => x.CreationTime)
                                         .Where(x => !x.IsDeleted)
                                         .AsQueryable(); //.ProjectTo<Product>(_mapper.ConfigurationProvider);
            return await PagedList<Product>.CreateAsync(data, ProdcutParams.PageNumber, ProdcutParams.PageSize); ;
        }

        public async Task<int> Create(ProductDto product)
        {
           var prod = new Product() {                
                Name = product.Name,
                Description=product.Description,
                CategoryId= product.CategoryId
            };
            var result = await _context.Products.AddAsync(prod);
            return await _context.SaveChangesAsync();
        }


        public async Task<int> Update(ProductDto product)
        {
            var prod = await _context.Products.FindAsync(product.ProductId);

            prod.Name = product.Name;
            prod.CategoryId = product.CategoryId;
            prod.Description = product.Description;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(Guid prodcutId)
        {
            var product = await _context.Products.FindAsync(prodcutId);
            product.IsDeleted = true;
            return await _context.SaveChangesAsync();
        }

    }
}