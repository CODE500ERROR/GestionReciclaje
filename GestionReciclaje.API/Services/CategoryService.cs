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
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CategoryService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryDto> GetById(Guid categoryId)
        {
            var cat = await _context.Categories.FindAsync(categoryId);
            return new CategoryDto
            {
                CategoryId = cat.CategoryId,
                Name = cat.Name,
                ParentId = cat.ParentId
            };
        }

        public List<CategoryDto> GetAllParent()
        {
            var data = _context.Categories
                                     .OrderByDescending(x => x.CreationTime)
                                     .Where(x => !x.IsDeleted && !x.ParentId.HasValue)
                                     .AsQueryable().ProjectTo<CategoryDto>(_mapper.ConfigurationProvider);
            return data.ToList();
        }



        public List<CategoryDto> GetCategoryByParent(Guid parentId)
        {
            var data =  _context.Categories
                                            .OrderByDescending(x => x.CreationTime)
                                            .Where(x => !x.IsDeleted && x.ParentId==parentId);
             return _mapper.Map<IEnumerable<CategoryDto>>(data).ToList();                                   
        }
        public async Task<PagedList<Category>> GetAll(CategoryParamsDto catParams)
        {


            var data = _context.Categories.Include(x=>x.Parent)
                                          .OrderByDescending(x => x.CreationTime)
                                         .Where(x => !x.IsDeleted)
                                         .AsQueryable(); //.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider);
            catParams.TotalRecords= data.Count();
            return await PagedList<Category>.CreateAsync(data, catParams.PageNumber, catParams.PageSize); ;
        }

        public async Task<int> Create(CategoryDto categoryDto)
        {
            var category = new Category()
            {
                Name = categoryDto.Name,
                ParentId = categoryDto.ParentId
            };
            var result = await _context.Categories.AddAsync(category);
            return await _context.SaveChangesAsync();
        }


        public async Task<int> Update(CategoryDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(categoryDto.CategoryId);
            category.Name = categoryDto.Name;
            category.ParentId = categoryDto.ParentId;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(Guid catId)
        {
            var category = await _context.Categories.FindAsync(catId);
            category.IsDeleted = true;
            return await _context.SaveChangesAsync();
        }



    }
}