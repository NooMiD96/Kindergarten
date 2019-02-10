using Microsoft.AspNetCore.Identity;

namespace Kindergarten.Model.KindergartenIdentity
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string RoleName) : base(RoleName) { }
    }
}
