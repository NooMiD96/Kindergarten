﻿using Database.Contexts;
using Database.DIServices;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Model.Identity;

using System;

using static Database.DIServices.DependencyInjections;

namespace Database
{
    public static class DatabaseInitialization
    {
        public const string ASSEMBLY_PATH = "Web";

        public static void SetupDatabaseSettings(IServiceCollection services, IConfiguration Configuration)
        {

            services
                .AddDbContext<KindergartenContext>(options =>
                {
                    options.UseSqlServer(Configuration.GetConnectionString("Kindergarten"),
                                         x => x.MigrationsAssembly(ASSEMBLY_PATH));
                })
                .AddIdentityCore<ApplicationUser>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireDigit = true;

                    options.User.RequireUniqueEmail = true;

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;
                })
                .AddErrorDescriber<RussianIdentityErrorDescriber>()
                .AddRoles<ApplicationRole>()
                .AddUserManager<UserManager<ApplicationUser>>()
                .AddRoleManager<RoleManager<ApplicationRole>>()
                .AddSignInManager()
                .AddClaimsPrincipalFactory<ClaimsPrincipalFactoryDI>()
                .AddEntityFrameworkStores<KindergartenContext>();

            services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, ClaimsPrincipalFactoryDI>();

            services
                .AddAuthentication(IdentityConstants.ApplicationScheme)
                .AddIdentityCookies();
                //(options =>
                //{
                //    options.Cookie.HttpOnly = true;
                //    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                //    options.SlidingExpiration = true;
                //    options.ReturnUrlParameter = "";
                //    options.LoginPath = "";
                //    options.AccessDeniedPath = "";
                //});
        }

        public static void InitializeDb(ServiceProvider serviceProvider, IConfiguration Configuration)
        {
            KindergartenInitDI(serviceProvider, Configuration).GetAwaiter().GetResult();
        }
    }
}
