using System;
using System.Threading.Tasks;

using Kindergarten.Database.Contexts;

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
        public static async Task KindergartenInitDI(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var kindergartenContext = scope.ServiceProvider.GetRequiredService<KindergartenContext>();
                try
                {
                    await kindergartenContext.Database.MigrateAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"\r\n\r\ninfo: Trouble with first connection to project database:\n{ex.Message}\r\n\r\n");
                }
                finally
                {
                    if (kindergartenContext != null)
                        kindergartenContext.Dispose();
                }
            }
        }
    }
}
