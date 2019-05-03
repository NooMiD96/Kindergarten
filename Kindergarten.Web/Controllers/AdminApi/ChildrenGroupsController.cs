using Core.Constants;

using Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class ChildrenGroupsController : BaseController
    {
        private readonly KindergartenContext _context;
        public ChildrenGroupsController([FromServices] KindergartenContext context)
        {
            _context = context;
        }

        #region ChildrenGroups
        [HttpGet("[action]")]
        public async Task<IActionResult> GetChildrenGroups()
        {
            var childrenGroups = await _context.GetChildrenGroupsAsync();

            return Success(childrenGroups);
        }

        [HttpPatch("[action]")]
        public async Task<IActionResult> ChangeChildrenGroups([FromBody] List<Group> groupList)
        {
            (var isSuccess, var resultMessage) = await _context.ChangeChildrenGroupsAsync(groupList);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteChildrenGroups([FromBody] List<int> idList)
        {
            (var isSuccess, var resultMessage) = await _context.DeleteChildrenGroupsAsync(idList);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }
        #endregion

        #region Group
        [HttpGet("[action]")]
        public async Task<IActionResult> GetChildrenList([FromQuery] int groupId)
        {
            var childrenList = await _context.GetChildrenListAsync(groupId);

            return Success(childrenList);
        }

        [HttpPatch("[action]")]
        public async Task<IActionResult> ChangeChildrenList([FromQuery] int groupId, [FromBody] List<Children> childrenList)
        {
            (var isSuccess, var resultMessage) = await _context.ChangeChildrenListAsync(groupId, childrenList);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteChildrenList([FromQuery] int groupId, [FromBody] List<int> idList)
        {
            (var isSuccess, var resultMessage) = await _context.DeleteChildrenListAsync(groupId, idList);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }
        #endregion

        #region Children
        [HttpGet("[action]")]
        public async Task<IActionResult> GetChildren([FromQuery] int childrenId)
        {
            var children = await _context.GetChildrenAsync(childrenId);

            return Success(children);
        }

        [HttpPatch("[action]")]
        public async Task<IActionResult> ChangeChildren([FromQuery] int childrenId, [FromBody] Children childrenData)
        {
            (var isSuccess, var resultMessage) = await _context.ChangeChildrenAsync(childrenId, childrenData);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteChildren([FromQuery] int childrenId)
        {
            (var isSuccess, var resultMessage) = await _context.DeleteChildrenAsync(childrenId);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(resultMessage);
        }
        #endregion


        [HttpGet("[action]")]
        public async Task<IActionResult> GetVaccinationReport()
        {
            (var isSuccess, var result, var errorMessage) = await _context.GetVaccinationReportAsync();

            if (isSuccess)
                return Success(result);
            else
                return BadRequest(errorMessage);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetHealthGroupReport()
        {
            (var isSuccess, var result, var errorMessage) = await _context.GetHealthGroupReportAsync();

            if (isSuccess)
                return Success(result);
            else
                return BadRequest(errorMessage);
        }
    }
}
