using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BaseProject.Models;
using DatingApp.API.Helpers;
using GestionReciclaje.API.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public DatingRepository(DataContext context, IMapper mapper, UserManager<User> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager  =userManager;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<UserDetailDto> GetUserDto(int id)
        {

            var userResult = await (from user in _context.Users
                                    where user.Id == id && user.IsDeleted == false
                                    orderby user.UserName
                                    select new
                                    {
                                        Id = user.Id,
                                        Email = user.UserName,
                                        FirstName = user.FirstName,
                                        LastName = user.LastName,
                                        PhoneNumber = user.PhoneNumber,
                                        PlantId = user.PlantId,
                                        Roles = (from userRole in user.Roles
                                                 join role in _context.Roles
                                                 on userRole.RoleId
                                                 equals role.Id
                                                 select role.Name).ToList()
                                    }).FirstOrDefaultAsync();

            return new UserDetailDto()
            {
                Email = userResult.Email,
                FirstName = userResult.FirstName,
                LastName = userResult.LastName,
                PhoneNumber = userResult.PhoneNumber,
                Id = userResult.Id,
                Roles = userResult.Roles,
                PlantId = userResult.PlantId
            };
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async void UpdateUser(UserDetailDto userDto)
        {

            var user = await _context.Users.FindAsync(userDto.Id);
            var userRoles = await _userManager.GetRolesAsync(user);
            var selectedRoles = userDto.Roles ?? new string[]{};
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if (!result.Succeeded)
                throw new ValidationException(result.Errors.FirstOrDefault().ToString());
            
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if (!result.Succeeded)
                  throw new ValidationException(result.Errors.FirstOrDefault().ToString());
            
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            user.PlantId = userDto.PlantId;
            user.PhoneNumber = userDto.PhoneNumber;
            await _context.SaveChangesAsync();
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(x => x.Plant)
                                .OrderByDescending(u => u.CreationTime).AsQueryable();

            //users = users.Where(u => u.Id != userParams.UserId);
            userParams.TotalRecords = users.Count();

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }


    }
}