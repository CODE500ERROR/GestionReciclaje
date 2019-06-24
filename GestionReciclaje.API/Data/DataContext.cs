using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BaseProject.Models;
using GestionReciclaje.Models;
using System;

namespace DatingApp.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
                             IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products{ get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Municipio> Municipios{ get; set; }
        public DbSet<Category> Categories{ get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region User
           
            builder.Entity<User>()
               .HasOne(x => x.Plant)
               .WithMany(x => x.Users)
               .HasForeignKey(x => x.PlantId);

            // Indexes for "normalized" username and email, to allow efficient lookups
            builder.Entity<User>()
                   .HasIndex(u => new { u.NormalizedUserName, u.DeactivatedDate })
                   .HasName("IX_User_NormalizedUserName")
                   .IsUnique();

            builder.Entity<User>()
                   .HasIndex(u => u.NormalizedEmail)
                   .HasName("IX_User_NormalizedEmail");
            #endregion User

            #region Category

            builder.Entity<Category>()
                   .Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Entity<Category>()
                   .Property(x => x.CreationTime)
                   .HasDefaultValue(DateTime.Now);

            builder.Entity<Category>()
                   .Property(x => x.IsDeleted)
                   .HasDefaultValue(false);



            //////////////////////////////////////////
            /// FKs
            //////////////////////////////////////////
            ///
            builder.Entity<Category>()
               .HasMany(x => x.Children)
               .WithOne(x => x.Parent)
               .HasForeignKey(x => x.ParentId);

            builder.Entity<Category>()
                    .HasMany(x => x.Products);
            #endregion

            #region Municipio
            builder.Entity<Municipio>()
                   .Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Entity<Municipio>()
                   .Property(x => x.CreationTime)
                   .HasDefaultValue(DateTime.Now);


            builder.Entity<Municipio>()
                   .Property(x => x.IsDeleted)
                   .HasDefaultValue(false);

            //////////////////////////////////////////
            /// FKs
            //////////////////////////////////////////
            ///
            builder.Entity<Municipio>()
                   .HasMany(x => x.Plants);
            #endregion

            #region Plant
            builder.Entity<Plant>()
                   .Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Entity<Plant>()
                    .Property(x => x.Address)
                    .IsRequired()
                    .HasMaxLength(200);

            builder.Entity<Plant>()
                   .Property(x => x.CreationTime)
                   .HasDefaultValue(DateTime.Now);

            builder.Entity<Plant>()
                   .Property(x => x.IsDeleted)
                   .HasDefaultValue(false);


            //////////////////////////////////////////
            /// FKs
            //////////////////////////////////////////
            ///

            builder.Entity<Plant>()
                   .HasOne(x => x.Municipio)
                   .WithMany(x => x.Plants)
                   .HasForeignKey(x => x.MunicipioId);

            builder.Entity<Plant>()
                   .HasMany(x => x.Users);
            #endregion

            #region Product
            builder.Entity<Product>()
                   .Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Entity<Product>()
                   .Property(x => x.CreationTime)
                   .HasDefaultValue(DateTime.Now);

            builder.Entity<Product>()
                   .Property(x => x.IsDeleted)
                   .HasDefaultValue(false);


            //////////////////////////////////////////
            /// FKs
            //////////////////////////////////////////
            ///

            builder.Entity<Product>()
                   .HasOne(x => x.Category)
                   .WithMany(x => x.Products)
                   .HasForeignKey(x => x.CategoryId);
            #endregion

            #region RoleClaim
            builder.Entity<RoleClaim>()
               .HasOne(x => x.Role)
               .WithMany(x => x.Claims)
               .HasForeignKey(x => x.RoleId);
            #endregion

            #region Role
            builder.Entity<Role>()
                   .Property(x => x.Id)
                   .ValueGeneratedNever();

            // Index for "normalized" role name to allow efficient lookups
            builder.Entity<Role>().HasIndex(r => r.NormalizedName).HasName("IX_Role_Name").IsUnique();
            #endregion

            #region userclaim
            builder.Entity<UserClaim>()
                   .HasOne(x => x.User)
                   .WithMany(x => x.Claims)
                   .HasForeignKey(x => x.UserId);
            #endregion         

            #region userRole
            builder.Entity<UserRole>()
              .HasOne(x => x.User)
              .WithMany(x => x.Roles)
              .HasForeignKey(x => x.UserId);

            builder.Entity<UserRole>()
                   .HasOne(x => x.Role)
                   .WithMany(x => x.Users)
                   .HasForeignKey(x => x.RoleId);
            #endregion

            //#region usertoken
            //builder.Entity<UserToken>()
            //   .HasOne(x => x.User)
            //   .WithMany(x => x.Tokens)
            //   .HasForeignKey(x => x.UserId);
            //#endregion

        }
    }


}