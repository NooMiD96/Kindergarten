using System;

using Kindergarten.Database.Contexts;
using Kindergarten.Database.DIServices;
using Kindergarten.Model.KindergartenIdentity;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using static Kindergarten.Database.DIServices.DependencyInjections;

namespace Kindergarten.Database
{
    public static class DatabaseInitialization
    {
        public const string ASSEMBLY_PATH = "Kindergarten.Web";

        public static void SetupDatabaseSettings(IServiceCollection services, IConfiguration Configuration)
        {

            services
                .AddDbContext<KindergartenIdentityContext>(options =>
                {
                    options.UseSqlServer(Configuration.GetConnectionString("Kindergarten"),
                                         x => x.MigrationsAssembly(ASSEMBLY_PATH));
                })
                .AddDbContext<KindergartenContext>(options =>
                {
                    options.UseSqlServer(Configuration.GetConnectionString("Kindergarten"),
                                         x => x.MigrationsAssembly(ASSEMBLY_PATH));
                });

            services
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
            .AddClaimsPrincipalFactory<ClaimsPrincipalFactoryDI>()
            .AddEntityFrameworkStores<KindergartenIdentityContext>();

            services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, ClaimsPrincipalFactoryDI>();
        }

        public static void InitializeDb(ServiceProvider serviceProvider, IConfiguration Configuration)
        {
            // We cant start the both DI together 'couse we have a reference from Project to Identity context
            //Task.WhenAll(
            //    ProjectTodoDataBase(serviceProvider, Configuration),
            //    IdentityDataBase(serviceProvider, Configuration)
            //).GetAwaiter().GetResult();

            IdentityInitDI(serviceProvider, Configuration).GetAwaiter().GetResult();
            KindergartenInitDI(serviceProvider, Configuration).GetAwaiter().GetResult();
        }
    }
}
