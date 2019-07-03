using System;
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
                var userSuperAdmin = new User() { FirstName = "Super Admin", LastName = "Super Admin", Email = "super_admin@gmail.com", UserName = "super_admin@gmail.com", NormalizedEmail = "super_admin@gmail.com".ToUpper(), NormalizedUserName = "super_admin@gmail.com".ToUpper(), CreationTime = DateTime.Now, ConcurrencyStamp = "a07301d1-bc56-4e99-a2b3-b59e438bb129", SecurityStamp = "6YYH5RHYUXZC7RVJ4CHFGYRST465ZVFY", PasswordHash = "AQAAAAEAACcQAAAAECqWq4BVHlxZP8v3+lJHuZEt4rHoP8zQ6peVBNjjQvUDuPHUiC8GkrpuVNEw5O8Q7w==" };
                _context.Users.Add(userSuperAdmin);
                var roleAdmin = new UserRole()
                {
                    RoleId = 1,
                    UserId = userSuperAdmin.Id
                };
                _context.UserRoles.Add(roleAdmin);

                _context.SaveChanges();
            }
        }


        public void SeedCategory()
        {
            if (!_context.Categories.Any())
            {
                var categoryInorganicos = new Category()
                {
                    Name = "Inorganicos"
                };
                _context.Categories.Add(categoryInorganicos);
                var categoryOrganicos = new Category()
                {
                    Name = "Organicos"
                };
                _context.Categories.Add(categoryOrganicos);
                _context.SaveChanges();
            }
        }


        



        public void SeedMunicipios()
        {
            if (!_context.Municipios.Any())
            {
                var municipio = new Municipio()
                {
                    Name = "Resistencia"
                };
                _context.Municipios.Add(municipio);
                _context.SaveChanges();
            }
            
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