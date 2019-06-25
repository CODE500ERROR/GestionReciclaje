using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using GestionReciclaje.Dtos;
using GestionReciclaje.Interfaces;
using GestionReciclaje.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class MunicipioController : ControllerBase
    {
       
        private readonly IMunicipioService _municipioService;
        private readonly IMapper _mapper;

        public MunicipioController(IMunicipioService municipioService, IMapper mapper)
        {            
            _municipioService = municipioService;
            _mapper = mapper;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var municipio=_municipioService.GetAll();            
            return Ok(municipio);            
        }


       

    }
}
