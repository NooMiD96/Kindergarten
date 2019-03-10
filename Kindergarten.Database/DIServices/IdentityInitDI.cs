using System;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.Identity;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Kindergarten.Database.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public static partial class DependencyInjections
    {
        public static async Task IdentityInitDI(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var identityContext = scope.ServiceProvider.GetRequiredService<IdentityContext>();
                var userManager     = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager     = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                try
                {
                    await identityContext.Database.MigrateAsync();

                    var roleNames = UserRoles.RoleList;
                    IdentityResult roleResult;

                    foreach (var roleName in roleNames)
                    {
                        var roleExist = await roleManager.RoleExistsAsync(roleName);
                        if (!roleExist)
                        {
                            roleResult = await roleManager.CreateAsync(new ApplicationRole(roleName));

                            if (!roleResult.Succeeded)
                                throw new Exception("Can't add roles in database");
                        }
                    }

                    var admins = Configuration.GetSection("Admins").GetChildren();
                    foreach (var admin in admins)
                    {
                        var userName = admin["UserName"];
                        var password = admin["Password"];
                        var email    = admin["Email"];

                        var _user = await userManager.FindByNameAsync(userName);
                        if (_user == null)
                        {
                            var poweruser = new ApplicationUser
                            {
                                UserName = userName,
                                Email = email
                            };

                            var createPowerUser = await userManager.CreateAsync(poweruser, password);
                            if (createPowerUser.Succeeded)
                            {
                                await userManager.AddToRoleAsync(poweruser, UserRoles.Admin);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"\r\n\r\ninfo: Trouble with first connection to identity database:\n{ex.Message}\r\n\r\n");
                }
                finally
                {
                    if (roleManager != null)
                        roleManager.Dispose();
                    if (userManager != null)
                        userManager.Dispose();
                    if (identityContext != null)
                        identityContext.Dispose();
                }
            }
        }
    }
}
