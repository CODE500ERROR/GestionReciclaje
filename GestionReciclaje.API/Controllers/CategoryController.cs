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

    public class CategoryController : ControllerBase
    {
       
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {            
            _categoryService = categoryService;
            _mapper = mapper;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]CategoryParamsDto catParams)
        {
            var categories = await  _categoryService.GetAll(catParams);
            var result= _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(result);            
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var cat = await _categoryService.GetById(id);
            if (cat == null)
                return NotFound();

            return Ok(cat);
        }

        [HttpGet("GetAllParent")]
        public IActionResult GetAllParent()
        {
            var parents = _categoryService.GetAllParent();
            return Ok(parents);
        }


         [HttpGet("GetCategoryByParent/{id}")]
        public IActionResult GetCategoryByParent(Guid id)
        {
            var parents = _categoryService.GetCategoryByParent(id);
            return Ok(parents);
        }

      
        [HttpPost()]       
        public async Task<ActionResult<int>> Create([FromBody] CategoryDto category)
        {
            try
            {
                await _categoryService.Create(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPut()]
        public async Task<ActionResult<int>> Update([FromBody] CategoryDto category)
        {
            try
            {
                await _categoryService.Update(category);
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
                await _categoryService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
