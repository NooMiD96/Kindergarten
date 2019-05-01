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
    public class ReportContoller : BaseController
    {
        private readonly KindergartenContext _context;

        public ReportContoller(KindergartenContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVisitationReport()
        {
            (var isSuccess, var result, var errorMessage) = await _context.GetVisitationReportAsync();

            if (isSuccess)
                return Success(result);
            else
                return BadRequest(errorMessage);
        }
    }
}
