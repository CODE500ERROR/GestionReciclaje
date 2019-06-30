using System.Collections.Generic;
using System.Threading.Tasks;
using BaseProject.Models;
using DatingApp.API.Helpers;
using GestionReciclaje.API.Dtos;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParms);
          Task<User> GetUser(int id);
          Task<UserDetailDto> GetUserDto(int id);
          void UpdateUser(UserDetailDto userDto);
         
    }
}