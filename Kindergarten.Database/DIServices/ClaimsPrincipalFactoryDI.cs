﻿using Database.Contexts;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

using Model.Identity;

using System.Security.Claims;
using System.Threading.Tasks;

namespace Database.DIServices
{
    public class ClaimsPrincipalFactoryDI: UserClaimsPrincipalFactory<ApplicationUser, ApplicationRole>
    {
        private readonly KindergartenContext _context;

        public ClaimsPrincipalFactoryDI(UserManager<ApplicationUser> userManager,
                                        RoleManager<ApplicationRole> roleManager,
                                        IOptions<IdentityOptions> optionsAccessor,
                                        // TODO: взять контекст
                                        KindergartenContext context
                                        ) : base(userManager, roleManager, optionsAccessor)
        {
            _context = context;
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser appUser)
        {
            var identity = await base.GenerateClaimsAsync(appUser);

            //var userId = _context.GetUserIdByIdentityId(appUser.Id);
            //identity.AddClaim(new Claim(ClaimHelper.ProjectTodoUserIdDefault, userId.ToString()));

            return identity;
        }
    }
}
