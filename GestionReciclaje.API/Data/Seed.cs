using System.Collections.Generic;
using System.Linq;
using BaseProject.Models;
using GestionReciclaje.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userMananger;

        private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _context;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            _userMananger = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public void SeedUsers()
        {
            if (!_userMananger.Users.Any())
            {               
                var roles = new List<Role>
                {
                    new Role{Id=1,Name = "Super Admin"},
                    new Role{Id=2,Name = "Admin"},
                    new Role{Id=3,Name = "Operador"},
                };
                _context.Roles.AddRange(roles);
                _context.SaveChanges();

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    _context.Users.Add(user);
                    var userRole = new UserRole()
                    {
                        RoleId = 3,
                        UserId = user.Id
                    };
                    _context.UserRoles.Add(userRole);                   
                }
                _context.SaveChanges();
            }
        }


        public void SeedCategory()
        {
            for (int i = 0; i < 6; i++)
            {
                var category = new Category()
                {
                    Name = "Categoria0" + i
                };
                _context.Categories.Add(category);
            }
            _context.SaveChanges();
        }



        public void SeedMunicipios()
        {
            var municipio = new Municipio()
            {
                Name = "Resistencia"
            };
            _context.Municipios.Add(municipio);
            _context.SaveChanges();
        }



        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}