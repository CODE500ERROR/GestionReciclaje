using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BaseProject.Models;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using GestionReciclaje.API.Models.Separation;
using GestionReciclaje.Dtos;
using GestionReciclaje.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestionReciclaje.Services
{
    public class SeparationService : ISeparationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SeparationService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SeparationDto> GetById(Guid separationId)
        {
            var separation = await _context.Separations.FindAsync(separationId);

            return new SeparationDto
            {
                SeparationId = separation.SeparationId,
                MeasuresUnit = separation.MeasuresUnit,
                ProductId = separation.ProductId,
                PlantId = separation.PlantId,
                Quantity=separation.Quantity,
                Description = separation.Description
            };
        }



        public async Task<PagedList<Separation>> GetAll(SeparationParamsDto SeparationParams)
        {
            var data = _context.Separations.Include(x => x.Product).Include(x => x.Plant)
                                            .OrderByDescending(x => x.CreationTime)
                                            .Where(x => !x.IsDeleted &&
                                                         (string.IsNullOrEmpty(SeparationParams.Description) || x.Description.Contains(SeparationParams.Description)))
                                            .AsQueryable();
            return await PagedList<Separation>.CreateAsync(data, SeparationParams.PageNumber, SeparationParams.PageSize); ;
        }

        public async Task<int> Create(SeparationDto separationDto)
        {            
            var separation = new Separation()
            {
                SeparationId = separationDto.SeparationId,
                MeasuresUnit = separationDto.MeasuresUnit,
                Quantity=separationDto.Quantity,
                ProductId = separationDto.ProductId,
                PlantId = separationDto.PlantId.Value,
                Description = separationDto.Description
            };
            var result = await _context.Separations.AddAsync(separation);
            return await _context.SaveChangesAsync();
        }


        public async Task<int> Update(SeparationDto separationDto)
        {
            var separation = await _context.Separations.FindAsync(separationDto.SeparationId);

            separation.SeparationId= separationDto.SeparationId;
            separation.MeasuresUnit = separationDto.MeasuresUnit;
            separation.ProductId = separationDto.ProductId;
            separation.PlantId = separationDto.PlantId.Value;
            separation.Description = separationDto.Description;
            separation.Quantity=separationDto.Quantity;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(Guid separationId)
        {
            var Separation = await _context.Separations.FindAsync(separationId);
            Separation.IsDeleted = true;
            return await _context.SaveChangesAsync();
        }

    }
}