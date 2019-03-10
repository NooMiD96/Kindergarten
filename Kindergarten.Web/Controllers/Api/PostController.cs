using System.Threading.Tasks;

using Kindergarten.Core.Helpers;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.Identity;
using Kindergarten.Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

using Newtonsoft.Json;

namespace MyMedicine.Controllers.Api
{
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

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPreviewPostList([FromQuery] int page, [FromQuery] int pageSize)
        {
            var (Posts, TotalCount) = await _context.GetPreviewPostListAsync(page, pageSize);

            return Ok(JsonHelper.Serialize(new { Posts, TotalCount }));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPost([FromQuery] int postid)
        {
            var Post = await _context.GetPostAsync(postid);

            return Ok(JsonHelper.Serialize(new { Post }));
        }

        [Authorize, ValidateAntiForgeryToken]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddComment([FromQuery] int postid)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return ControllersServices.ErrorMessage("auth");
            //}
            var user = await _userManager.GetUserAsync(User);

            var context = await ControllersServices.GetJsonFromBodyRequestAsync(Request.Body);

            var result = await _context.AddNewCommentAsync(postid, user, context);

            if (result != null)
                return Ok(JsonHelper.Serialize(result));
            else
            {
                return BadRequest("Не удалось добавить комментарий, повторите попытку позже.");
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetComments([FromQuery] int postid)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return ControllersServices.ErrorMessage("auth");
            //}

            var result = await _context.GetCommentListAsync(postid);

            if (result != null)
                return Ok(JsonHelper.Serialize(new { CommentsList = result }));
            else
                return BadRequest("TODO");
        }
    }
}