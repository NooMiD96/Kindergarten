using Kindergarten.Database.Contexts;
using Kindergarten.Database.DIServices;
using Kindergarten.Model.Identity;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;

using static Kindergarten.Database.DIServices.DependencyInjections;

namespace Kindergarten.Database
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
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;

                    options.User.RequireUniqueEmail = true;

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;
                })
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
