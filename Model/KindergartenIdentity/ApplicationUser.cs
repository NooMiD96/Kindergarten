using Microsoft.AspNetCore.Identity;

namespace Kindergarten.Model.KindergartenIdentity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }

        public string UserId { get; set; }
    }
}
