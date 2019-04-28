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
    }
}
