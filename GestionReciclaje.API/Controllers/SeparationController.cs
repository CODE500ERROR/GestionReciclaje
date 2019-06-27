using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using GestionReciclaje.Dtos;
using GestionReciclaje.Dtos.Separation;
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

    public class SeparationController : ControllerBase
    {
       
        private readonly ISeparationService _separationService;
        private readonly IMapper _mapper;

        public SeparationController(ISeparationService SeparationService, IMapper mapper)
        {            
            _separationService = SeparationService;
            _mapper = mapper;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SeparationParamsDto SeparationParams)
        {
            var Separations = await  _separationService.GetAll(SeparationParams);
            var result= _mapper.Map<IEnumerable<SeparationDto>>(Separations);
            return Ok(result);            
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var Separation = await _separationService.GetById(id);
            if (Separation == null)
                return NotFound();

            return Ok(Separation);
        }


      
        [HttpPost()]       
        public async Task<ActionResult<int>> Create([FromBody] SeparationDto Separation)
        {
            try
            {
                await _separationService.Create(Separation);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPut()]
        public async Task<ActionResult<int>> Update([FromBody] SeparationDto Separation)
        {
            try
            {
                await _separationService.Update(Separation);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<int>> Delete(Guid id)
        {
            try
            {
                await _separationService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
