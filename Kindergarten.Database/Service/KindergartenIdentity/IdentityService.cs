using System.Linq;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;

using Microsoft.AspNetCore.Identity;

namespace Kindergarten.Database.Contexts.ProjectTodoIdentity
{
    public static class UserManagerExtensions
    {
        public static async Task<string> GetRoleAsync<T>(this UserManager<T> userManager, T user) where T : class =>
            (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? UserRoles.User;

        public static async Task<IdentityResult> AddToRoleAsync<T>(this UserManager<T> userManager, T user, string role) where T : class =>
            await userManager.AddToRoleAsync(user, role);
    }
}
