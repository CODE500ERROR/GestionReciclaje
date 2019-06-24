using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public CategoryController(ICategoryService categoryService)
        {            
            _categoryService = categoryService;
        }

        // GET api/values
        //[Authorize(Policy="VipOnly")]
        [HttpGet]        
        public IActionResult GetAll()
        {
            var categories = _categoryService.GetAll();
            return Ok(categories);            
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

      
        [HttpPost("Create")]       
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


        [HttpPut("Update")]
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

        [HttpDelete("Delete")]
        public async Task<ActionResult<int>> Delete([FromBody] CategoryDto category)
        {
            try
            {
                await _categoryService.Delete(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
