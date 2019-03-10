using System.Collections.Generic;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.DB;
using Kindergarten.Model.Identity;
using Kindergarten.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

using Newtonsoft.Json;

namespace MyMedicine.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : BaseController
    {
        private readonly KindergartenContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostController([FromServices] KindergartenContext context, [FromServices] UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateOrEdit([FromQuery] int postId, [FromBody] Post post)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return ControllersServices.ErrorMessage("auth");
            //}
            //if (!User.IsInRole("Admin"))
            //{
            //    return ControllersServices.ErrorMessage("Not allowed");
            //}
            var user = await _userManager.GetUserAsync(User);

            if (postId <= 0)
            {
                await _context.AddNewPostAsync(post, user);
            }
            else
            {
                await _context.EditPostAsync(post, postId);
            }

            return Ok();
        }
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCommentsList([FromQuery] int postid, [FromBody] List<int> commentsListId)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return ControllersServices.ErrorMessage("auth");
            //}
            //if (!User.IsInRole("Admin"))
            //{
            //    return ControllersServices.ErrorMessage("Not allowed");
            //}

            await _context.DeleteCommentListAsync(postid, commentsListId);

            return Ok();
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeletePost([FromQuery] int postid)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return ControllersServices.ErrorMessage("auth");
            //}
            //if (!User.IsInRole("Admin"))
            //{
            //    return ControllersServices.ErrorMessage("Not allowed");
            //}

            await _context.DeletePostAsync(postid);

            return Ok();
        }
    }
}