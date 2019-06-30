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

    public class ProductController : ControllerBase
    {
       
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService ProductService, IMapper mapper)
        {            
            _productService = ProductService;
            _mapper = mapper;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]ProductParamsDto productParams)
        {
            var products = await  _productService.GetAll(productParams);
            var result= _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(new {
                List=result,
                TotalRecords=productParams.TotalRecords
            });            
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var cat = await _productService.GetById(id);
            if (cat == null)
                return NotFound();

            return Ok(cat);
        }


      
        [HttpPost()]       
        public async Task<ActionResult<int>> Create([FromBody] ProductDto Product)
        {
            try
            {
                await _productService.Create(Product);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPut()]
        public async Task<ActionResult<int>> Update([FromBody] ProductDto Product)
        {
            try
            {
                await _productService.Update(Product);
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
                await _productService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
