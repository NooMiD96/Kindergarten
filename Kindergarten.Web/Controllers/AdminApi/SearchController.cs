using Core.Constants;

using Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : BaseController
    {
        private readonly KindergartenContext _context;

        public SearchController(KindergartenContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> SearchChildrenList([FromQuery] string searchString)
        {
            (var isSuccess, var childrenList, var errorMessage) = await _context.SearchChildrenListAsync(searchString);

            if (isSuccess)
                return Success(childrenList);
            else
                return BadRequest(errorMessage);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetChildrenWithoutVaccination()
        {
            (var isSuccess, var childrenList, var errorMessage) = await _context.GetChildrenWithoutVaccinationAsync();

            if (isSuccess)
                return Success(childrenList);
            else
                return BadRequest(errorMessage);
        }
    }
}