using Microsoft.AspNetCore.Identity;

namespace Kindergarten.Database.Models.KindergartenIdentity
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string RoleName) : base(RoleName) { }
    }
}
