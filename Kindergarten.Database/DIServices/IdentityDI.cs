using System;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Database.Models.KindergartenIdentity;

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
        public static async Task IdentityDatabase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var identityContext = scope.ServiceProvider.GetRequiredService<KindergartenIdentityContext>();
                var UserManager     = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                //var RoleManager     = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                try
                {
                    await identityContext.Database.MigrateAsync();

                    var roleNames = UserRoles.RoleList;
                    IdentityResult roleResult;

                    foreach (var roleName in roleNames)
                    {
                        //var roleExist = await RoleManager.RoleExistsAsync(roleName);
                        //if (!roleExist)
                        //{
                        //    roleResult = await RoleManager.CreateAsync(new ApplicationRole(roleName));

                        //    if (!roleResult.Succeeded)
                        //        throw new Exception("Can't add roles in database");
                        //}
                    }

                    var admins = Configuration.GetSection("Admins").GetChildren();
                    foreach (var admin in admins)
                    {
                        var userName = admin["UserName"];
                        var password = admin["Password"];
                        var email    = admin["Email"];

                        var _user = await UserManager.FindByNameAsync(userName);
                        if (_user == null)
                        {
                            var poweruser = new ApplicationUser
                            {
                                UserName = userName,
                                Email = email
                            };

                            var createPowerUser = await UserManager.CreateAsync(poweruser, password);
                            if (createPowerUser.Succeeded)
                            {
                                await UserManager.AddToRoleAsync(poweruser, UserRoles.Admin);
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
                    //if (RoleManager != null)
                    //    RoleManager.Dispose();
                    if (UserManager != null)
                        UserManager.Dispose();
                    if (identityContext != null)
                        identityContext.Dispose();
                }
            }
        }
    }
}
