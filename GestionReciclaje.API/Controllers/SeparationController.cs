using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

    public class SeparationController : ControllerBase
    {

        private readonly ISeparationService _separationService;
        private readonly IMapper _mapper;
        public IDatingRepository _datingRepository;

        public SeparationController(ISeparationService SeparationService, IDatingRepository datingRepository, IMapper mapper)
        {
            _datingRepository = datingRepository;
            _separationService = SeparationService;
            _mapper = mapper;
        }


        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SeparationParamsDto SeparationParams)
        {
            var Separations = await _separationService.GetAll(SeparationParams);
            var result = _mapper.Map<IEnumerable<SeparationDto>>(Separations);
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
                //var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                //var user = await _datingRepository.GetUserDto(currentUser);
                Separation.PlantId = Guid.Parse("5A613AFA-203D-4A26-63C7-08D6FB3861CB"); //user.PlantId;
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
                var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = await _datingRepository.GetUserDto(currentUser);
                Separation.PlantId = user.PlantId;
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
