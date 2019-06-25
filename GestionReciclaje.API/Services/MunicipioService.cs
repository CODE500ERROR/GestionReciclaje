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
using GestionReciclaje.Dtos.Municipio;
using GestionReciclaje.Interfaces;


namespace GestionReciclaje.Services
{
    public class MunicipioService : IMunicipioService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MunicipioService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

       
        

        public List<MunicipioDto> GetAll()
        {
            var result= _context.Municipios.Where(x=>!x.IsDeleted);
            return _mapper.Map<IEnumerable<MunicipioDto>>(result).ToList();
        }

      
    }
}