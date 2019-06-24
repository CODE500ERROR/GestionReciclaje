using System.Linq;
using AutoMapper;
using BaseProject.Models;
using DatingApp.API.Dtos;
using GestionReciclaje.API.Dtos;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserListDto>();       
            CreateMap<UserUpdateDto, User>();            
            CreateMap<UserRegisterDto, User>();
        }
    }
}