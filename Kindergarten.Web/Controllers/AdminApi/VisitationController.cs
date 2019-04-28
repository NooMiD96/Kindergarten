using Core.Constants;

using Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class VisitationController : BaseController
    {
        private readonly KindergartenContext _context;

        public VisitationController(KindergartenContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVisitationList([FromQuery] DateTime? date)
        {
            var visitationList = await _context.GetVisitationListAsync(date);

            return Success(visitationList);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveVisitationList([FromBody] List<VisitationBase> visitationList)
        {
            (var isSuccess, var errorMessage) = await _context.SaveVisitationListAsync(visitationList);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(errorMessage);
        }
    }
}
