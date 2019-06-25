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
    public class PlantService : IPlantService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PlantService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PlantDto> GetById(Guid plantId)
        {
            var plant = await _context.Plants.FindAsync(plantId);

             return new PlantDto {
                PlantId=plant.PlantId,
                Name=plant.Name,
                Address=plant.Address,
                OperatorsQuantity=plant.OperatorsQuantity,
                MunicipioId=plant.MunicipioId
            };
        }

        public List<PlantDto> GetAllParent()
        {
            var data = _context.Categories
                                     .OrderByDescending(x => x.CreationTime)
                                     .Where(x => !x.IsDeleted && !x.ParentId.HasValue)
                                     .AsQueryable().ProjectTo<PlantDto>(_mapper.ConfigurationProvider);
            return data.ToList();
        }

        public async Task<PagedList<Plant>>GetAll(PlantParamsDto plantParams)
        {
            var data = _context.Plants.OrderByDescending(x => x.CreationTime)
                                         .Where(x => !x.IsDeleted)
                                         .AsQueryable(); //.ProjectTo<PlantDto>(_mapper.ConfigurationProvider);
            return await PagedList<Plant>.CreateAsync(data, plantParams.PageNumber, plantParams.PageSize); ;
        }

        public async Task<int> Create(PlantDto plantDto)
        {
          var plant = new Plant() {
                Address = plantDto.Address,
                Name = plantDto.Name,
                MunicipioId = plantDto.MunicipioId,
                OperatorsQuantity=plantDto.OperatorsQuantity
            };
            var result = await _context.Plants.AddAsync(plant);
            return await _context.SaveChangesAsync();
        }


        public async Task<int> Update(PlantDto plantDto)
        {
            var plant = await _context.Plants.FindAsync(plantDto.PlantId);

            plant.Address = plantDto.Address;
            plant.Name = plantDto.Name;
            plant.MunicipioId = plantDto.MunicipioId;
            plant.OperatorsQuantity = plantDto.OperatorsQuantity;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(Guid plantId)
        {
            var plant = await _context.Plants.FindAsync(plantId);
            plant.IsDeleted = true;
            return await _context.SaveChangesAsync();
        }

    }
}