using Kindergarten.Model.KindergartenIdentity;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    //public class KindergartenIdentityContext: IdentityDbContext<ApplicationUser, ApplicationRole, string>
    public class KindergartenIdentityContext: IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public KindergartenIdentityContext(DbContextOptions<KindergartenIdentityContext> options) : base(options) { }
    }
}
