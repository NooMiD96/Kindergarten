using Microsoft.AspNetCore.Identity;

namespace Kindergarten.Database.Models.KindergartenIdentity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }

        public string UserId { get; set; }
    }
}
