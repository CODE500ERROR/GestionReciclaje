using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using GestionReciclaje.Dtos;
using GestionReciclaje.Dtos.Plant;
using GestionReciclaje.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class PlantController : ControllerBase
    {
       
        private readonly IPlantService _plantService;
        private readonly IMapper _mapper;

        public PlantController(IPlantService plantService, IMapper mapper)
        {            
            _plantService = plantService;
            _mapper = mapper;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PlantParamsDto plantParams)
        {
            var plants = await  _plantService.GetAll(plantParams);
            var result= _mapper.Map<IEnumerable<PlantDto>>(plants);
            return Ok(new {
                List=result,
                TotalRecords=plantParams.TotalRecords
            });            
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var plant = await _plantService.GetById(id);
            if (plant == null)
                return NotFound();

            return Ok(plant);
        }


      
        [HttpPost()]       
        public async Task<ActionResult<int>> Create([FromBody] PlantDto Plant)
        {
            try
            {
                await _plantService.Create(Plant);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPut()]
        public async Task<ActionResult<int>> Update([FromBody] PlantDto Plant)
        {
            try
            {
                await _plantService.Update(Plant);
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
                await _plantService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
