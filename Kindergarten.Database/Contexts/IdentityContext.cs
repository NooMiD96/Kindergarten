using Kindergarten.Model.Identity;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public class IdentityContext: IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options) { }
    }
}
