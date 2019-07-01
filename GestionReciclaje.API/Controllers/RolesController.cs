using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BaseProject.Models;
using DatingApp.API.Data;
using GestionReciclaje.Dtos;
using GestionReciclaje.Interfaces;
using GestionReciclaje.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class RolesController : ControllerBase
    {      
        private readonly RoleManager<Role> _roleManager;
        public RolesController(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        
        //[Authorize(Policy="VipOnly")]
        [HttpGet]
        public IActionResult GetAll()
        {            
            return Ok( _roleManager.Roles);            
        }



    }
}
