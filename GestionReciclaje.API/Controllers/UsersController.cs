using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using GestionReciclaje.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }



        [HttpGet]
       
        public async Task<IActionResult> GetAll([FromQuery]UserParams userParams)
        {
            var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);                    
            userParams.UserId = currentUserId;
            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserListDto>>(users);


            return Ok(new
            {
                List = usersToReturn,
                TotalRecords = userParams.TotalRecords
            });
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var userToReturn = await _repo.GetUserDto(id);
            return Ok(userToReturn);
        }

        [HttpPut()]
        public IActionResult Update(UserDetailDto userForUpdateDto)
        {
            //if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //  return Unauthorized();
            try
            {
                //_mapper.Map(userForUpdateDto, userFromRepo);
                _repo.UpdateUser(userForUpdateDto);
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(500);
            }

        }

    }
}